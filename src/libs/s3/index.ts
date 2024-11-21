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
  file,
}: {
  file: File;
}) {
  const body = Buffer.from(await file.arrayBuffer());
  try {
    if (!checkIsImage(file.type)) {
      console.log("not image");
      return undefined;
    }
    const id = randomUUID();
    let key = `${id}.${file.type.split("/")[1]}`;
    const command = new PutObjectCommand({
      Bucket: "tarp-portfolio-blog",
      Key: key,
      Body: body,
      ContentType: `${file.type}`,
    });
    await client.send(command);
    console.log(key, "KEY");
    return { key };
  } catch (e) {
    console.log(e);
  }
}

function checkIsImage(type: string) {
  console.log(type.split("/"));
  switch (type.split("/")[1].toLowerCase()) {
    case "jpeg":
      return true;
    case "jpg":
      return true;
    case "png":
      return true;
    case "webp":
      return true;
    default:
      return false;
  }
}
