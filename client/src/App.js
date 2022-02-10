import "./App.css";
import "antd/dist/antd.min.css";
import "./styles/main.scss";
//Layout
import DashboardLayoutRoute from "./components/DashboardLayout/DashboardLayout";
import MainLayoutRoute from "./components/MainLayout/MainLayout";
import EditLayoutRoute from "./components/EditLayout/EditLayout";
import ProgressBookLayoutRoute from "./components/ProgressBookLayout/ProgressBookLayout";
//Admin Pages
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Customer from "./pages/Admin/Customer/Customer";
import Order from "./pages/Admin/Order/Order";
import Management from "./pages/Admin/Management/Management";
import Cancel from "./pages/Admin/Cancel/Cancel";
//Client Pages
import Main from "./pages/Client/Main/Main";
import EditProfile from "./pages/Client/Edit/EditProfile";
import EditPassWord from "./pages/Client/Edit/EditPassWord";
import EditBooking from "./pages/Client/Edit/EditBooking";
import Login from './pages/Client/Signin/Login';
import Register from './pages/Client/Signin/Register';
import ForgotPassword from './pages/Client/Signin/ForgotPassword';
import Booking from './pages/Client/Booking/Booking';
import BookingDetail from "./pages/Client/Booking/BookingDetail";
import BookingReserving from "./pages/Client/Booking/BookingReserving";
import BookingVerify from "./pages/Client/Booking/BookingVerify";

import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/main" />;
        }}
      />
      <Route
        exact
        path="/logout"
        render={() => {
          return <Redirect to="/main" />;
        }}
      />
      <MainLayoutRoute exact path="/main" component={Main} />
      <MainLayoutRoute exact path="/login" component={Login} />
      <MainLayoutRoute exact path="/signup" component={Register} />
      <MainLayoutRoute exact path="/forgot" component={ForgotPassword} />

      <EditLayoutRoute exact path="/profile" component={EditProfile} />
      <EditLayoutRoute exact path="/editpassword" component={EditPassWord} />
      <EditLayoutRoute exact path="/booking" component={EditBooking} />

      <ProgressBookLayoutRoute exact path="/search-car" component={Booking} />
      <ProgressBookLayoutRoute exact path="/search-car-detail" component={BookingDetail} />
      <ProgressBookLayoutRoute exact path="/search-car-book" component={BookingReserving} />
      <ProgressBookLayoutRoute exact path="/search-car-verify" component={BookingVerify} />

      <Route
        exact
        path="/admin"
        render={() => {
          return <Redirect to="/dashboard" />;
        }}
      />
      <DashboardLayoutRoute exact path="/dashboard" component={Dashboard} />
      <DashboardLayoutRoute exact path="/customer" component={Customer} />
      <DashboardLayoutRoute exact path="/order" component={Order} />
      <DashboardLayoutRoute exact path="/management" component={Management} />
      <DashboardLayoutRoute exact path="/cancel" component={Cancel} />
    </Switch>
  );
}

export default withRouter(App);
