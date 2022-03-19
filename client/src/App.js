import "./App.css";
import "antd/dist/antd.min.css";
import "./styles/main.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Layout
import DashboardLayoutRoute from "./components/DashboardLayout/DashboardLayout";
import MainLayoutRoute from "./components/MainLayout/MainLayout";
import EditLayoutRoute from "./components/EditLayout/EditLayout";
import ProgressBookLayoutRoute from "./components/ProgressBookLayout/ProgressBookLayout";
//Admin Pages
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Customer from "./pages/Admin/Customer/Customer";
import Order from "./pages/Admin/Order/Order";
import ManagementCar from "./pages/Admin/ManagementCar/ManagementCar";
import Location from "./pages/Admin/Location/Location";
import Cancel from "./pages/Admin/Cancel/Cancel";
//Client Pages
import Main from "./pages/Client/Main/Main";
import EditProfile from "./pages/Client/Edit/EditProfile";
import EditPassWord from "./pages/Client/Edit/EditPassWord";
import EditBooking from "./pages/Client/Edit/EditBooking";
import Login from "./pages/Client/Signin/Login";
import Register from "./pages/Client/Signin/Register";
import ForgotPassword from "./pages/Client/Signin/ForgotPassword";
import ResetPassword from "./pages/Client/Signin/ResetPassword";
import Booking from "./pages/Client/Booking/Booking";
import BookingDetail from "./pages/Client/Booking/BookingDetail";
import BookingReserving from "./pages/Client/Booking/BookingReserving";
import BookingVerify from "./pages/Client/Booking/BookingVerify";
import PaymentMessage from "./pages/Others/PaymentMessage";

import localStorageServices from "./services/localStorageUserServices";

import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { bookingActions } from "./storage/reducers/bookingSlice";

function App() {
  const [role, setRole] = useState(localStorageServices.getRole());
  const dispatch = useDispatch();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/home" />;
        }}
      />
      <Route
      exact
      path="/logout"
      render={() => {
        localStorageServices.removeToken();
        setRole(localStorageServices.getRole());
        dispatch(bookingActions.clearBookingState());
        return <Redirect to="/" />;
      }}
    />
      <MainLayoutRoute
        exact
        path="/home"
        component={Main}
        role={role}
        setRole={setRole}
      />
      <MainLayoutRoute
        exact
        path="/login"
        component={Login}
        role={role}
        setRole={setRole}
      />
      <MainLayoutRoute
        exact
        path="/signup"
        component={Register}
        role={role}
        setRole={setRole}
      />
      <MainLayoutRoute
        exact
        path="/forgot"
        component={ForgotPassword}
        role={role}
        setRole={setRole}
      />

      <MainLayoutRoute
        exact
        path="/reset/:param_token"
        component={ResetPassword}
        role={role}
        setRole={setRole}
      />

      <EditLayoutRoute
        exact
        path="/profile"
        component={EditProfile}
        role={role}
        setRole={setRole}
      />
      <EditLayoutRoute
        exact
        path="/editpassword"
        component={EditPassWord}
        role={role}
        setRole={setRole}
      />
      <EditLayoutRoute
        exact
        path="/booking"
        component={EditBooking}
        role={role}
        setRole={setRole}
      />

      <ProgressBookLayoutRoute
        exact
        path="/search-car"
        component={Booking}
        role={role}
        setRole={setRole}
      />
      <ProgressBookLayoutRoute
        exact
        path="/search-car-detail"
        component={BookingDetail}
        role={role}
        setRole={setRole}
      />
      <ProgressBookLayoutRoute
        exact
        path="/search-car-book"
        component={BookingReserving}
        role={role}
        setRole={setRole}
      />
      <ProgressBookLayoutRoute
        exact
        path="/search-car-verify"
        component={BookingVerify}
        role={role}
        setRole={setRole}
      />

      <ProgressBookLayoutRoute
        exact
        path="/payment-success"
        component={PaymentMessage}
        role={role}
        setRole={setRole}
      />

      <Route
        exact
        path="/admin"
        render={() => {
          return <Redirect to="/dashboard" />;
        }}
      />
      <DashboardLayoutRoute
        exact
        path="/dashboard"
        component={Dashboard}
        role={role}
        setRole={setRole}
      />
      <DashboardLayoutRoute
        exact
        path="/customer"
        component={Customer}
        role={role}
        setRole={setRole}
      />
      <DashboardLayoutRoute
        exact
        path="/order"
        component={Order}
        role={role}
        setRole={setRole}
      />
      <DashboardLayoutRoute
        exact
        path="/management"
        component={ManagementCar}
        role={role}
        setRole={setRole}
      />
      <DashboardLayoutRoute
        exact
        path="/management/:del"
        component={ManagementCar}
        role={role}
        setRole={setRole}
      />
      <DashboardLayoutRoute
        exact
        path="/location"
        component={Location}
        role={role}
        setRole={setRole}
      />
      <DashboardLayoutRoute
        exact
        path="/cancel"
        component={Cancel}
        role={role}
        setRole={setRole}
      />
      {role === "user" && <Route render={() => <Redirect to="/" />} />}
      {role === "admin" && (
        <Route render={() => <Redirect to="/dashboard" />} />
      )}
    </Switch>
  );
}

export default withRouter(App);
