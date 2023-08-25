import { NextResponse } from "next/server";
import mail from "@sendgrid/mail"

mail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request) {
    let response = {};
    const body = await request.json();
    
    const message = `
        First Name: ${body.firstName}\r\n
        Last Name: ${body.lastName}\r\n
        Email: ${body.email}\r\n
        Company: ${body.company}\r\n
        Website: ${body.website}\r\n
        Newsletter: ${body.newsletter}
    `;

    const data = {
        to: 'hello@brand-hub.co',
        from: 'hello@brand-hub.co',
        subject: `New message from Brand Hub Contact Form`,
        text: message,
        html: message.replace(/\r\n/g, '<br />'),
    };
    
    await mail
        .send(data)
            .then(() => {
                response = {
                    status: 'success',
                    message: "Your message was sent. I'll be in contact shortly.",
                };
            })
            .catch((error) => {
                response = {
                    status: 'error',
                    message: `Message failed to send with error, ${error}`,
                };
        });

    return NextResponse.json(response);
}