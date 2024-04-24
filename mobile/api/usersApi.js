import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { variable } from './variables';
//const baseUrl = variable.base_url;
const baseUrl = variable.base_url;

//console.log(baseUrl)
const api = axios.create({
    baseURL: baseUrl,
});

export const getUsers = () => api.get('/getUsers').then(res => res.data);

// Login user

export const logIn = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/user/login', user)
};


export const useUserLogin = () => {
    //console.log(useMutation(logIn))
    const queryClient = useQueryClient();
    return useMutation(logIn, {
        onSuccess: (data) => {
            console.log(data)
            /* queryClient.setQueryData('user', () => {
                return {
                    data: d,
                }
            }); */
            if (data.data.TYPE === "ERROR") {
                console.log("Error")
            } else {
                queryClient.setQueryData('user', data, { keepPreviousData: true });
                /* localStorage.setItem('user', JSON.stringify({
                    "type": parseInt(data.data.MESSAGE),
                    "id":  parseInt(data.data.DATA),
                })); */
            }
        }
    });
}

// Add user

export const addUser = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/user/register', user)
};

export const useAddUser = () => {
    //console.log(useMutation(logIn))
    return useMutation(addUser, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}

// Update user

export const updateUser = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/user/update', user)
};

export const useUpdateUser = () => {
    //console.log(useMutation(logIn))
    return useMutation(updateUser, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}

//Verification code

export const verifyCode = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/user/verify', user)
};

export const useVerifyCode = () => {
    //console.log(useMutation(logIn))
    return useMutation(verifyCode, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}


// Add repartidor

export const addRepartidor = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/registroRepartidor', user)
};

export const useAddRepartidor = () => {
    //console.log(useMutation(logIn))
    return useMutation(addRepartidor, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}

// Add empresa

export const addEmpresa = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/registroEmpresa', user)
};

export const useAddEmpresa = () => {
    //console.log(useMutation(logIn))
    return useMutation(addEmpresa, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}


// Delete user

export const deleteUser = (user) => {
    return api.post('/usuarios/deleteUser', user)
};

export const useDeleteUser = () => {
    //console.log(useMutation(logIn))
    return useMutation(deleteUser, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}


export const realizarPedido = (pedido) => {
    return api.post('/realizarPedido', pedido)
};

export const useRealizarPedido = () => {
    //console.log(useMutation(logIn))
    return useMutation(realizarPedido, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}


export const getEmpresasList = (categoria) => {
    return api.post('/empresasCategoria', categoria)
};

export const useEmpresasList = () => {
    return useMutation(getEmpresasList, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}


export const getPedidosUsuario = (usuario) => {
    return api.post('/historialPedidosU', usuario)
};

export const usePedidosUsuario = () => {
    return useMutation(getPedidosUsuario, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}

// Para calificar el pedido
export const calificarPedido = (pedido) => {
    return api.post('/calificar', pedido)
};

export const useCalificarPedido = () => {
    return useMutation(calificarPedido, {
        onSuccess: (data) => {
            console.log(data)
        }
    });
}