import "server-only";

import { fetchCredentials } from "@/lib/credential-fetcher";
import { type StepContext, type StepInput, withStepLogging } from "@/lib/steps/step-handler";
import type { TelegramCredentials } from "../credentials";

type SendMessageResult =
    | { success: true; messageId: number; chatId: number }
    | { success: false; error: string };

export type SendMessageCoreInput = {
    chatId?: string;
    text?: string;
    parseMode?: "Markdown" | "HTML";
};

export type SendMessageInput = StepInput &
    SendMessageCoreInput & {
        integrationId?: string;
    };

async function stepHandler(
    input: SendMessageCoreInput,
    credentials: TelegramCredentials,
    context?: StepContext
): Promise<SendMessageResult> {
    // === DEBUG LOGS START ===
    console.log("--- TELEGRAM SEND MESSAGE DEBUG ---");
    console.log("Input Text:", JSON.stringify(input.text));
    console.log("Input ChatId:", JSON.stringify(input.chatId));
    console.log("Context Exists:", !!context);
    console.log("Trigger Data:", JSON.stringify(context?.triggerData, null, 2));
    console.log("--- END DEBUG ---");
    // === DEBUG LOGS END ===

    const token = credentials.TELEGRAM_BOT_TOKEN;

    if (!token) {
        return { success: false, error: "TELEGRAM_BOT_TOKEN is not configured." };
    }

    // Smart Logic: Fallback to Trigger Data if input is empty OR whitespace-only
    const inputText = input.text?.trim();
    const inputChatId = input.chatId?.trim();

    const targetChatId = inputChatId || context?.triggerData?.chatId;
    const textToSend = inputText || context?.triggerData?.text;

    console.log("Resolved targetChatId:", targetChatId);
    console.log("Resolved textToSend:", textToSend);

    // Pre-flight Validation (Prevents "Bad Request" from Telegram)
    if (!targetChatId) {
        return {
            success: false,
            error: "Configuration Error: No Chat ID found. Please connect a Telegram Trigger or enter a Chat ID manually.",
        };
    }

    if (!textToSend) {
        return {
            success: false,
            error: "Configuration Error: Message text is empty. Please type a message or ensure the Trigger sent text.",
        };
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: targetChatId,
                text: textToSend,
                parse_mode: input.parseMode,
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            return {
                success: false,
                error: data.description || `Telegram API error: ${response.status}`,
            };
        }

        return {
            success: true,
            messageId: data.result.message_id,
            chatId: data.result.chat.id,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}

export async function sendMessageStep(
    input: SendMessageInput
): Promise<SendMessageResult> {
    "use step";

    const credentials = input.integrationId
        ? await fetchCredentials(input.integrationId)
        : {};

    // CRITICAL: Pass input._context as the 3rd argument
    return withStepLogging(input, () => stepHandler(input, credentials, input._context));
}

export const _integrationType = "telegram";

