import {S3_SIGNED_URL} from "@env";
  // Subir imagenes a S3
export const SubirImagen = async (file) => {
    const signedURL = await fetch(`${S3_SIGNED_URL}`, {
        method: "GET",
    })
    .then((res) => res.json())
    .catch((er) => console.log(er));

    const url =  await fetch(signedURL.uploadURL, {
        method: "PUT",
        body: file,
    })

    return url.url.slice(0, url.url.indexOf("?"));
}