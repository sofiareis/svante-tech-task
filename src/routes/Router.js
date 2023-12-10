import React, {Suspense} from 'react';
import { Route, Routes } from 'react-router-dom';

import paths from './paths';
import PageLoading from '../pages/PageLoading/PageLoading'

const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));



const routes = [
    { path: paths.DASHBOARD, element: <Dashboard />},
    { path: paths.NOT_FOUND, element: <NotFound />},
];


const Router = () => (
    <Suspense fallback={<PageLoading />}>
        <Routes>
        {routes.map((route) => (
            <Route key={route.path} {...route} />
        ))}
        </Routes>
    </Suspense>
);

export default Router;