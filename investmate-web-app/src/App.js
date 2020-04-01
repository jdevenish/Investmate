/*
      COMPONENT IMPORTS
*/
import React, {useState, createContext, useEffect} from 'react';
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import apiCred from "./apiDetails";

import staticStockData from "./StaticDataFiles/collectionTechnologyServices.json"

// These data sets are larger than 5MB making it impossible to store locally.
const sectorBlackList = ["Health Services", "Finance", "Non-Energy Minerals", "Miscellaneous"]

function App() {
    const [stocksArr, setStocksArr] = useState([]);
    const [selectedSymbl, setSelectedSymbl] = useState("MSFT");
    const [sectors, setSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState("dummySector")
    const [showDetailsFor, setShowDetailsFor] = useState({
                                                                        symbl : "",
                                                                        keyStats : [],
                                                                        overview : {},
                                                                        peerGroups: []
                                                                    });
    const [favs, setFavs] = useState([])
    const [currentPage, setCurrentPage] = useState(0)



    /*============ NETWORK CALL - Fetch Stock Sectors ==========================

        FETCH STOCK SECTOR OPTIONS PSEUDO CODE
        ON PAGE LOAD:
        SET sectors api with url and api key
        MAKE API call
            WAIT for results
            FILTER results against black list
            SET results equal to filteredSectors
            CHECK if local storage contains "lastSelectedSector"
                IF true
                    SET setSelectedSector = lastSelectedSector value -> triggers fetchStockSectorData
                END IF
                SET setSectors to filteredSectors
        END API

    ==========================================================================*/
    useEffect(() => {
        const sectorsAPI = `${apiCred.url}/ref-data/sectors?token=${apiCred.apiKey}`;
        const makeSectorApiCall = async () => {
            const res = await fetch(sectorsAPI);
            const json = await res.json();

            // Remove blacklisted sectors so app doesn't crash when trying to load
            const filteredSectors = json.filter((sector) => {
                let match = false;
                for(let i=0; i<sectorBlackList.length; i++){
                    if(sector.name === sectorBlackList[i]){
                        match = true
                    }
                }
                if(!match) return sector
            });

            // In case of page reload and we loose state, check if local storage
            // contains "selectedSector" and reset selectedSector to that value
            const lastSelectedSector = localStorage.getItem("selectedSector");
            if(lastSelectedSector !== null){
                setSelectedSector(lastSelectedSector)
            }

            // Set sector options
            setSectors(filteredSectors)
        };
        makeSectorApiCall()

        // Fetch this data once on page load
    }, []);

    /*============ NETWORK CALL - Fetch Stock Data =============================

        ON selectedSector Change: --> Includes initialization
            IF selectedSector is valid (not initialized value)
                SET sortedSectorData = localStorage of selectedSector
                IF sortedSectorData is valid (not null)
                    SET setStocksArr = sortedSectorData
                    SET current page to 1 -> triggers fetching icons
                ELSE
                    MAKE API call
                        WAIT for results
                        SORT results
                        CLEAR all local storage
                        SET sorted results to local storage
                        SET sorted results to setStocksArr
                        SET current page to 1 -> triggers fetching icons
                   END API call
                END IF
             END IF
    ==========================================================================*/
    useEffect( () => {

        // Check if user has selected a sector
        if(selectedSector !== "dummySector"){
            console.log("APP - fetchSectorData: Selected sector has been set. It's value is ", selectedSector)
            let sortedSelectedData = JSON.parse(localStorage.getItem(selectedSector));

            // Check if data in storage is valid. Fetch new data if it isn't.
            if(sortedSelectedData === null){
                console.log("APP - fetchSectorData: Existing data does not exist. New visitor or new selection")
                const fetchSectorData = async () => {
                    // const sectorDataAPI = `${apiCred.url}/stock/market/collection/sector?collectionName=${encodeURIComponent(selectedSector)}&token=${apiCred.apiKey}`
                    // const resSectorData = await fetch(sectorDataAPI);
                    // const jsonSectorData = await resSectorData.json()

                    const jsonSectorData = staticStockData;
                    const sortedSectorData = jsonSectorData.sort((a, b) => {
                        return b.avgTotalVolume - a.avgTotalVolume
                    });
                    localStorage.clear();
                    localStorage.setItem(selectedSector, JSON.stringify(sortedSectorData));
                    localStorage.setItem("selectedSector", selectedSector);
                    setStocksArr(sortedSectorData);
                    setCurrentPage(1)
                    console.log("APP - fetchSectorData: fetch complete. All states updated")
                };
                fetchSectorData()

            // Use data in storage if it's valid
            } else{
                console.log("APP - fetchSectorData: Data exists in local storage. Returning user, use this data until another selection is made")
                setStocksArr(sortedSelectedData);
                setCurrentPage(1)
            }
        // Selected sector still has initialized value. Waiting for user input
        } else{
            console.log("Selected sector hasn't been set. Waiting for user input")
        }
        // Trigger this function if the user selects a new sector
    }, [selectedSector])


    /*============ NETWORK CALL - Fetch Stock Sectors ==========================

        Fetch Key Stats & Overview of User Selected Symbol

    ==========================================================================*/
    useEffect(() => {
        // Copy of showDetails for Update and use in setShowDetailsFor
        const tempBalanceSheetUpdate = {...showDetailsFor};
        if(stocksArr.length > 0) {

            // Make API Calls
            const makeDetailsApiCall = async () => {

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

                setShowDetailsFor(tempBalanceSheetUpdate)
            };
            makeDetailsApiCall()
        }

    }, [selectedSymbl]);


    return (
        <div className="App">
            <Header sectors={sectors} selectedSector={selectedSector} setSelectedSector={setSelectedSector} setCurrentPage={setCurrentPage}/>
            <div className="contentContainer" >
                <StocksContext.Provider value={ {stocksArr,
                                              setStocksArr,
                                                   sectors,
                                            selectedSector,
                                         setSelectedSector,
                                             selectedSymbl,
                                          setSelectedSymbl,
                                            showDetailsFor,
                                                      favs,
                                                   setFavs,
                                               currentPage,
                                            setCurrentPage} }>
                    <Main />
                </StocksContext.Provider>
            </div>
            <Footer />
        </div>
  );
}

export default App;
export const StocksContext = createContext();