import React from "react";
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import UploadCar from './UpdateCar';
import DeleteCar from './DeleteCar';

const ManagementCar = (props) => {
    let match = useRouteMatch();
    console.log(`${match.url}`);
    return (
        <Switch>
            <Route exact path='/management'
                render={() => {
                    console.log('upload success')
                    return <UploadCar />
                }
            }
            />
            <Route
                path='/management/delete-car'
                render={() => {
                    console.log('del success')
                    return <DeleteCar />
                }}
            />
        </Switch>
    );
};

export default withRouter(ManagementCar);
