import { Request, Response } from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import crypto from 'crypto'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  accessKeyId,
  secretAccessKey
})

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

class Controller {
  public async upload(req: Request, res: Response) {
    const url = req.file?.location ?? null;
    
    const fileName = generateFileName()
    const uploadParams = {
      Bucket: bucketName,
      Body: req.file?.buffer,
      Key: fileName,
      ContentType: req.file?.mimetype
    }

    await s3Client.send(new PutObjectCommand(uploadParams));
    const resp2 = await s3Client.send(new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName
    }))

    const awsUrl = `https://grupofera.s3.sa-east-1.amazonaws.com/${fileName}`

    res.send({ awsUrl }).status(200)

  }
}

export default new Controller();
