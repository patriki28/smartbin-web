import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { mainRoutes } from './routes/mainRoutes.jsx';

const router = createBrowserRouter(mainRoutes);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ToastContainer />
        <RouterProvider router={router} />
    </React.StrictMode>
);
