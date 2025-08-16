export default {
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'nao-responda@grupoferaapi.shop',
    pass: 'Asilco12!',
  },
  tls: {
    rejectUnauthorized: false,
  },
  default: {
    from: `Grupo Fera <nao-responda@grupoferaapi.shop>`,
  },
};