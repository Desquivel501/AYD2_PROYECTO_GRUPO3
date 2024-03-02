import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//En este revisa el permiso del usuario para poder entrar a la vista
export function useUserPermission(rol, landing = false) {
    let dataU = null;
    const cachedData = localStorage.getItem('user');
    if (cachedData) {
        dataU = JSON.parse(cachedData);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!dataU) {
            navigate("/log-in");
        }else{
            if (dataU.type !== rol ) {
                navigate("/404");
                /* if(dataU.data.user.rol === 0 ){
                    navigate("/home");
                } */
                /* if (dataU.data.rol === 4) {
                    navigate("/user");
                } else if (dataU.data.rol === 2) {
                    navigate("/empresa");
                } else if (dataU.data.rol === 3) {
                    navigate("/repartidor");
                }
                else if (dataU.data.rol === 1) {
                    navigate("/admin");
                }*/
            }
        }
        /* if (dataU) {
            if (dataU.data.user.rol !== rol ) {
                navigate("/404");
                /* if(dataU.data.user.rol === 0 ){
                    navigate("/home");
                } */
                /* if (dataU.data.rol === 4) {
                    navigate("/user");
                } else if (dataU.data.rol === 2) {
                    navigate("/empresa");
                } else if (dataU.data.rol === 3) {
                    navigate("/repartidor");
                }
                else if (dataU.data.rol === 1) {
                    navigate("/admin");
                }
            }
        } else {
            landing ? navigate("/") : navigate("/log-in");
        } */
    }, [])
}

export function useAdminPermission() {
    let dataU = null;
    const navigate = useNavigate();
    const cachedData = localStorage.getItem('user');
    if (cachedData) {
        dataU = JSON.parse(cachedData);
    }

    useEffect(() => {
        if (dataU) {
            if (dataU.data.rol !== 1) {
                navigate("/home");
            }
        } else {
            navigate("/log-in");
        }
    }, [])
}

export function usePermissionNavigation() {
    let dataU = null;
    const navigate = useNavigate();
    const cachedData = localStorage.getItem('user');
    if (cachedData) {
        dataU = JSON.parse(cachedData);
    }

    useEffect(() => {
        if (dataU) {
            if (dataU.type === 0) {
                navigate("/profile-admin");
            } else if (dataU.type === 1) {
                navigate("/catalogo");
            }else if (dataU.type === 2) {
                navigate("/profile-sale-person");
            }
        }
    }, [])
}