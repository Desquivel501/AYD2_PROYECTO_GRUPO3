import ForgetView from '../views/ForgettView/ForgetView';
import LandingView from '../views/LandingView/LandingView';
import LoginView from '../views/LoginView/LoginView';
import RegisterRepartidorView from '../views/RegisterRepatidorView/RegisterRepatidorView';

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
    }
]