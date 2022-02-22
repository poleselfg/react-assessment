import * as React from "react";
import { Route } from "react-router-dom";

import { ROUTES } from "./routes";

const Routes = () => (
  <>
    {ROUTES.map((route, i) => (
      <Route
        key={`${i}_${route.path}`}
        exact
        path={route.path}
        component={route.component}
      />
    ))}
  </>
);

export default React.memo(Routes);
