import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useMe } from "../Hooks/useMe";


export default function ProtectedRoute() {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    const { data, isLoading, isError } = useMe();

    // No token → definitely not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Checking token with backend
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Checking authentication...
            </div>
        );
    }

    // Token invalid / user doesn't exist
    if (isError) {
        logout();

        return <Navigate to="/login" replace />;
    }

    // Backend confirmed the user
    if (data?.user) {
        return <Outlet />;
    }

    return null;
}