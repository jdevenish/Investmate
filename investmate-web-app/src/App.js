/*
      COMPONENT IMPORTS
*/
import React, {useState, createContext, useEffect} from 'react';
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import apiCred from "./apiDetails";

const sectorBlackList = ["Health Services", "Finance", "Non-Energy Minerals", "Miscellaneous"];

function App() {
    const [stocksArr, setStocksArr] = useState([]);
    const [selectedSymbl, setSelectedSymbl] = useState("");
    const [sectors, setSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState("dummySector");
    const [showDetailsFor, setShowDetailsFor] = useState({
                                                                        symbl : "",
                                                                        imgURL: "",
                                                                   latestPrice: -1,
                                                                        keyStats : [],
                                                                        overview : {},
                                                                        peerGroups: [],
                                                                    historicalData: []
                                                                    });
    const [favs, setFavs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

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

            const lastSelectedSector = localStorage.getItem("selectedSector");
            if(lastSelectedSector !== null){
                setSelectedSector(lastSelectedSector)
            }

            const localSelectedSymbol = localStorage.getItem("lastSelectedSymbol");
            if(localSelectedSymbol !== null){
                setSelectedSymbl(localSelectedSymbol);
            }

            const localFavs = JSON.parse(localStorage.getItem("favs"));
            if(localFavs !== null){
                setFavs(localFavs);
            }

            setSectors(filteredSectors)
        };
        makeSectorApiCall()

    }, []);

    useEffect( () => {

        // Check if user has selected a sector
        if(selectedSector !== "dummySector"){
            console.log("APP - fetchSectorData: Selected sector has been set. It's value is ", selectedSector)
            let sortedSelectedData = JSON.parse(localStorage.getItem(selectedSector));

            // Check if data in storage is valid. Fetch new data if it isn't.
            if(sortedSelectedData === null){
                console.log("APP - fetchSectorData: Existing data does not exist. New visitor or new selection")
                const makeSectorDataApiCall = async () => {

                    const sectorDataAPI = `${apiCred.url}/stock/market/collection/sector?collectionName=${encodeURIComponent(selectedSector)}&token=${apiCred.apiKey}`
                    const resSectorData = await fetch(sectorDataAPI);
                    const jsonSectorData = await resSectorData.json()

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
                makeSectorDataApiCall()

            } else{
                console.log("APP - fetchSectorData: Data exists in local storage. Returning user, use this data until another selection is made")
                setStocksArr(sortedSelectedData);
                setCurrentPage(1)
            }
        } else{
            console.log("Selected sector hasn't been set. Waiting for user input")
        }
    }, [selectedSector])

    useEffect(() => {
        console.log("Is this even running? ????? ");
        if(selectedSymbl.length > 0){
            console.log("APP - detailsApiCall: User made a selection or we pulled a previous selection from local storage")

            const copyShowDetailsFor = {...showDetailsFor};
            const makeDetailsApiCall = async () => {

                copyShowDetailsFor.symbl = selectedSymbl;

                const priceAPI = `${apiCred.url}/stock/${selectedSymbl}/price?token=${apiCred.apiKey}`;
                const resPriceAPI = await fetch(priceAPI)
                copyShowDetailsFor.latestPrice = await resPriceAPI.json();

                const fetchImgAPI = `${apiCred.url}/stock/${selectedSymbl}/logo?token=${apiCred.apiKey}`;
                const res = await fetch(fetchImgAPI);
                const json = await res.json();
                copyShowDetailsFor.imgURL = json.url;

                const balanceSheetAPI = `${apiCred.url}/stock/${selectedSymbl}/stats/?token=${apiCred.apiKey}`;
                const resBalanceSheet = await fetch(balanceSheetAPI);
                copyShowDetailsFor.keyStats = await resBalanceSheet.json();

                const overviewAPI = `${apiCred.url}/stock/${selectedSymbl}/company?token=${apiCred.apiKey}`;
                const resOverview = await fetch(overviewAPI);
                copyShowDetailsFor.overview = await resOverview.json();

                const peerGroupAPI = `${apiCred.url}/stock/${selectedSymbl}/peers?token=${apiCred.apiKey}`;
                const resPeerGroups = await fetch(peerGroupAPI);
                copyShowDetailsFor.peerGroups = await resPeerGroups.json();
                
                const historicalDataAPI = `${apiCred.url}/stock/${selectedSymbl}/chart/6m?token=${apiCred.apiKey}&chartInterval=20`;
                const resHistoricalData = await fetch(historicalDataAPI);
                const jsonHistoricalData = await resHistoricalData.json();
                const dataPointsArr = jsonHistoricalData.map((snapShot, index) =>{
                    let tempObject = {
                        x: new Date(snapShot.date),
                        y: [
                            snapShot.open,
                            snapShot.high,
                            snapShot.low,
                            snapShot.close
                        ]
                    };
                    return tempObject
                });
                copyShowDetailsFor.historicalData = dataPointsArr;
                setShowDetailsFor(copyShowDetailsFor)
            };
            makeDetailsApiCall()

        } else{
            console.log("APP - detailsApiCall: New or returning user. Checking local storage ...")
            const localSelectedSymbol = localStorage.getItem("lastSelectedSymbol");
            if(localSelectedSymbol !== null){
                console.log("APP - detailsApiCall: Returning user. Setting selectedSymbl")
                setSelectedSymbl(localSelectedSymbol);
            } else{
                console.log("APP - detailsApiCall: New user. Do nothing and wait for selection")
            }
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
                                         setShowDetailsFor,
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