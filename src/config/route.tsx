import IRoute from "../interfaces/route";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import DonatePage from "../pages/DonatePage";
import HelpPage from "../pages/HelpPage";
import BSCPage from "../pages/BSCPage";
import ProofPage from "../pages/ProofPage";
import WormHolePage from "../pages/WormHolePage";
import WrappedLunaPage from "../pages/WrappedLunaPage";
const routes:IRoute[]=[

    {path:"/",name:"HomePage",title:'Home',component:HomePage,exact:true},
    {path:"/home",name:"HomePage",title:'Home',component:HomePage,exact:true},
    {path:"/donate",name:"DonatePage",title:'Donate',component:DonatePage,exact:true},
    {path:"/about",name:"AboutPage",title:'About',component:AboutPage,exact:true},
    {path:"/help",name:"HelpPage",title:'Help',component:HelpPage,exact:true},
    {path:"/bsc",name:"BSCPage",title:'BSCPage',component:BSCPage,exact:true},
    {path:"/transactions",name:"ProofPage",title:'Transactions',component:ProofPage,exact:true},
    {path:"/wormhole",name:"WormHoleBridgePage",title:'WormHole Bridge',component:WormHolePage,exact:true},
    {path:"/wrappedluna",name:"WrappedLunaPage",title:'Wrapped Luna',component:WrappedLunaPage,exact:true},

];

export default routes;
