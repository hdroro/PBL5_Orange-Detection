//Layouts
import config from "../config/routes";

//Pages
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../components/Home/Home";
import Detection from "../components/Detection/Detection";
import Statistic from "../components/Statistic/Statistic";
import Devices from "../components/Devices/Devices";

//public routes
const publicRoutes = [
  { path: config.home, component: Home, layout: DefaultLayout },
  { path: config.detection, component: Detection, layout: DefaultLayout },
  { path: config.devices, component: Devices, layout: DefaultLayout },
  { path: config.statistics, component: Statistic, layout: DefaultLayout },
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
