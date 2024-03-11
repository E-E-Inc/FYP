import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Base } from "./pages/BaseScreen";

export const Routes = () => {
  return (
    // <Router>
    //     <Switch>
    //         <Route path="/Home">
    //         <HomePage/>
    //         </Route>
    //     </Switch>
    // </Router>
    <Router basename={"/directory-name"}>
      <Route path="/" component={Base} />
      {/* … */}
    </Router>
  );
};
