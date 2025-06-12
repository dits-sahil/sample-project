export interface RoutesConfig {
    path: string;
    page?: React.LazyExoticComponent<React.ComponentType<any>>;
    private: boolean;
    roles: string[];
    children?: RoutesConfig[];
  }