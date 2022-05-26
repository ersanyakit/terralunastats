import IRoute from "../interfaces/route";

import HomePage from "../pages/HomePage";
import USTPage from "../pages/USTPage";
import AboutPage from "../pages/AboutPage";
import DonatePage from "../pages/DonatePage";
import HelpPage from "../pages/HelpPage";
import BSCPage from "../pages/BSCPage";
import ProofPage from "../pages/ProofPage";
import WormHolePage from "../pages/WormHolePage";
import WrappedLunaPage from "../pages/WrappedLunaPage";
import LeaderBoard from "../pages/LeaderBoardPage";
import NFTPage from "../pages/NFTPage";
import NFTStakePage from "../pages/StakePage";
import NFTMarketPlace from "../pages/MarketPlace";
import NFTUpgradePage from "../pages/NFTUpgradePage";
import USTProofPage from "../pages/USTProofPage";
import USTLeaderBoardPage from "../pages/USTLeaderBoardPage";
const routes:IRoute[]=[

    {path:"/",name:"HomePage",title:'Home',component:HomePage,exact:true},
    {path:"/home",name:"HomePage",title:'LUNA',component:HomePage,exact:true},
    {path:"/ust",name:"USTPage",title:'UST',component:USTPage,exact:true},

    {path:"/donate",name:"DonatePage",title:'Donate',component:DonatePage,exact:true},
    {path:"/about",name:"AboutPage",title:'About',component:AboutPage,exact:true},
    {path:"/nft",name:"NFTPage",title:'NFT',component:NFTPage,exact:true},
    {path:"/stake",name:"StakePage",title:'NFT Stake',component:NFTStakePage,exact:true},
    {path:"/market",name:"MarketPlacePage",title:'NFT Marketplace',component:NFTMarketPlace,exact:true},
    {path:"/upgrade",name:"NFTUpgradePage",title:'NFT Upgrade Page',component:NFTUpgradePage,exact:true},
    {path:"/bsc",name:"BSCPage",title:'BSCPage',component:BSCPage,exact:true},
    {path:"/transactions",name:"ProofPage",title:'Transactions',component:ProofPage,exact:true},

    {path:"/transactions/ust",name:"ProofPage",title:'UST Transactions',component:USTProofPage,exact:true},
    {path:"/leaderboard/ust",name:"LeaderBoardPage",title:'UST Leaderboard',component:USTLeaderBoardPage,exact:true},


    {path:"/wormhole",name:"WormHoleBridgePage",title:'WormHole Bridge',component:WormHolePage,exact:true},
    {path:"/wrappedluna",name:"WrappedLunaPage",title:'Wrapped Luna',component:WrappedLunaPage,exact:true},
    {path:"/leaderboard",name:"LeaderBoardPage",title:'LUNA Leaderboard',component:LeaderBoard,exact:true},

];

export default routes;
