import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import useNotifications from './hooks/useNotifications.js';
import './index.css';
import { mainRoutes } from './routes/mainRoutes.jsx';

const router = createBrowserRouter(mainRoutes);

function App() {
    const { loading, error } = useNotifications();

    if (loading) return <Loader />;

    if (error) return <p>Error fetching notifications: {error.message}</p>;

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
