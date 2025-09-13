import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const withAuth = (Component, requiredRole = null) => {
  return (props) => {
    const router = useRouter();
    const authState = useAuthCheck(); // performs the token check and login dispatch

    useEffect(() => {
      // If not logged in, the hook already pushes to /login.
      // Here, you check if the required role is correct.
      if (authState.loggedIn && requiredRole) {
        if (requiredRole === "admin" && !authState.isAdmin) {
          router.replace("/dashboard/student");
        } else if (requiredRole === "student" && authState.isAdmin) {
          router.replace("/dashboard/admin");
        }
      }
    }, [authState, router, requiredRole]);

    // Render component only if logged in.
    return authState.loggedIn ? <Component {...props} /> : null;
  };
};

export default withAuth;
