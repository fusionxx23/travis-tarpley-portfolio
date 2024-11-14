import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config(); // load in .env into process.env
const client = new S3Client({ region: "us-east-1" });
export async function getAllFiles() {
  try {
    const command = new ListObjectsCommand({
      Bucket: "tarp-portfolio-blog",
    });
    const resp = await client.send(command);
  } catch (e) {
    console.log(e);
  }
}

export async function uploadImageFile({
  body,
  fileExtension,
}: {
  body: Buffer;
  fileExtension: "png" | "jpg";
}) {
  try {
    const id = randomUUID();
    let key = `${id}.${fileExtension}`;
    const command = new PutObjectCommand({
      Bucket: "tarp-portfolio-blog",
      Key: key,
      Body: body,
    });
    const resp = await client.send(command);
    console.log(resp);
    return { key };
  } catch (e) {
    console.log(e);
  }
}