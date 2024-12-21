import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema'; // Ensure you have the correct import path
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

@Injectable()
export class EmailService {
    private transporter;

    constructor(private jwtService: JwtService) {
        // Configure the transporter with your email SMTP server details
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // Set to true for SSL (port 465), false for TLS (port 587)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendVerificationEmail(user: User) {
        // Generate a JWT token for the user email
        const token = this.jwtService.sign({ email: user.email }, { expiresIn: '24h' });
        const verificationLink = `http://yourdomain.com/verify?token=${token}`;

        // Define the email options
        const mailOptions = {
            from: '"Your App Name" <your-email@example.com>', // Sender address
            to: user.email, // Receiver's email address
            subject: 'Verify Your Email', // Email subject
            text: `Please click on the following link to verify your email: ${verificationLink}`, // Plain text body
            html: `<p>Please click on the following link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`, // HTML body content
        };

        try {
            // Send the email
            await this.transporter.sendMail(mailOptions);
            console.log('Verification email sent successfully');
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    }
}
