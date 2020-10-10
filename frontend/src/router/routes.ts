import Home from "../views/Home";
import Status from "../views/Status";
import AuthCallback from "../views/AuthCallback";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/status",
    exact: true,
    component: Status
  },
  {
    path: "/auth/callback",
    exact: true,
    component: AuthCallback
  }
]