import "./App.css";
import 'antd/dist/antd.min.css';
import './styles/main.scss';

import DashboardLayoutRoute from './components/DashboardLayout/DashboardLayout';
import MainLayoutRoute from "./components/MainLayout/MainLayout";
//Admin Pages
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Customer from './pages/Admin/Customer/Customer';
import Order from './pages/Admin/Order/Order';
import Management from './pages/Admin/Management/Management';
import Cancel from './pages/Admin/Cancel/Cancel';
//Client Pages
import Main from './pages/Client/Main/Main';
import EditProfile from './pages/Client/Edit/EditProfile';
import EditPassWord from './pages/Client/Edit/EditPassWord';
import EditBooking from './pages/Client/Edit/EditBooking';

import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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
      <MainLayoutRoute
        exact
        path="/main"
        component={Main}
      />
      <MainLayoutRoute
        exact
        path="/profile"
        component={EditProfile}
      />
      <MainLayoutRoute
        exact
        path="/editpassword"
        component={EditPassWord}
      />
      <MainLayoutRoute
        exact
        path="/booking"
        component={EditBooking}
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
      />
      <DashboardLayoutRoute
        exact
        path="/customer"
        component={Customer}
      />
      <DashboardLayoutRoute
        exact
        path="/order"
        component={Order}
      />
      <DashboardLayoutRoute
        exact
        path="/management"
        component={Management}
      />
      <DashboardLayoutRoute
        exact
        path="/cancel"
        component={Cancel}
      />
    </Switch>
  );
}

export default withRouter(App);
