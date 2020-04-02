import React, {useContext, useEffect} from 'react';
import { StocksContext } from '../App'
import apiCred from "../apiDetails";
import CompanyOverview from "./CompanyOverview";
import CompanyDetails from "./CompanyDetails";
import CompanyPeers from "./CompanyPeers";

function Details() {
    const sharedStates = useContext(StocksContext)
    console.log(sharedStates);
    console.log("Details - detailComponent: Checking if this is running", sharedStates.selectedSymbl)


    // Find the company object matching the user selected card/symbol
    let sectorSymblDetails = sharedStates.stocksArr.find((currentSymbObj) => {
        return currentSymbObj.symbol === sharedStates.selectedSymbl;
    });


    return (
        <div className="details-container">
            <CompanyOverview sharedStates={sharedStates} currentSymbolDetails={sectorSymblDetails}/>
            <CompanyDetails sharedStates={sharedStates} />
            <CompanyPeers sharedStates={sharedStates}  />
        </div>
    );
}

export default Details;
