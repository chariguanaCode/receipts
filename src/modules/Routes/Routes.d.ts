export interface RouteDefinitionType {
    path: string;
    label: string;
    component: React.FunctionComponent;
    exact?: boolean;
}
