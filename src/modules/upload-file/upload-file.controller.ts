import { Request, Response } from 'express';
import crypto from 'crypto'
const {Storage} = require('@google-cloud/storage');

class Controller {
  public async upload(req: Request, res: Response) {
    try {
      // Mapeamento de MIME para extensão
      const mimeToExtension: { [key: string]: string } = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/heic': '.heic',
        'image/heif': '.heif',
      };

      const bucketName = 'videos-grupo-fera';
      const mimeType = req.file!.mimetype; // Obtém o tipo MIME do arquivo

      // Verifica se o tipo MIME é permitido
      if (!mimeToExtension[mimeType]) {
        return res.status(400).send({ error: 'Tipo de arquivo não suportado. Permitido: .jpg, .png, .heic, .heif.' });
      }

      // Gera o nome do arquivo com a extensão correta
      const fileExtension = mimeToExtension[mimeType];
      const uniqueFileName = `profile-pictures/${crypto.randomBytes(16).toString('hex')}${fileExtension}`;

      const storage = new Storage({ keyFilename: process.env.GCP_JSON });
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(uniqueFileName);

      // Salva o arquivo
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        console.error('Erro ao criar o arquivo:', err);
        res.status(500).send({ error: 'Erro ao criar o arquivo.' });
      });

      stream.on('finish', async () => {
        try {
          await file.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
          console.log(`Arquivo criado e disponível em: ${publicUrl}`);
          res.status(200).send({ message: 'Arquivo criado com sucesso.', publicUrl });
        } catch (err) {
          console.error('Erro ao tornar o arquivo público:', err);
          res.status(500).send({ error: 'Erro ao tornar o arquivo público.' });
        }
      });

      stream.end(req.file!.buffer);
    } catch (error) {
      console.error('Erro inesperado:', error);
      res.status(500).send({ error: 'Erro interno do servidor.' });
    }
  }
}
    // const url = req.file?.location ?? null;
    
    // const fileName = generateFileName()
    // const uploadParams = {
    //   Bucket: bucketName,
    //   Body: req.file?.buffer,
    //   Key: fileName,
    //   ContentType: req.file?.mimetype
    // }

    // await s3Client.send(new PutObjectCommand(uploadParams));
    // const resp2 = await s3Client.send(new GetObjectCommand({
    //   Bucket: bucketName,
    //   Key: fileName
    // }))

    // const awsUrl = `https://grupofera.s3.sa-east-1.amazonaws.com/${fileName}`

    // res.send({ awsUrl }).status(200)


export default new Controller();
