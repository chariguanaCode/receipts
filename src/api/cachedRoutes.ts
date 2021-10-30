export const CachedRoutesList = ['/user', '/user/servers'] as const;
export type CachedRoutes = typeof CachedRoutesList[number];

export default CachedRoutes;
