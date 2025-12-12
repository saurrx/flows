import type { IntegrationPlugin } from "../registry";
import { registerIntegration } from "../registry";
import { TelegramIcon } from "./icon";

const telegramPlugin: IntegrationPlugin = {
    type: "telegram",
    label: "Telegram",
    description: "Connect bots",
    icon: TelegramIcon,
    formFields: [
        {
            id: "botToken",
            label: "Bot Token",
            type: "password",
            placeholder: "12345:ABC...",
            configKey: "botToken",
            envVar: "TELEGRAM_BOT_TOKEN",
            helpText: "Get from @BotFather",
        },
    ],
    testConfig: {
        getTestFunction: async () => {
            const { testTelegram } = await import("./test");
            return testTelegram;
        },
    },
    actions: [
        {
            slug: "send-message",
            label: "Send Message",
            description: "Reply to chat",
            category: "Telegram",
            stepFunction: "sendMessageStep",
            stepImportPath: "send-message",
            outputFields: [{ field: "messageId", description: "Sent Message ID" }],
            configFields: [
                {
                    key: "chatId",
                    label: "Chat ID",
                    type: "template-input",
                    placeholder: "Leave empty to reply to sender",
                    required: false,
                },
                {
                    key: "text",
                    label: "Message Text",
                    type: "template-textarea",
                    placeholder: "Leave empty to echo the incoming message...",
                    defaultValue: "Just bought a token : Tx hash : https://solscan.io/tx/{{TradeToken.signature}}",
                    required: false,
                },
            ],
        },
    ],
};

// Auto-register on import
registerIntegration(telegramPlugin);

export default telegramPlugin;
