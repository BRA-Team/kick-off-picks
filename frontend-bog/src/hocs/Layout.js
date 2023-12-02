import React, { useEffect }  from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthenticated, load_user} from "../actions/auth";

const Layout = ({checkAuthenticated, load_user, children}) => {

    let location = useLocation();

    useEffect(() => {

        checkAuthenticated();
        load_user();
        
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
            {children}
        </div>
    )
};

export default connect(null, {checkAuthenticated, load_user})(Layout);