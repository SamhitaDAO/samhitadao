import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoin, filecoinHyperspace } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import SelectTemplate from "./components/SelectTemplate";
import TemplateDetails from "./components/TemplateDetails";
import CreateDao from "./components/stepsform/CreateDao";
import Dashboard from "./pages/Dashboard";
import PreExistingDaos from "./components/PreExistingDaos";
import Template from "./components/Template";
import YourDaos from "./components/YourDaos";
import ExistingDaos from "./pages/ExistingDaos";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Meet from "./pages/Meet";
import Home from "./pages/Home";
import DataDaoDetails from "./components/DataDaoDetails";
import AllDataDaos from "./components/AllDataDaos";
import AboutBecomeMember from "./components/aboutPlatform/AboutBecomeMember";
import Choosedatapattern from "./components/datapatterns/Choosedatapattern";
import Datacraft from "./components/datapatterns/Datacraft";
import Datascrape from "./components/datapatterns/Datascrape";
import Apihubmainpage from "./components/API Hub/Apihubmainpage";
import CreateProposal from "./components/CreateProposal";
import YourDataDaoDetails from "./components/YourDataDaoDetails";
import YouDaos from "./components/YouDaos";
import Mainpageyourdaos from "./components/yourDAOs/Mainpageyourdaos";
import Detailsofthedao from "./components/yourDAOs/Detailsofthedao";
import Mainpageofdashboard from "./components/Dashboard/Mainpageofdashboard";
import Createproposalpopup from "./components/Dashboard/Createproposalpopup";
import Joineddao from "./components/yourDAOs/Joineddao";
import Createproposalsamhita from "./components/Createproposalsamhita";
import PreExistingdaos from "./components/Existing dao/PreExistingdaos";
import Samhitadaodetail from "./components/Existing dao/Samhitadaodetail";
import Samhitacreateproposalpopup from "./components/Dashboard/Samhitacreateproposalpopup";

function App() {
  const BTTChain = {
    id: 1029,
    name: "BitTorrent Chain Donau",
    network: "BitTorrent Chain Donau",
    iconUrl: "https://testscan.bt.io/static/media/BTT.e13a6c4e.svg",
    iconBackground: "#fff",
    nativeCurrency: {
      decimals: 18,
      name: "BitTorrent Chain Donau",
      symbol: "BTT",
    },
    rpcUrls: {
      default: " https://pre-rpc.bt.io",
    },
    blockExplorers: {
      default: {
        name: "BitTorrent Chain Donau",
        url: "https://testnet.bttcscan.com",
      },
    },
    testnet: true,
  };

  const { chains, provider } = configureChains(
    [BTTChain],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: " https://pre-rpc.bt.io",
        }),
      }),
      alchemyProvider({ apiKey: "O5NYvtwLMNG0LjAXPQEk0YJT2l3UxTAY" }),
      // publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    // projectId: "2571f92e65f5482dd24c5308437191cc",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              {/* <-------------------------------------------------------------------------------------------> */}
              {/* landing page routes */}
              {/* <-------------------------------------------------------------------------------------------> */}

              <Route path="/" element={<Home />} />
              <Route
                path="/how-samhitaDAO-works"
                element={<AboutBecomeMember />}
              />
              {/* <--------------------------------------------------------------------------------------------> */}
              {/* all routes here are for --> create language dao */}
              {/* <--------------------------------------------------------------------------------------------> */}
              <Route path="/select-template" element={<SelectTemplate />} />
              <Route
                path="/create-data-dao/select-template/details"
                element={<TemplateDetails />}
              />
              <Route path="/create-dao" element={<CreateDao />} />
              {/* <----------------------------------------------------------------------------------------------> */}
              {/* all routes here are for --> your daos */}
              {/* <-----------------------------------------------------------------------------------------------> */}
              <Route
                path="/main-page-your-daos"
                element={<Mainpageyourdaos />}
              />
              <Route
                // path="/go-to-main-dashboard/:id"
                path="/go-to-main-dashboard"
                element={<Mainpageofdashboard />}
              />
              {/* <Route path="/" element={<Joineddao />} /> */}
              {/* <Route
                path="/maindashboard/:daoId/*"
                element={<Mainpageofdashboard />}
              /> */}
              {/* Routes of data tool */}
              <Route
                path="/go-to-choose-template"
                element={<Choosedatapattern />}
              />
              <Route path="/go-to-api-hub" element={<Apihubmainpage />} />
              <Route
                path="/go-to-choose-template/datacraft"
                element={<Datacraft />}
              />
              <Route
                path="/go-to-choose-template/datascrape"
                element={<Datascrape />}
              />
              <Route
                path="/samhita-proposal"
                // element={<Createproposalsamhita />}
                element={<Samhitacreateproposalpopup />}
              />
              <Route
                path="/createproposalpopup"
                element={<Createproposalpopup />}
              />

              {/* <Route path="/go-to-form" element={<Createproposalpopup />} /> */}

              {/* <-----------------------------------------------------------------------------------------> */}
              {/* all routes here for --> pre existing dao */}
              {/* <-----------------------------------------------------------------------------------------> */}
              <Route
                path="/go-to-create-proposal"
                element={<CreateProposal />}
              />

              <Route path="/go-to-your" element={<YourDataDaoDetails />} />

              <Route path="/detail-of-the-dao" element={<Detailsofthedao />} />
              {/* <Route
                path="/detail-of-samhita-dao"
                element={<Samhitadaodetail />}
              /> */}
              <Route path="/template" element={<Template />} />
              <Route path="/your-daos" element={<YourDaos />} />
              <Route
                path="/pre-existing-data-dao"
                // element={<PreExistingDaos />}
                element={<PreExistingdaos />}
                // element={<Already />}
              />
              <Route path="/all-daos" element={<AllDataDaos />} />
              <Route path="/open-existing-data-dao" element={<Dashboard />} />
              <Route path="/you-daos" element={<YouDaos />} />
              {/* <Route path="/open-existing-data-dao/meet" element={<Meet />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/data-dao-details" element={<DataDaoDetails />} />

              <Route
                path="/open-existing-data-dao/:id"
                element={<Dashboard />}
              />
            </Routes>
          </Router>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
