import "server-only";

import { type StepContext, type StepInput, withStepLogging } from "@/lib/steps/step-handler";

// --- Base58 Decoder (Self-contained) ---
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const ALPHABET_MAP: Record<string, number> = {};
for (let i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}

function decodeBase58(string: string): Uint8Array | null {
    if (string.length === 0) return new Uint8Array(0);

    const bytes = [0];
    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (!(char in ALPHABET_MAP)) return null;

        const value = ALPHABET_MAP[char];
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] *= 58;
        }
        bytes[0] += value;

        let carry = 0;
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
        }

        while (carry) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
    }

    for (let i = 0; i < string.length && string[i] === "1"; i++) {
        bytes.push(0);
    }

    return new Uint8Array(bytes.reverse());
}
// ---------------------------------------

type ExtractCaResult = {
    success: true;
    addresses: string[];
    count: number;
    firstAddress: string | null;
};

export type ExtractCaCoreInput = {
    text: string;
};

export type ExtractCaInput = StepInput & ExtractCaCoreInput & {
    integrationId?: string;
};

async function stepHandler(
    input: ExtractCaCoreInput,
    context?: StepContext
): Promise<ExtractCaResult> {
    // === SMART INPUT LOGIC ===
    // 1. Use explicit input if provided (trim whitespace)
    // 2. Fallback to Telegram text if available
    // 3. Fallback to empty string
    const inputText = input.text?.trim();
    const textToAnalyze = inputText || context?.triggerData?.text || "";
    // =========================

    // Regex for base58-compatible strings (32 to 44 chars)
    const pattern = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g;

    const candidates = (textToAnalyze as string).match(pattern) || [];
    const validAddresses = new Set<string>();

    for (const candidate of candidates) {
        try {
            const decoded = decodeBase58(candidate);
            // Validate length (32 bytes is standard for Solana public keys)
            if (decoded && decoded.length === 32) {
                validAddresses.add(candidate);
            }
        } catch {
            // Ignore invalid strings
            continue;
        }
    }

    const uniqueAddresses = Array.from(validAddresses);

    return {
        success: true,
        addresses: uniqueAddresses,
        count: uniqueAddresses.length,
        firstAddress: uniqueAddresses.length > 0 ? uniqueAddresses[0] : null,
    };
}

export async function extractCaStep(input: ExtractCaInput): Promise<ExtractCaResult> {
    "use step";
    // Pass context for smart input
    return withStepLogging(input, () => stepHandler(input, input._context));
}

export const _integrationType = "solana";
