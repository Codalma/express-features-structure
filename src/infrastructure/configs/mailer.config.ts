import nodemailer, { Transporter } from 'nodemailer';
const dotenv = require('dotenv');

dotenv.config();

const transporterConfig = {
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: true,
  auth: {
    user: process.env.MAILER_SENDER,
    pass: process.env.MAILER_PASSWORD,
  },
};

export const nodemailerTransporter: Transporter =
  nodemailer.createTransport(transporterConfig);
