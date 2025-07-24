import Dashboard from '../pages/Customer/Dashboard'
import { Marketplace } from '../pages/Customer/Marketplace'
import { Projects } from '../pages/Customer/Projects'
import { Wallet } from '../pages/Customer/Wallet'
import { Posts } from '../pages/Customer/Posts'
import Profile from '../pages/Client/Profile'
import { MainLayout } from '../components/Layout/MainLayout'

export const PrivateRoutes = [
    {
        path: "/dashboard",
        element: <MainLayout><Dashboard/></MainLayout>
    },
    {
        path: "/marketplace",
        element: <MainLayout><Marketplace/></MainLayout>
    },
    {
        path: "/projects",
        element: <MainLayout><Projects/></MainLayout>
    },
    {
        path: "/wallet",
        element: <MainLayout><Wallet/></MainLayout>
    },
    {
        path: "/posts",
        element: <MainLayout><Posts/></MainLayout>
    },
    {
        path: "/profile",
        element: <MainLayout><Profile/></MainLayout>
    }
]
