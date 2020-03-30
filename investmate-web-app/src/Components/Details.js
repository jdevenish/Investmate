import React, {useState, useContext, useEffect} from 'react';
import { StocksContext } from '../App'
import CompanyOverview from "./CompanyOverview";
import CompanyDetails from "./CompanyDetails";
import CompanyPeers from "./CompanyPeers";

function Details(props) {
    const sharedStates = useContext(StocksContext)

    // Might be undefined if user searched from the home component instead of linking
    // through the research component
    const sectorSymblDetails = sharedStates.stocksArr.find((currentSymbObj) => {
        return currentSymbObj.symbol === sharedStates.selectedSymbl;
    });


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
