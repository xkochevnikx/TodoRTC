import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

//todo - отрисовываем пути
const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    element={route.component}
                    path={route.path}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
