import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MasterLayout from "./layout/MasterLayout";
import NotFound from "./pages/NotFound";
import { RealmProvider } from "./context/realmProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./components/login/ResetPassword";
import Register from "./components/register/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RealmProvider id="ecard-vwdtg">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MasterLayout />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </RealmProvider>
);
