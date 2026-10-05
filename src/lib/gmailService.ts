export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
}

export interface SendGmailParams {
  accessToken: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  htmlBody: string;
}

/**
 * Encodes string to Base64URL without padding, handling full UTF-8 characters safely.
 */
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Builds RFC 2822 compliant MIME message string.
 */
function buildMimeMessage({
  fromName,
  fromEmail,
  toEmail,
  subject,
  htmlBody,
}: {
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  htmlBody: string;
}): string {
  const cleanSubject = subject.replace(/[\r\n]/g, " ");
  const cleanFromName = fromName.replace(/["\r\n]/g, "");
  const encodedSubject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(cleanSubject)))}?=`;

  const parts = [
    `From: "${cleanFromName}" <${fromEmail}>`,
    `To: <${toEmail}>`,
    `Subject: ${encodedSubject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 8bit`,
    "",
    htmlBody,
  ];

  return parts.join("\r\n");
}

/**
 * Sends an email directly through the official Google Gmail API on behalf of the authenticated user.
 */
export async function sendGmailMessage(params: SendGmailParams): Promise<{ id: string; threadId: string }> {
  const mimeMessage = buildMimeMessage({
    fromName: params.fromName,
    fromEmail: params.fromEmail,
    toEmail: params.toEmail,
    subject: params.subject,
    htmlBody: params.htmlBody,
  });

  const rawBase64Url = base64UrlEncode(mimeMessage);

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      raw: rawBase64Url,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gmail API error (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * Retrieves the current authenticated user's Gmail profile information.
 */
export async function getGmailProfile(accessToken: string): Promise<GmailProfile> {
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || "Failed to retrieve Gmail profile");
  }

  return response.json();
}

/**
 * Lists recent sent or received messages relating to Majid's inbox.
 */
export async function listRecentGmailMessages(
  accessToken: string,
  query = "majidarain778866@gmail.com"
): Promise<GmailMessageSummary[]> {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=6&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }

  const summaries: GmailMessageSummary[] = [];

  for (const item of data.messages) {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        const headers: { name: string; value: string }[] = msgData.payload?.headers || [];
        const subject = headers.find((h) => h.name.toLowerCase() === "subject")?.value || "(No Subject)";
        const from = headers.find((h) => h.name.toLowerCase() === "from")?.value || "";
        const date = headers.find((h) => h.name.toLowerCase() === "date")?.value || "";

        summaries.push({
          id: msgData.id,
          threadId: msgData.threadId,
          snippet: msgData.snippet || "",
          subject,
          from,
          date,
        });
      }
    } catch {
      // Continue next message
    }
  }

  return summaries;
}
