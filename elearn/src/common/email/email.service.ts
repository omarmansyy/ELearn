import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema'; // Ensure you have the correct import path
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor(private jwtService: JwtService) {
        // Configure the transporter with your email SMTP server details
        this.transporter = nodemailer.createTransport({
            host: 'smtp.your-email-provider.com',
            port: 587, // Common ports are 587 for TLS or 465 for SSL, adjust as needed
            secure: false, // For port 465 you should set this to true
            auth: {
                user: 'your-email@example.com', // Your email address
                pass: 'your-email-password', // Your email password
            },
        });
    }

    async sendVerificationEmail(user: User) {
        const token = this.jwtService.sign({ email: user.email }, { expiresIn: '24h' });
        const verificationLink = `http://yourdomain.com/verify?token=${token}`;

        const mailOptions = {
            from: '"Your App Name" <your-email@example.com>', // Sender address
            to: user.email, // List of receivers, in this case just the user
            subject: 'Verify Your Email', // Subject line
            text: `Please click on the following link to verify your email: ${verificationLink}`, // Plain text body
            html: `<p>Please click on the following link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`, // HTML body content
        };

        await this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
            } else {
                console.log('Verification email sent:', info.response);
            }
        });
    }
}
