import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setTokenIsNotThere, setTokenIsThere } from "@/config/redux/reducer/authReducer";
import { loginAdmin, loginUser } from "@/config/redux/action/authAction";

export function useAuthCheck() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // If logout has been initiated, skip the auth check.
    if (authState.logoutInitiated) return;

    const token = localStorage.getItem("userToken");
    if (!token) {
      dispatch(setTokenIsNotThere());
      router.push("/login");
    } else {
      // Check if the user is stored as admin.
      const isAdminStored = localStorage.getItem("isAdmin") === "true";
      dispatch(setTokenIsThere());
      if (!authState.loggedIn) {
        if (isAdminStored) {
          dispatch(loginAdmin({ token }));
        } else {
          dispatch(loginUser({ token }));
        }
      }
    }
  }, [dispatch, router, authState.loggedIn, authState.logoutInitiated]);

  return authState;
}
