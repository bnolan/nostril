import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const Bucket = "nostril-ugc";

let s3Client: S3 | null = null;

if (!process.env.SPACES_SECRET) {
  console.error("SPACES_SECRET env var not set");
} else {
  s3Client = new S3({
    endpoint: "https://syd1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: "syd1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: "DO00MCZW2CH67D9MV89F", // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.SPACES_SECRET, // Secret access key defined through an environment variable.
    },
  });
}

export { s3Client, getSignedUrl };

// export const parcelKey = (parcel: Parcel) => {
//   return `parcels/parcel-${parcel.id}/${parcel.hash}.glb`
// }

const keys = new Set();

export { keys };

/*
export const uploadParcel = async (parcel: Parcel, bytes: Uint8Array, Metadata) => {
  let maxAge = 60 * 60
  let Key = parcelKey(parcel)
 
  // Specifies a path within your bucket and the file to upload.
  const bucketParams = {
    Bucket, 
    Key, 
    Body: bytes,
    ACL: 'public-read',
    ContentType: 'model/gltf-binary',
    Metadata,
    CacheControl: `max-age=${maxAge}`
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams))

    console.log(
      "Successfully uploaded object: " + bucketParams.Bucket + "/" + bucketParams.Key
    )

    keys.add(Key)

    return data
  } catch (err) {
    console.log("Error", err)
  }
}
*/

/*
// Step 3: Define the parameters for the object you want to upload.
const params = {
Bucket: "example-space", // The path to the directory you want to upload the object to, starting with your Space name.
Key: "folder-path/hello-world.txt", // Object key, referenced whenever you want to access this file later.
Body: "Hello, World!", // The object's contents. This variable is an object, not a string.
ACL: "private", // Defines ACL permissions, such as private or public.
Metadata: { // Defines metadata tags.
  "x-amz-meta-my-key": "your-value"
}
};


// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
const uploadObject = async () => {
try {
  const data = await s3Client.send(new PutObjectCommand(params));
  console.log(
    "Successfully uploaded object: " +
      params.Bucket +
      "/" +
      params.Key
  );
  return data;
} catch (err) {
  console.log("Error", err);
}
};
*/

export const presign = async (filename: string, fileType: string) => {
  let Key = `uuid/${filename}`; // parcelKey(parcel)

  const params = {
    Bucket,
    Key,
    ContentType: fileType,
  };

  let uploadUrl = await getSignedUrl(s3Client, new PutObjectCommand(params), {
    expiresIn: 15 * 60,
  });
  let viewUrl = await getSignedUrl(s3Client, new GetObjectCommand(params), {
    expiresIn: 7 * 24 * 3600,
  });

  // console.log(url)

  return { uploadUrl, viewUrl };
};

// Specifies a path within your Space and the file to download.
export const getUrl = async () => {
  let Key = "boop"; // parcelKey(parcel)

  if (!keys.has(Key)) {
    return null;
  }

  let bucketParams = { Bucket, Key };

  let url = await getSignedUrl(s3Client, new GetObjectCommand(bucketParams), {
    expiresIn: 15 * 60,
  });

  console.log(url);

  return url;
};

// Returns a list of objects in your specified path.
export const run = async () => {
  let bucketParams = { Bucket };

  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    console.log("Success", data);

    if (data.Contents) {
      data.Contents.forEach((key) => {
        keys.add(key.Key);
        console.log(key.Key);
      });
    } else {
      console.log("no contents");
      // ...
    }

    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

if (s3Client) {
  run();
}
