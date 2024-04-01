import ForgetView from '../views/ForgettView/ForgetView';
import LandingView from '../views/LandingView/LandingView';
import LoginView from '../views/LoginView/LoginView';
import RegisterRepartidorView from '../views/RegisterRepatidorView/RegisterRepatidorView';
import { Producto } from '../pages/Producto/Producto';
import { Catalogo } from '../pages/Catalogo/Catalogo';
import { CatalogoVendedor } from '../pages/Catalogo/CatalogoVendedor';
import ProfileSalePerson from "../pages/Profiles/ProfileSalePerson";
import ProfileUser from "../pages/Profiles/ProfileUser";
import ProfileAdmin from "../pages/Profiles/ProfileAdmin";
import HistoryBuys from "../pages/History-buys-sales/History-buys";
import HistorySales from "../pages/History-buys-sales/History_sales";
import { EditProduct } from '../pages/CrearProducto/EditProduct';
import SellerRequests from '../pages/SellerRequests/SellerRequests';
import EnableDisabled_User from '../pages/Enabled-disabled-user-seller/enable_disable_user';
import EnableDisabled_Seller from '../pages/Enabled-disabled-user-seller/enable_disable_seller';
import ErrorView from '../views/404View/404View';
import AdminReportsView from '../views/AdminReportsView/AdminReportsView';
import CustomProfile from '../pages/Profiles/Profile';
// import RecuperarPass from '../components/FogetPasswordForm/RecuperarPass';

import RecuperarPass from '../components/FogetPasswordForm/RecuperarPass';
import VerificarCodigo from '../components/FogetPasswordForm/VerificarCodigo';
import ChangePass from '../components/FogetPasswordForm/ChangePass';
import { Carrito } from '../pages/Carrito/Carrito';
import { PedidosUsuario } from '../pages/PedidosUsuario/PedidosUsuario';
import { MisVentas } from '../pages/MisVentas/MisVentas';

export const rutas = [
    {
        path: "/",
        element: <LandingView />
    },
    {
        path: "/log-in",
        element: <LoginView />
    },
    {
        path: "/register",
        element: <LandingView />
    },
    {
        path: "/register/vendedor",
        element: <RegisterRepartidorView />
    },
    //Usuario
    {
        path: "/forget-password",
        element: <RecuperarPass />
    },
    {

        path: "/producto/:id",
        element: <Producto />
    },
    //Usuario (ya)
    {
        path: "/catalogo",
        element: <Catalogo />
    },
    //Vendedor (ya)
    {
        path: "/vendedor/:id/catalogo",
        element: <CatalogoVendedor/>
    },
    //Vendedor (ya) 
    {
        path: "/producto/edit/:id",
        element: <EditProduct/>
    },
    //Vendedor (ya)
    {
        path: "/crear-producto",
        element: <EditProduct crear={true} />
    },
    {
        path: "*",
        element: <ErrorView />
    },
    {
        path:"/404",
        element:<ErrorView/>
    },
    // usuario (ya)
    {    
        path:"/profile-user",
        element:<ProfileUser/>
    },
    //Vendedor (ya)
    {
        path:"/profile-sale-person",
        element:<ProfileSalePerson/>
    },
    //Admin (ya)
    {
        path:"/profile-admin",
        element:<ProfileAdmin/>

    },
    {
        path: "/admin/reportes",
        element: <AdminReportsView />
    },
    //usuario (ya)
    {
        path:"/history-buys",
        element:<HistoryBuys/>

    },
    //Vendedor (ya)
    {
        path:"/history-sales",
        element:<HistorySales/>

    },
    {
        path:"/seller-requests",
        element:<SellerRequests/>

    },
    {
        path:"/enable-disable-user",
        element:<EnableDisabled_User/>
    },
    {
        path:"/enable-disable-seller",
        element:<EnableDisabled_Seller/>
    },

    {
        path:"/profile",
        element:<CustomProfile/>
    },

    {
        path:"/recuperar-contrasena",
        element:<RecuperarPass/>
    },
    {
        path:"/verificar-codigo",
        element:<VerificarCodigo/>
    },
    {
        path:"/cambiar-contrasena",
        element:<ChangePass/>
    },
    {
        path:"/carrito",
        element:<Carrito/>
    },
    {
        path:"/mis-pedidos",
        element:<PedidosUsuario/>
    },
    {
        path:"/mis-ventas",
        element:<MisVentas/>
    }

]