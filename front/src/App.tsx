import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./containers/MainPage";
import Users from "./containers/AuthPage";
import NotFound from "./containers/NotFound";
import SignUpPage from "./containers/SignUpPage";
import Todos from "./containers/Todos";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/auth"} element={<Users />} />
                <Route path={"/signup"} element={<SignUpPage />} />
                <Route path={"/todos"} element={<Todos />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
