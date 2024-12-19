import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Login, { action as actionLoginUser } from "./pages/Login/Login";
import Welcome from "./pages/Welcome";
import SignUp, { action as actionSignUp } from "./pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login />,
                action: actionLoginUser

            },
            {
                path: 'virtual/welcome',
                element: <Welcome />,

            },
            {
                path: 'virtual/singup',
                element: <SignUp />,
                action: actionSignUp
            }
        ]
    }
])