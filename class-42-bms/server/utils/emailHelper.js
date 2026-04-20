import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { SEND_GRID_KEY } = process.env;

function replaceContent(content, creds) {
    let allKeysArr = Object.keys(creds);
    allKeysArr.forEach(function(key) {
        content = content.replace(`#{${key}}`, creds[key]);
    });
}

const EmailHelper = async (templateName, receiverEmail, creds) => {
    try {
        const templatePath = path.join(__dirname, "../email-templates", `${templateName}.html`);
        let content = await fs.promises.readFile(templatePath, "utf-8");

        const emailDetails = {
            to: receiverEmail,
            from: "shashwat.bagaria_1@scaler.com",
            subject: "Mail from BookMyShowScaler",
            text: `Hi ${creds.name} this is your reset otp ${creds.otp}`,
            html: replaceContent(content, creds)
        };

        const transportDetails = {
            host: "smtp.sendgrid.net",
            port: 587,
            auth: {
                user: "apikey",
                pass: SEND_GRID_KEY
            }
        };

        const transporter = nodemailer.createTransport(transportDetails);
        
        // Verify transporter configuration
        await transporter.verify();
        
        const result = await transporter.sendMail(emailDetails);
        console.log("Email sent successfully:", result);
    } catch(err) {
        console.log(err);
    };
}

export default EmailHelper;