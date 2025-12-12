import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchCredentials } from "@/lib/credential-fetcher";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { integrationId, webhookUrl } = body;

    if (!integrationId || !webhookUrl) {
      return NextResponse.json(
        { error: "Missing integrationId or webhookUrl" },
        { status: 400 }
      );
    }

    // 1. Fetch the decrypted credentials from the database
    // This is secure because it happens server-side. The token is never sent to the client.
    const credentials = await fetchCredentials(integrationId);
    const botToken = credentials.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json(
        { error: "Integration does not contain a Telegram Bot Token" },
        { status: 400 }
      );
    }

    // 2. Call Telegram API to set the webhook
    // We strictly use fetch here to avoid external SDK dependencies
    const telegramUrl = `https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`;
    
    const response = await fetch(telegramUrl, { method: "POST" });
    const result = await response.json();

    if (!result.ok) {
      return NextResponse.json(
        { error: `Telegram Error: ${result.description}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Failed to set Telegram webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
