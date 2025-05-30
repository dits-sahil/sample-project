

export const allRoutes: RoutesConfig[] = [
  {
    path: '/login',
    page: lazy(() => import('../Pages/Auth/Login')),
    private: false,
    roles: [],
  },
]