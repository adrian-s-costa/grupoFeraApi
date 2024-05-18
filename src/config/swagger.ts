export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '[name] REST API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://127.0.0.1:3000',
        description: 'Development environment',
      },
      {
        url: `${process.env.URL}:${process.env.PORT}`,
        description: 'Testing environment',
      },
      {
        url: `https://ab24-2804-14c-7582-5093-8e55-2c16-5899-8fb9.ngrok-free.app`,
        description: 'Ngrok environment',
      },
    ],
  },
  apis: ['docs/**/*.yml'],
};
