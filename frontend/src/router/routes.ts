import Home from "../views/Home";
import Status from "../views/Status";
import AuthCallback from "../views/AuthCallback";
import Servers from "../views/Servers";
import InviteCallback from "../views/InviteCallback";
import Dashboard from "../views/Servers/Dashboard";

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
  },
  {
    component: Servers,
    exact: true,
    path: '/servers'
  },
  {
    path: '/invite/callback',
    exact: true,
    component: InviteCallback
  },
  {
    path: '/servers/:id',
    component: Dashboard,
    exact: true
  }
]