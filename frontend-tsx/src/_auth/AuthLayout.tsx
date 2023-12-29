import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthState, actionCreators } from "@/_state";

const imagePath = import.meta.env.VITE_APP_STATIC_PATH + "/assets/images/side-img.svg";

export default function AuthLayout() {

  const dispatch = useDispatch();
  const { checkAuthenticated, load_user } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state: AuthState) => state.authState);
  const { isAuthenticated } = state;


  useEffect(() => {

    checkAuthenticated();
    load_user();
    
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src={imagePath}
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}