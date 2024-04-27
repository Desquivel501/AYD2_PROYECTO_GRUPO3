const user = localStorage.getItem("user");

export const navbar_routes = {
    vendedor: [
        // {
        //     path: "/",
        //     name: "Inicio"
        // },
        {
            // path: `/vendedor/${JSON.parse(user).id}/catalogo`,	
            path: user ? `/vendedor/${JSON.parse(user).id}/catalogo` : "/404",	
            name: "Catalogo"
        },
        // {
        //     path: "/crear-producto",
        //     name: "Crear Producto"
        // },
        {
            path: "/mis-ventas",
            name: "Mis Ventas"
        }
    ],

    usuario: [
        // {
        //     path: "/",
        //     name: "Inicio"
        // },
        {
            path: "/catalogo",
            name: "Catalogo"
        },
        {
            path: "/mis-pedidos",
            name: "Mis Pedidos"
        }
    ],

    admin: [
        {
            path: "/seller-requests",
            name: "Solicitudes"
        },
        {
            path: "/enable-disable-user",
            name: "Gestionar Usuarios"
        },
        {
            path: "/enable-disable-seller",
            name: "Gestionar Vendedores"
        },
        {
            path: "/admin/reportes",
            name: "Reportes"
        }
    ]   
}