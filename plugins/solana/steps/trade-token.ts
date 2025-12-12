import "server-only";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import bs58 from "bs58";
// Must use node-fetch explicitly - native fetch has issues in Next.js server context
import fetch from "node-fetch";

import { type StepInput, withStepLogging } from "@/lib/steps/step-handler";

// --- Hardcoded Configuration ---
const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
const SOURCE_TOKEN_MINT = "So11111111111111111111111111111111111111112";
const SLIPPAGE_BPS = 300;
// Use the correct Jupiter API URL (same as working swap.js)
const JUPITER_API_URL = "https://api.jup.ag/swap/v1";
const JUPITER_API_KEY = "5f6da690-eb02-4aed-858b-3c034f0b490d";

// --- Result & Input Types ---
type TradeTokenResult = { success: true; signature: string } | { success: false; error: string };

export type TradeTokenCoreInput = {
    targetTokenMint: string;
    sourceAmountUnits: string;
    solanaPrivateKey: string;
};

export type TradeTokenInput = StepInput & TradeTokenCoreInput;

// --- Helper function for Jupiter headers ---
function jupiterHeaders(): Record<string, string> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (JUPITER_API_KEY) {
        headers["x-api-key"] = JUPITER_API_KEY;
    }
    return headers;
}

// --- Main Step Logic ---
async function stepHandler(input: TradeTokenCoreInput): Promise<TradeTokenResult> {
    const privateKeyBase58 = input.solanaPrivateKey;

    if (!privateKeyBase58) {
        return { success: false, error: "Solana Private Key is not provided." };
    }

    try {
        console.log("[Trade Token] Starting swap...");
        console.log("[Trade Token] Target token:", input.targetTokenMint);
        console.log("[Trade Token] Amount (SOL):", input.sourceAmountUnits);

        // Convert SOL to lamports (1 SOL = 1,000,000,000 lamports)
        const amountInLamports = Math.floor(parseFloat(input.sourceAmountUnits) * 1e9);
        console.log("[Trade Token] Amount (lamports):", amountInLamports);

        // 1. Get Quote from Jupiter
        const params = new URLSearchParams({
            inputMint: SOURCE_TOKEN_MINT,
            outputMint: input.targetTokenMint,
            amount: String(amountInLamports),
            slippageBps: String(SLIPPAGE_BPS),
        });
        const quoteUrl = `${JUPITER_API_URL}/quote?${params}`;
        console.log("[Trade Token] Fetching quote from:", quoteUrl);

        const quoteRes = await fetch(quoteUrl, {
            method: "GET",
            headers: jupiterHeaders(),
        });

        if (!quoteRes.ok) {
            const errorText = await quoteRes.text();
            return { success: false, error: `Quote failed ${quoteRes.status}: ${errorText}` };
        }

        const quoteResponse = await quoteRes.json();
        console.log("[Trade Token] Quote received successfully");

        // 2. Decode private key and create keypair
        let keypair: ReturnType<typeof Keypair.fromSecretKey>;
        try {
            const privateKeyBytes = bs58.decode(privateKeyBase58);
            keypair = Keypair.fromSecretKey(privateKeyBytes);
            console.log("[Trade Token] Wallet public key:", keypair.publicKey.toBase58());
        } catch (keyError) {
            return {
                success: false,
                error: `Invalid private key: ${keyError instanceof Error ? keyError.message : String(keyError)}`
            };
        }

        // 3. Build swap transaction
        console.log("[Trade Token] Building swap transaction...");
        const swapRes = await fetch(`${JUPITER_API_URL}/swap`, {
            method: "POST",
            headers: jupiterHeaders(),
            body: JSON.stringify({
                quoteResponse,
                userPublicKey: keypair.publicKey.toBase58(),
            }),
        });

        if (!swapRes.ok) {
            const errorText = await swapRes.text();
            return { success: false, error: `Swap build failed ${swapRes.status}: ${errorText}` };
        }

        const swapResponse = await swapRes.json() as { swapTransaction: string };
        console.log("[Trade Token] Swap transaction built");

        // 4. Deserialize and Sign
        console.log("[Trade Token] Signing transaction...");
        const swapTransactionBuf = Buffer.from(swapResponse.swapTransaction, "base64");
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        transaction.sign([keypair]);

        // 5. Send Transaction to Solana RPC
        console.log("[Trade Token] Sending transaction...");
        const connection = new Connection(SOLANA_RPC_URL, "confirmed");
        const signature = await connection.sendTransaction(transaction, {
            skipPreflight: false,
            maxRetries: 3,
        });
        console.log("[Trade Token] Transaction sent, signature:", signature);

        // 6. Confirm Transaction
        console.log("[Trade Token] Confirming transaction...");
        await connection.confirmTransaction(signature, "confirmed");
        console.log("[Trade Token] Transaction confirmed!");

        return { success: true, signature };
    } catch (error) {
        console.error("[Trade Token] Unexpected error:", error);
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}

// --- Step Entry Point ---
export async function tradeTokenStep(input: TradeTokenInput): Promise<TradeTokenResult> {
    "use step";
    return withStepLogging(input, () => stepHandler(input));
}

export const _integrationType = "solana";
