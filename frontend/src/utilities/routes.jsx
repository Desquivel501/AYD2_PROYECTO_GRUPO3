import ForgetView from '../views/ForgettView/ForgetView';
import LandingView from '../views/LandingView/LandingView';
import LoginView from '../views/LoginView/LoginView';
import RegisterRepartidorView from '../views/RegisterRepatidorView/RegisterRepatidorView';
import { Producto } from '../pages/Producto/Producto';
import { Catalogo } from '../pages/Catalogo/Catalogo';
import { CrearProducto } from '../pages/CrearProducto/CrearProducto';
import { CatalogoVendedor } from '../pages/Catalogo/CatalogoVendedor';
import { EditProduct } from '../pages/CrearProducto/EditProduct';


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
        path: "/register/repartidor",
        element: <RegisterRepartidorView />
    },
    {
        path: "/forget-password",
        element: <ForgetView />
    },
    {
        path: "/producto/:id",
        element: <Producto />
    },
    {
        path: "/catalogo",
        element: <Catalogo />
    },
    {
        path: "/vendedor/:id/catalogo",
        element: <CatalogoVendedor/>
    },
    {
        path: "/producto/edit/:id",
        element: <EditProduct/>
    },
    {
        path: "/crear-producto",
        element: <CrearProducto />
    },
    {
        path: "*",
        element: <LandingView />
    }
]