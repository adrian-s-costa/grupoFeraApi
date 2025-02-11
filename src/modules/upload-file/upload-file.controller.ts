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
        res.status(400).json({ error: 'Tipo de arquivo não suportado. Permitido: .jpg, .png, .heic, .heif.' });
      }

      // Gera o nome do arquivo com a extensão correta
      const fileExtension = mimeToExtension[mimeType];
      const uniqueFileName = `profile-pictures/${crypto.randomBytes(16).toString('hex')}${fileExtension}`;

      const storage = new Storage({ keyFilename: process.env.GCP_JSON });
      const bucket = storage.bucket(bucketName)

      await bucket.setCorsConfiguration(
        [
          {
            "origin": ["*"],
            "method": ["GET", "POST"],
            "responseHeader": ["Content-Type"],
            "maxAgeSeconds": 3600
          }
        ]
      )
      const file = bucket.file(uniqueFileName);

      // Salva o arquivo
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        console.error('Erro ao criar o arquivo:', err);
        res.status(500).json({ error: 'Erro ao criar o arquivo.' });
      });

      stream.on('finish', async () => {
        try {
          await file.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
          console.log(`Arquivo criado e disponível em: ${publicUrl}`);
          res.status(200).json({ message: 'Arquivo criado com sucesso.', publicUrl });
        } catch (err) {
          console.error('Erro ao tornar o arquivo público:', err);
          res.status(500).json({ error: 'Erro ao tornar o arquivo público.' });
        }
      });
      stream.end(req.file!.buffer);
    } catch (error) {
      console.error('Erro inesperado:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

// Configurações do cliente e do bucket

public async generateSignedUrl(req: Request, res: Response) {
  const fileNameReq = decodeURIComponent(req.params.archive);
  const fileType = decodeURIComponent(req.params.type);
  const storage = new Storage({ keyFilename: process.env.GCP_JSON });
  const bucketName = 'videos-grupo-fera'; // Nome do bucket
  const fileName = `profile-pictures/${fileNameReq}`; // Nome do arquivo no bucket
  const expiresInMinutes = 15; // Tempo de expiração da URL (em minutos)

  try {
    // Obter referência ao arquivo no bucket
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Configurar as opções da URL pré-assinada
    const options = {
      version: 'v4',
      action: 'write', // Especifica que a URL será usada para upload
      expires: Date.now() + expiresInMinutes * 60 * 1000, // Define a validade
      contentType: fileType, // Tipo de conteúdo esperado
    };

    // Gerar a URL pré-assinada
    const [url] = await file.getSignedUrl(options);
    console.log(`URL pré-assinada para upload: ${url}`);
    
    return res.json(url).status(200)
  } catch (error: any) {
    console.error('Erro ao gerar a URL pré-assinada:', error.message);
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
