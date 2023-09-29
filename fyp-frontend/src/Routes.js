import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";

export const Routes = () => {
return (
    <Router>
        <Switch>
            <Route path="/Home">
            <HomePage/>
            </Route>
        </Switch>
    </Router>
)

}