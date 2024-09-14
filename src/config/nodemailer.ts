export default {
  host: 'mail.grupofera.app.br',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  default: {
    from: `Grupo Fera <fera@grupofera.app.br>`,
  },
};