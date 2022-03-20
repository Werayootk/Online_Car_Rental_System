import React from "react";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import UploadCar from "./UpdateCar";
import EditCar from "./EditCar";

const ManagementCar = (props) => {
  let match = useRouteMatch();
  console.log(`${match.url}`);
  return (
    <Switch>
      <Route
        exact
        path="/management"
        render={() => {
          return <UploadCar />;
        }}
      />
      <Route
        path="/management/:edit_car"
        render={() => {
          return <EditCar />;
        }}
      />
    </Switch>
  );
};

export default withRouter(ManagementCar);
