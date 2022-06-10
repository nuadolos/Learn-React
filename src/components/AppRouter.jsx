import { Navigate, useRoutes } from "react-router-dom";
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import Loader from "../components/UI/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../context";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);

    const publicRoute = useRoutes([
        { path: '/login', element: <Login /> },
        { path: '/*', element: <Navigate to="/login" /> }
    ]);

    const privateRoute = useRoutes([
        { path: '/about', element: <About /> },
        { path: '/posts', element: <Posts /> },
        { path: '/posts/:id', element: <PostIdPage /> },
        { path: '/error', element: <Error /> },
        { path: '/*', element: <Navigate to="/posts" /> }
    ]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Loader />
            </div>
        )
    };

    return (
        isAuth ? privateRoute : publicRoute
    );
}

export default AppRouter;