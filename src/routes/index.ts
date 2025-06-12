import { lazy } from 'react';
import type { RoutesConfig } from '../configs/models/router.model';


export const allRoutes: RoutesConfig[] = [
  {
    path: '/login',
    page: lazy(() => import('../pages/auth/Login')),
    private: false,
    roles: [],
  },
  {
    path: '/register',
    page: lazy(() => import('../pages/auth/Register')),
    private: false,
    roles: [],
  },
  {
    path: '/dashboard',
    page: lazy(() => import('../pages/Features/Dashboard')),
    private: true,
    roles: [],
  },
  {
    path: '/profile',
    page: lazy(() => import('../pages/Features/Profile')),
    private: true,
    roles: [],
  },
  {
    path: '/users',
    page: lazy(() => import('../pages/Features/Users')),
    private: true,
    roles: [],
  },
]