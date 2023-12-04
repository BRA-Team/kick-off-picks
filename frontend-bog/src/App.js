import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Google from "./containers/Google";
import Layout from "./hocs/Layout";

import { Provider } from "react-redux";
import store from "./store";
import GitHub from "./containers/GitHub";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route element={<Layout />} > 
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/google" element={<Google />} />
                        <Route path="/github" element={<GitHub />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
  }

export default App;