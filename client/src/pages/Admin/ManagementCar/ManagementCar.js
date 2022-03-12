import React from "react";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import UploadCar from "./UpdateCar";
import DeleteCar from "./DeleteCar";
/** TODO 15
 * 1. image upload and axios addCar formdata
 * 2. DelCar must Only update status Can't use send params
 */

const ManagementCar = (props) => {
  let match = useRouteMatch();
  console.log(`${match.url}`);
  return (
    <Switch>
      <Route
        exact
        path="/management"
        render={() => {
          console.log("upload success");
          return <UploadCar />;
        }}
      />
      <Route
        path="/management/:del"
        render={() => {
          console.log("del success");
          return <DeleteCar />;
        }}
      />
    </Switch>
  );
};

export default withRouter(ManagementCar);
