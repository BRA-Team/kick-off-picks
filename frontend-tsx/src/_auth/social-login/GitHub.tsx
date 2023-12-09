
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/_state";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import queryString from "query-string";


const GitHub = () => {
    let location = useLocation();

    const dispatch = useDispatch();
    const { githubAuthenticate, load_user} = bindActionCreators(actionCreators, dispatch);

    //------------------------------------------------------------------------------

    useEffect(() => {
        const values = queryString.parse(location.search);

        let state = '';
        let code = '';

        if (Array.isArray(values.state)) {
          state = values.state[0] || '';
        } else {
          state = values.state || '';
        }
        if (Array.isArray(values.code)) {
          code = values.code[0] || '';
        } else {
          code = values.code || '';
        }

        //console.log('State: ' + state);
        //console.log('Code: ' + code);

        if (state && code) {
          githubAuthenticate(state, code);
          load_user();
        }
    }, [location]);

    return (
      <Navigate to='/' />
    );
};

export default GitHub;
