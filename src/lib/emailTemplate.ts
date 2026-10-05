export interface ContactPayload {
  name: string;
  email: string;
  service: string;
  budget: string;
  brief: string;
  timestamp?: string;
}

export const SERVICE_LABELS: Record<string, string> = {
  "web-dev": "Web & Full Stack Development",
  "ui-ux": "UI/UX Design & Branding",
  "ai-ads": "AI Ads & Influencer Production",
  "seo": "Technical & On-Page SEO",
  "automation": "Automation & Workflows",
  "performance-marketing": "Performance Meta/Google Ads",
};

export const BUDGET_LABELS: Record<string, string> = {
  "5-10": "$5,000 – $10,000",
  "10-25": "$10,000 – $25,000",
  "25-plus": "$25,000 +",
};

export function generateLuxuryHtmlEmail(data: ContactPayload): string {
  const serviceTitle = SERVICE_LABELS[data.service] || data.service;
  const budgetRange = BUDGET_LABELS[data.budget] || data.budget;
  const dateStr = data.timestamp || new Date().toUTCString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Strategic Inquiry - ${data.name}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070707; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F4F4F4; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #070707; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #0E0E10; border: 1px solid rgba(181, 18, 27, 0.35); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(181,18,27,0.18);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #8B0000, #B5121B, #C51F2A);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 24px 40px; border-bottom: 1px solid rgba(255,255,255,0.06); background-color: #121214;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 4px 12px; background-color: rgba(181, 18, 27, 0.15); border: 1px solid rgba(181, 18, 27, 0.35); border-radius: 100px; color: #C51F2A; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                      NEW STRATEGIC INQUIRY
                    </div>
                    <h1 style="margin: 16px 0 6px 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      ${data.name}
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #A7A7A7; font-family: monospace;">
                      Transmitted: ${dateStr}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 40px;">
              
              <!-- Quick Summary Cards Grid -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td width="50%" style="padding-right: 10px; vertical-align: top;">
                    <div style="background-color: #141416; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px;">
                      <div style="font-size: 9px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                        SERVICE ALIGNMENT
                      </div>
                      <div style="font-size: 13px; font-weight: 600; color: #ffffff;">
                        ${serviceTitle}
                      </div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 10px; vertical-align: top;">
                    <div style="background-color: #141416; border: 1px solid rgba(181,18,27,0.3); border-radius: 12px; padding: 16px; background-image: linear-gradient(135deg, rgba(181,18,27,0.1), transparent);">
                      <div style="font-size: 9px; font-weight: 700; color: #C51F2A; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                        BUDGET ALLOCATION
                      </div>
                      <div style="font-size: 14px; font-weight: 700; color: #ffffff;">
                        ${budgetRange}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Detailed Field Matrix Table -->
              <div style="font-size: 10px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
                COMMUNICATION COORDINATES
              </div>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #121214; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #A7A7A7; font-size: 12px; width: 35%; font-weight: 500;">
                    Commercial Entity
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-size: 13px; font-weight: 600;">
                    ${data.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; color: #A7A7A7; font-size: 12px; font-weight: 500;">
                    Direct Email Vector
                  </td>
                  <td style="padding: 14px 18px; color: #C51F2A; font-size: 13px; font-weight: 600;">
                    <a href="mailto:${data.email}" style="color: #C51F2A; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
              </table>

              <!-- Project Brief Section -->
              <div style="font-size: 10px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
                TARGET OBJECTIVE BRIEF
              </div>
              <div style="background-color: #121214; border-left: 3px solid #B5121B; border-radius: 4px 12px 12px 4px; padding: 20px; margin-bottom: 32px;">
                <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #d4d4d8; font-style: normal;">
                  ${data.brief ? data.brief.replace(/\n/g, '<br/>') : '<span style="color: #777777; font-style: italic;">No specific brief detailed. Ready for direct discovery call.</span>'}
                </p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re:%20Strategic%20Inquiry%20from%20${encodeURIComponent(data.name)}&body=Hi%20${encodeURIComponent(data.name)},%0A%0AThank%20you%20for%20reaching%20out.%20We%20have%20reviewed%20your%20inquiry%20for%20${encodeURIComponent(serviceTitle)}.%0A%0ABest%20regards,%0AMajid" 
                       style="display: inline-block; background: linear-gradient(135deg, #8B0000, #B5121B, #C51F2A); color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 16px 36px; border-radius: 12px; box-shadow: 0 10px 25px rgba(181, 18, 27, 0.45);">
                      Reply Direct to Client &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #070707; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #A7A7A7; font-weight: 600; letter-spacing: 1px;">
                MAJID — CATEGORY-DEFINING DIGITAL ARCHITECTURE
              </p>
              <p style="margin: 0; font-size: 10px; color: #777777;">
                Automated High-Fidelity Lead Dispatch &bull; majidarain778866@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateMailtoLink(data: ContactPayload): string {
  const serviceTitle = SERVICE_LABELS[data.service] || data.service;
  const budgetRange = BUDGET_LABELS[data.budget] || data.budget;

  const subject = `[New Lead] Inquiry from ${data.name} (${serviceTitle})`;
  const body = `Commercial Entity: ${data.name}
Direct Email: ${data.email}
Capabilities Requested: ${serviceTitle}
Budget Allocation: ${budgetRange}

Target Objective / Brief:
${data.brief || "N/A"}

--
Sent via Portfolio Contact System`;

  return `mailto:majidarain778866@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
