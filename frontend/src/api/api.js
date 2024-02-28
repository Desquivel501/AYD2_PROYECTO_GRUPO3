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

  return await fetch(signedURL.uploadURL, {
    method: "PUT",
    body: file,
  })
}

// Se envia por parametro el 'file' que se obtiene del input
// Ejemplo de como se usa:
// const uploadImage = async () => {
//   let url = "";
//   if (file){
//     url = await SubirImagen(file);
//   }
// }

// El response que se obtiene sera:
// {
// 	status: 200, 
// 	url: "https://proyecto-ayd2.s3.us-east-2.amazonaws.com/1709139841142.png....", 
// 	...
// }
// Asegurense de validar que la imagen sea valida (tipo png, jpg, jpeg, etc) antes de enviarla a la funcion ya que S3 no realiza la validacion y permite subir cualquier tipo de archivo
// El URL que se recibe es el URL de la imagen que se subio y se debe mandar a la base de datos
