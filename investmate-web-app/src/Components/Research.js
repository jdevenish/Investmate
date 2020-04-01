import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink,
        Card, CardBody,
        CardTitle, CardSubtitle, CardFooter, Spinner} from 'reactstrap';
import ResearchPagination from './ResearchPagination'
import { StocksContext } from '../App'
import apiCred from "../apiDetails";



function Research() {
    const cardLimit =  24;
    const sharedStates = useContext(StocksContext)
    // console.log("Research - Checking State Values: ", sharedStates)

    // Current page limits. Used in sharedStates.stocksArr
    const upperLimit = (cardLimit * (sharedStates.currentPage));
    const lowerLimit = sharedStates.currentPage > 0 ? (cardLimit * (sharedStates.currentPage-1)) : 0;

    // Update selected stock symbol when card is clicked
    function handleStockSelection(symbl) {
        localStorage.setItem("lastSelectedSymbol", symbl)
        sharedStates.setSelectedSymbl(symbl)
    }

    // Clean up local storage when new sector is chosen
    // Data set is very large (1.5MB - 4MB) and can't hold more than one sector
    function handleSectorSelection(newSector){
        if(newSector !== sharedStates.selectedSector) {
            console.log("Research - handleSectorSelection: New sector selection is = ",newSector);
            while(localStorage.getItem(sharedStates.selectedSector) !== null) {
                console.log("Research - handleSectorSelection: removing old sector data")
                localStorage.clear();
            }
            localStorage.setItem("selectedSector", newSector);
            sharedStates.setSelectedSector(newSector);
            sharedStates.setCurrentPage(0)
        } else {
            console.log("Research - handleSectorSelection: Selected sector is equal to previous selector. Do nothing ")
        }
    }


    /*============ NETWORK CALL - Fetch Stock Icons ============================

        ON sharedStates.currentPage Change: --> Includes initialization
            IF currentPage is not = to initialized value
                IF stocksArr of lowerLimit does not have property imgURL (stocksArr.hasOwnProperty(key))
                    MAKE API call
                        CREATE copy of stocksArr
                        FOR each stock between lower and upper limits
                            CREATE api URL
                            MAKE request
                            WAIT for response and save to value json
                            UPDATE copy of stocksArr with imgURL key and value
                        ENDFOR
                        UPDATE local storage with copy of stocksArr
                        UPDATE state setStocksArr
                    END API call
                ELSE
                    Do nothing. Already fetched images for this page
                ENDIF
            ELSE
                Do nothing. Still set to initialized value
            ENDIF

     =========================================================================*/
    useEffect( () => {
        if(sharedStates.currentPage > 0){
            console.log("RESEARCH - fetchIconData: current page has been updated = ", sharedStates.currentPage);
            if(!sharedStates.stocksArr[lowerLimit].hasOwnProperty("imgURL")){
                console.log("RESEARCH - fetchIconData: Need to fetch icons for this page");
                // Make API call for all stocks visible on the page
                const makeImgApiCall = async () => {
                    const copyStocksArr = [...sharedStates.stocksArr];

                    for(let i=lowerLimit; i<upperLimit; i++){
                        const fetchImgAPI = `${apiCred.url}/stock/${copyStocksArr[i].symbol}/logo?token=${apiCred.apiKey}`;
                        const res = await fetch(fetchImgAPI);
                        const json = await res.json();
                        copyStocksArr[i]["imgURL"] = json.url;
                        console.log("RESEARCH - fetchIconData: verify IMG URL = ", copyStocksArr[i].imgURL)
                    }
                    console.log("RESEARCH - fetchIconData: data fetch complete. Updating states and local storage")
                    // Update state INSIDE API call function
                    localStorage.setItem(sharedStates.selectedSector, JSON.stringify(copyStocksArr));
                    sharedStates.setStocksArr(copyStocksArr);
                };
                makeImgApiCall();
            } else{
                console.log("RESEARCH - fetchIconData: Do nothing. Have icons for this page = ", sharedStates.stocksArr[lowerLimit].imgURL);
            }
        } else{
            console.log("RESEARCH - fetchIconData: Do nothing. Current page equals initialized value = ", sharedStates.currentPage)
        }
    }, [sharedStates.currentPage]);



    // Identify currently selected category and add active class.
    const sectorList = sharedStates.sectors.map( (sector, index) => {
        if(sector.name === sharedStates.selectedSector) {
            return (
                <NavItem key={index} >
                    <NavLink active >
                        {sector.name}
                    </NavLink>
                </NavItem>
            )
        } else{
            return (
                <NavItem  key={index}>
                    <NavLink onClick={() => handleSectorSelection(sector.name)}>
                        {sector.name}
                    </NavLink>
                </NavItem>
            )
        }
    });



    // Build cards for each company displayed on the page
    const stockCards = sharedStates.stocksArr.map( (company, i) => {
        if(i >= lowerLimit && i < upperLimit){
            // Convert EPOCH date
            let lastUpdated = new Date(company.latestUpdate * 1000);
            lastUpdated.toJSON();

            return(
                <div className="research-cards-cardContainer" key={i}>
                    <Link
                        to={`/details/${company.symbol}`}
                        onClick={() => handleStockSelection(company.symbol)}>
                        <Card>
                            <div className="research-cards-iconContainer" >
                                {company.hasOwnProperty("imgURL") ? <img className="research-cards-iconContainer__icon" src={company.imgURL} alt={company.symbol}/> : <Spinner color="secondary"/>}
                            </div>
                            <CardBody>
                                <CardTitle>{company.companyName}</CardTitle>
                                <CardSubtitle>({company.symbol})</CardSubtitle>
                                {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                                <CardFooter className="text-muted">Last Updated: {String(lastUpdated)} </CardFooter>
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            );
        }
    });


    return (
        <div>
            <div className="research">
                <div className="research-sectors">
                    <p>Sector Filters</p>
                    <Nav vertical pills>
                        {sectorList}
                    </Nav>
                </div>
                <div className="research-cards">
                    {stockCards}
                </div>
            </div>
            <ResearchPagination
                maxStocks={sharedStates.stocksArr.length}
                setCurrentPage={sharedStates.setCurrentPage}/>
        </div>
    );

}

export default Research;
