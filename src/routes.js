// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import AboutUs from "./layouts/addAboutUs/index";
import PrvicayPolicy from "./layouts/addPrvicayPolicy/index";
import TermsAndCondition from "./layouts/addTermsAndCondition/index";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "user",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "AboutUs",
    key: "about_us",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/about_us",
    component: <AboutUs />,
  },
  {
    type: "collapse",
    name: "PrvicayPolicy",
    key: "privacy_policy",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/privacy_policy",
    component: <PrvicayPolicy />,
  },
  {
    type: "collapse",
    name: "TermsAndCondition",
    key: "terms_and_condition",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/terms_and_condition",
    component: <TermsAndCondition />,
  },
];

export default routes;
