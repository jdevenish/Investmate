import React, {useState, useContext, useEffect} from 'react';
import { StocksContext } from '../App'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';
import ResearchPagination from './ResearchPagination'
import apiCred from "../apiDetails";

function Research() {
    const [currentPage, setCurrentPage] = useState(1)
    const [haveImg, setHaveImg] = useState([]);
    const cardLimit =  24;
    const sharedStates = useContext(StocksContext)
    // console.log("Research - context check: ",sharedStates)

    // Sort stocks from highest to lowest Total Volume
    let sortedStocksArr = sharedStates.stocksArr.sort((a,b) => {
        return b.avgTotalVolume-a.avgTotalVolume
    });

    // console.log("Research - sortedStocksArr: ",sortedStocksArr)

    // Identify currently selected category and add active class.
    // myColors overrides default active behavior
    const sectorList = sharedStates.sectors.map( (sector, index) => {
        if(sector.name === sharedStates.selectedSector) {
            return (
                <NavItem key={index}  >
                    <NavLink active className="myColors">
                        {sector.name}
                    </NavLink>
                </NavItem>
            )
        } else{
            return (
                <NavItem  key={index}>
                    <NavLink onClick={() => sharedStates.setSelectedSector(sector.name)}>
                        {sector.name}
                    </NavLink>
                </NavItem>
            )
        }
    });

    // Fetch icons on page load and/or when category changes
    useEffect( () => {
        // fetch Icon URL and add to Object
        // Only fetch if we haven't previously.
        // Need to reduce # of calls. Getting a lot of 429s
        if(!haveImg[currentPage]){
            sortedStocksArr.forEach( (company, index) => {
                const upperLimit = (cardLimit * (currentPage));
                const lowerLimit = (cardLimit * (currentPage-1));
                // console.log(`Research - Limit check: lowerLimit = ${lowerLimit}  ,  upperLimit = ${upperLimit}`)
                if(index >= lowerLimit && index < upperLimit) {
                    const fetchImgAPI = `${apiCred.url}/stock/${company.symbol}/logo?token=${apiCred.apiKey}`;
                    const makeImgApiCall = async () => {
                        const res = await fetch(fetchImgAPI);
                        const json = await res.json();
                        company["imgURL"] = json.url;
                    };
                    // makeImgApiCall()
                    // console.log("Research - verify IMG URL: ", company.imgURL)
                }
            });
            let newHaveImg = [...haveImg];
            newHaveImg[currentPage] = true;
            setHaveImg(newHaveImg)
        }
    }, [currentPage]);

    function handleStockSelection(symbl) {
        sharedStates.setSelectedSymbl(symbl)
    }

    //
    const stockCards = sortedStocksArr.map( (company, i) => {
        const upperLimit = (cardLimit * (currentPage));
        const lowerLimit = (cardLimit * (currentPage-1));

        if(i >= lowerLimit && i < upperLimit){
            // Convert EPOCH date
            let lastUpdated = new Date(company.latestUpdate * 1000);
            lastUpdated.toJSON();
            // console.log("Research - last updated conversion check: ", lastUpdated)

            return(
                <div className="research-cards-cardContainer" key={i}>
                    <Link
                        to={`/details/${company.symbol}`}
                        onClick={() => handleStockSelection(company.symbol)}>
                        <Card>
                            <div className="research-cards-iconContainer">
                                <img src={company.imgURL} alt={company.symbol} />
                            </div>
                            <CardBody>
                                <CardTitle>{company.companyName}</CardTitle>
                                <CardSubtitle>{company.symbol}</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
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
            <div className="research" >
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
                maxStocks={sortedStocksArr.length}
                setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default Research;
