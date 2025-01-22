import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
}
