import React, {useState, useContext, useEffect} from 'react';
import { StocksContext } from '../App'
import CompanyOverview from "./CompanyOverview";
import CompanyDetails from "./CompanyDetails";
import CompanyPeers from "./CompanyPeers";

function Details() {
    const sharedStates = useContext(StocksContext)

    // Might be undefined if user searched from the home component instead of linking
    // through the research component

    const stocksArrLocalStorage = JSON.parse(localStorage.getItem(sharedStates.selectedSector));
    const sectorSymblDetails = stocksArrLocalStorage.find((currentSymbObj) => {
        return currentSymbObj.symbol === sharedStates.selectedSymbl;
    });

    console.log("sectorSymblDetails = ", sectorSymblDetails)


    /*
     * Validating Data
     */
    console.log("Details - validate obj: ", sectorSymblDetails)
    console.log("Details - showDetailsFor: ", sharedStates.showDetailsFor)

    return (
        <div>
            <CompanyOverview sharedStates={sharedStates} currentSymbolDetails={sectorSymblDetails}/>
            <CompanyDetails sharedStates={sharedStates} currentSymbolDetails={sectorSymblDetails}/>
            <CompanyPeers sharedStates={sharedStates} currentSymbolDetails={sectorSymblDetails} />
        </div>
    );
}

export default Details;
