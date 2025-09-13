import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (Component, requiredRole) => {
  return function AuthenticatedComponent(props) {
    const { loggedIn, isAdmin } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      // If not logged in, redirect immediately.
      if (!loggedIn) {
        router.replace("/login");
      } else if (requiredRole === "admin" && !isAdmin) {
        // If a required role is "admin" but user is not an admin, redirect.
        router.replace("/student/dashboard");
      } else if (requiredRole === "student" && isAdmin) {
        // If a required role is "student" but user is an admin, redirect.
        router.replace("/admin/dashboard");
      }
    }, [loggedIn, isAdmin, router, requiredRole]);

    // Render wrapped component only if logged in.
    return loggedIn ? <Component {...props} /> : null;
  };
};
