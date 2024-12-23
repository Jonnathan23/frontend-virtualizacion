import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Login, { action as actionLoginUser } from "./pages/Login/Login";
import Welcome, { loader as loaderImages } from "./pages/Welcome/Welcome";
import SignUp, { action as actionSignUp } from "./pages/SignUp/SignUp";
import { action as actionImageForm } from './components/ImageForm/ImageForm'

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
                loader: loaderImages,
                action: actionImageForm
            },
            {
                path: 'virtual/singup',
                element: <SignUp />,
                action: actionSignUp

            }
        ]
    }
])