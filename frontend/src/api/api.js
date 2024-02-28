const API = import.meta.env.VITE_API;

export async function getData({ endpoint }) {
    return fetch(`${API}${endpoint}`)
      .then((res) => res.json())
      .catch((er) => console.log(er));
  }