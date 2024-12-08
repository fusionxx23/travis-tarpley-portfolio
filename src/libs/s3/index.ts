import {
  PutObjectCommand,
  DeleteObjectsCommand,
  S3Client,
  type DeleteObjectsCommandInput,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config(); // load in .env into process.env
const client = new S3Client({ region: "us-east-1" });
export async function deleteBlogFiles({
  key,
}: {
  key: string;
}) {
  const [keyId] = key.split(".");

  const delTwo: DeleteObjectsCommandInput = {
    Bucket: import.meta.env.S3_BUCKET_DEST,
    Delete: {
      Objects: [
        { Key: `${keyId}_800x.webp` },
        { Key: `${keyId}_150x.webp` },
      ],
    },
  };
  const command = new DeleteObjectsCommand(delTwo);
  await client.send(command);
}
export async function uploadImageFile({
  file,
}: {
  file: File;
}) {
  const body = Buffer.from(await file.arrayBuffer());
  try {
    const sharpImage = sharp(body);
    const metaData = await sharpImage.metadata();
    const width = metaData.width;
    const height = metaData.height;
    if (!width || !height) {
      throw Error("Wrong aspect ratio.");
    }
    // Round the aspect ratio -- image can be a few pixels off
    // * Floats are very inaccurate
    if (Math.floor((width / height) * 10) / 10 !== 1.5) {
      throw Error("Wrong aspect ratio.");
    }
    if (width < 800) {
      throw Error("Image too small.");
    }
    if (!checkIsImage(file.type)) {
      console.log("not image");
      return undefined;
    }
    const id = randomUUID();
    let key = `${id}.${file.type.split("/")[1]}`;
    const command = new PutObjectCommand({
      Bucket: import.meta.env.S3_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: `${file.type}`,
    });
    await client.send(command);
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
