import type { IntegrationPlugin } from "../registry";
import { registerIntegration } from "../registry";
import { SolanaIcon } from "./icon";

const solanaPlugin: IntegrationPlugin = {
    type: "solana",
    label: "Solana",
    description: "Execute trades and interact with the Solana blockchain",
    icon: SolanaIcon,
    // No separate integration setup needed for MVP
    formFields: [],
    dependencies: {
        "@solana/web3.js": "^1.95.0",
        "bs58": "^6.0.0",
    },
    actions: [
        {
            slug: "extract-ca",
            label: "Extract CA",
            description: "Extract and validate Solana Contract Addresses from text",
            category: "Solana",
            stepFunction: "extractCaStep",
            stepImportPath: "extract-ca",
            outputFields: [
                { field: "addresses", description: "Array of valid addresses found" },
                { field: "count", description: "Number of addresses found" },
                { field: "firstAddress", description: "The first valid address (convenience)" },
            ],
            configFields: [
                {
                    key: "text",
                    label: "Input Text",
                    type: "template-textarea",
                    placeholder: "Text containing a CA (e.g. {{Telegram.text}})",
                    defaultValue: "{{Telegram.text}}",
                    rows: 4,
                    required: true,
                },
            ],
        },
        {
            slug: "trade-token",
            label: "Trade Token",
            description: "Swap SOL for any token using Jupiter",
            category: "Solana",
            stepFunction: "tradeTokenStep",
            stepImportPath: "trade-token",
            outputFields: [
                { field: "signature", description: "The Solana transaction signature" },
            ],
            configFields: [
                {
                    key: "solanaPrivateKey",
                    label: "Private Key (Base58)",
                    type: "template-password",
                    placeholder: "Paste your wallet private key here",
                    required: true,
                },
                {
                    key: "targetTokenMint",
                    label: "Target Token Mint",
                    type: "template-input",
                    placeholder: "e.g. {{ExtractCA.firstAddress}}",
                    defaultValue: "{{ExtractCA.firstAddress}}",
                    required: true,
                },
                {
                    key: "sourceAmountUnits",
                    label: "Trade Amount (in SOL)",
                    type: "template-input",
                    placeholder: "e.g. 0.001 for 0.001 SOL",
                    defaultValue: "0.001",
                    required: true,
                },
            ],
        },
    ],
};

registerIntegration(solanaPlugin);

export default solanaPlugin;
