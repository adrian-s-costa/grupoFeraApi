import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import swaggerOptions from './src/config/swagger.js';

const spec = swaggerJsdoc(swaggerOptions);

fs.writeFileSync('swagger.ts', `export default ${JSON.stringify(spec, null, 2)};`);