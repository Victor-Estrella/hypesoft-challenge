export default interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}