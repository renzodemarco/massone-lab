import { transporter } from "../config/nodemailer.config.js";
import env from "../config/env.config.js";

export async function sendReportEmail({ to, reportNumber, pdfBuffer }) {
  return transporter.sendMail({
    from: `"Laboratorio Adriana Massone" <${env.SMTP_USER}>`,
    to,
    subject: `Informe ${reportNumber}`,
    text: "Le adjuntamos el informe solicitado.",
    attachments: [
      {
        filename: `report-${reportNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}