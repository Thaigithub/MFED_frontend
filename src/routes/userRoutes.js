import Homepage from '../pages/user/homepage';
import Dashboard from '../pages/user/dashboard';
const userRoutes = [
    {
        path: '/',
        component: Homepage,
        layout: null
    },
    {
        path: '/dashboard',
        component: Dashboard,
        layout: null
    },
]

export {userRoutes}