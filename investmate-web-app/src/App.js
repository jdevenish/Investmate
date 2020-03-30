/*
      COMPONENT IMPORTS
*/
import React, {useState, createContext, useEffect} from 'react';
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import networkFunctions from "./networkFunctions";
import apiCred from "./apiDetails";

import stocksObj from "./StaticDataFiles/collectionTechnologyServices.json"
import {fetchBalanceSheet, fetchOverview, fetchPeerGroups} from "./networking";

function App() {
    const [stocksArr, setStocksArr] = useState(stocksObj);
    const [selectedSymbl, setSelectedSymbl] = useState("MSFT");
    const [sectors, setSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState("")
    const [showDetailsFor, setShowDetailsFor] = useState({
                                                                        symbl : "",
                                                                        keyStats : [],
                                                                        overview : {},
                                                                        peerGroups: []
                                                                    });

    // Fetch Stock Sectors
    useEffect(() => {
        const sectorsAPI = `${apiCred.url}/ref-data/sectors?token=${apiCred.apiKey}`;
        const makeApiCall = async () => {
            const res = await fetch(sectorsAPI);
            const json = await res.json();
            // console.log("FUNCTION - fetch stock sectors: ",json)
            setSectors(json)
        };
        makeApiCall()
    }, []);

    // Fetch Balance Sheet & Overview of User Selected Symbol
    useEffect(() => {
        // Copy of showDetails for. Update and use for setShowDetailsFor
        const tempBalanceSheetUpdate = {...showDetailsFor};

        // Make API Calls
        const makeApiCall = async () => {

            // Update Selected Symbol
            tempBalanceSheetUpdate.symbl = selectedSymbl;

            // Fetch Key Stats
            const balanceSheetAPI = `${apiCred.url}/stock/${selectedSymbl}/stats/?token=${apiCred.apiKey}`;
            const resBalanceSheet = await fetch(balanceSheetAPI);
            tempBalanceSheetUpdate.keyStats = await resBalanceSheet.json();

            // Fetch Company Overview
            const overviewAPI = `${apiCred.url}/stock/${selectedSymbl}/company?token=${apiCred.apiKey}`;
            const resOverview = await fetch(overviewAPI);
            tempBalanceSheetUpdate.overview = await resOverview.json();

            // Fetch Peer Companies
            const peerGroupAPI = `${apiCred.url}/stock/${selectedSymbl}/peers?token=${apiCred.apiKey}`;
            const resPeerGroups = await fetch(peerGroupAPI);
            tempBalanceSheetUpdate.peerGroups = await resPeerGroups.json();

            // tempBalanceSheetUpdate.symbl = selectedSymbl
            // tempBalanceSheetUpdate.balancesheet = fetchBalanceSheet(selectedSymbl);
            // tempBalanceSheetUpdate.overview = fetchOverview(selectedSymbl);
            // tempBalanceSheetUpdate.peerGroups = fetchOverview(selectedSymbl);

            setShowDetailsFor(tempBalanceSheetUpdate)
        };
        makeApiCall()

    }, [selectedSymbl]);


    return (
        <div className="App">
            <Header sectors={sectors} setSelectedSector={setSelectedSector}/>
            <div className="contentContainer" >
                <StocksContext.Provider value={ {stocksArr,
                                              setStocksArr,
                                                   sectors,
                                            selectedSector,
                                         setSelectedSector,
                                             selectedSymbl,
                                          setSelectedSymbl,
                                            showDetailsFor } }>
                    <Main />
                </StocksContext.Provider>
            </div>
            <Footer />
        </div>
  );
}

export default App;
export const StocksContext = createContext();