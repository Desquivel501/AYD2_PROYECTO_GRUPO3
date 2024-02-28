import ForgetView from '../views/ForgettView/ForgetView';
import LandingView from '../views/LandingView/LandingView';
import LoginView from '../views/LoginView/LoginView';
import RegisterRepartidorView from '../views/RegisterRepatidorView/RegisterRepatidorView';
import ProfileSalePerson from "../components/Profiles/ProfileSalePerson";
import ProfileUser from "../components/Profiles/ProfileUser";
import ProfileAdmin from "../components/Profiles/ProfileAdmin";

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
        path:"/profile-user",
        element:<ProfileUser/>
    },
    {
        path:"/profile-sale-person",
        element:<ProfileSalePerson/>
    },
    {
        path:"/profile-admin",
        element:<ProfileAdmin/>
    }
]