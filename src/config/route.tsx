import IRoute from "../interfaces/route";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import DonatePage from "../pages/DonatePage";
import HelpPage from "../pages/HelpPage";
import BSCPage from "../pages/BSCPage";
const routes:IRoute[]=[

    {path:"/",name:"HomePage",title:'Home',component:HomePage,exact:true},
    {path:"/home",name:"HomePage",title:'Home',component:HomePage,exact:true},
    {path:"/donate",name:"DonatePage",title:'Donate',component:DonatePage,exact:true},
    {path:"/about",name:"AboutPage",title:'About',component:AboutPage,exact:true},
    {path:"/help",name:"HelpPage",title:'Help',component:HelpPage,exact:true},
    {path:"/bsc",name:"BSCPage",title:'BSCPage',component:BSCPage,exact:true},

];

export default routes;
