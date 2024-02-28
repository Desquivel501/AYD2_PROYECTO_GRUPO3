const API = import.meta.env.VITE_API;
const S3 = import.meta.env.VITE_S3;

export async function getData({ endpoint }) {
  return fetch(`${API}${endpoint}`)
    .then((res) => res.json())
    .catch((er) => console.log(er));
}


// Subir imagenes a S3
export const SubirImagen = async (file) => {
  const signedURL = await fetch(`${S3}`, {
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

// Se envia por parametro el 'file' que se obtiene del input
// Ejemplo de como se usa:
// const uploadImage = async () => {
//   let url = "";
//   if (file){
//     url = await SubirImagen(file);
//   }
// }

// El response que se obtiene sera el URL de la imagen que se subio y se debe mandar a la base de datos
// Asegurense de validar que la imagen sea valida (tipo png, jpg, jpeg, etc) antes de enviarla a la funcion ya que S3 no realiza la validacion y permite subir cualquier tipo de archivo

export async function postData({ endpoint, body }) {

  const json = JSON.stringify(body);
  console.log(json);

  return fetch(`${API}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    },
    body: json,
  })
    .then((res) => res.json())
    .catch((er) => console.log(er));
}