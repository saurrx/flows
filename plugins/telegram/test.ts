export async function testTelegram(credentials: Record<string, string>) {
    try {
        const token = credentials.TELEGRAM_BOT_TOKEN;
        if (!token) return { success: false, error: "Token required" };

        const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
        const data = await response.json();

        if (!response.ok || !data.ok) {
            return { success: false, error: data.description || "Invalid Token" };
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}
