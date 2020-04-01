import React, { useContext } from 'react';
import { StocksContext } from '../App'
import CompanyOverview from "./CompanyOverview";
import CompanyDetails from "./CompanyDetails";
import CompanyPeers from "./CompanyPeers";

function Details() {
    const sharedStates = useContext(StocksContext)
    // console.log(sharedStates.selectedSector);
    console.log("Details - detailComponent: Checking if this is running", sharedStates.selectedSymbl)

    // Find the company object matching the user selected card/symbol
    const sectorSymblDetails = sharedStates.stocksArr.find((currentSymbObj) => {
        return currentSymbObj.symbol === sharedStates.selectedSymbl;
    });

    return (
        <div className="details-container">
            <CompanyOverview sharedStates={sharedStates} currentSymbolDetails={sectorSymblDetails}/>
            <CompanyDetails sharedStates={sharedStates} currentSymbolDetails={sectorSymblDetails}/>
            <CompanyPeers sharedStates={sharedStates}  />
        </div>
    );
}

export default Details;
