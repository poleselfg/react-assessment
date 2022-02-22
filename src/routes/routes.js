import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Profile from "../pages/Profile";
import { LOGIN_ROUTE, LOGOUT_ROUTE, POSTS_ROUTE, PROFILE_ROUTE } from "./constants";

export const ROUTES = [
    {
        path: LOGIN_ROUTE,
        component: Login,
    },
    {
        path: LOGOUT_ROUTE,
        component: null,
    },
    {
        path: POSTS_ROUTE,
        component: Posts,
    },
    {
        path: PROFILE_ROUTE,
        component: Profile,
    }
]
