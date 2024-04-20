import {ACCESS_KEY, SECRET_KEY} from "@env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

const options = {
  bucket: "proyecto-ayd2",
  region: "us-east-2",
  successActionStatus: 201
}

let credentials = {
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
}
const client = new S3Client({
  region: options.region,
  credentials: credentials
})
  
const AWSHelper = {
  uploadFile: async function(path){
    try {
      const file = {
        uri:  path,
        name: `${Date.now()}.png`,
      }

      await client.send(new PutObjectCommand({ Bucket: "proyecto-ayd2", Key: file.name, Body: file, }) )
        .catch((error) => { console.log(error)})

      return "https://proyecto-ayd2.s3.us-east-2.amazonaws.com/" + file.name;

    } catch (error) {
      console.log(error);
    }
    return "";
  }, 
}

export default AWSHelper; 