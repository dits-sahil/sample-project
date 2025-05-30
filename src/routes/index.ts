import { lazy } from 'react';
import type { RoutesConfig } from '../configs/models/router.model';


export const allRoutes: RoutesConfig[] = [
  {
    path: '/login',
    page: lazy(() => import('../pages/auth/login')),
    private: false,
    roles: [],
  },
]