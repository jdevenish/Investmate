import React, {useState, useContext, useEffect} from 'react';
import { StocksContext } from '../App'
import { Nav, NavItem, NavLink } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';
import ResearchPagination from './ResearchPagination'

function Research(props) {
    const [currentPage, setCurrentPage] = useState(1)
    const cardLimit =  24;
    const sharedStates = useContext(StocksContext)
    console.log("Research - context check: ",sharedStates)

    // Sort stocks from highest to lowest Total Volume
    let sortedStocksArr = sharedStates.stocksArr.sort((a,b) => {
        return b.avgTotalVolume-a.avgTotalVolume
    });

    console.log("Research - sortedStocksArr: ",sortedStocksArr)

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
        const productionURL = "https://cloud.iexapis.com/stable/";
        const productionAPIKey = "pk_cd56e3f5acb247ea8f5b446212057641";
        sortedStocksArr.forEach( (company, index) => {
            if(index < 30) {
                const fetchImgAPI = `${productionURL}/stock/${company.symbol}/logo?token=${productionAPIKey}`;
                const makeImgApiCall = async () => {
                    const res = await fetch(fetchImgAPI);
                    const json = await res.json();
                    company["imgURL"] = json.url;
                }
                // makeImgApiCall()
                console.log("Research - verify IMG URL: ", company.imgURL)
            }
        })

    }, [sharedStates.selectedSector])

    //
    const stockCards = sortedStocksArr.map( (company, i) => {
        // console.log("Research - lower limit: ", i >= (cardLimit * (currentPage-1)))
        // console.log("Research - upper limit: ", i < (cardLimit * (currentPage)))
        if(i >= (cardLimit * (currentPage-1)) && i < (cardLimit * (currentPage))){
            // Convert EPOCH date
            let lastUpdated = new Date(company.latestUpdate * 1000);
            lastUpdated.toJSON();
            console.log("Research - last updated conversion check: ", lastUpdated)

            return(
                <div className="research-cards-cardContainer" key={i}>
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
            <ResearchPagination maxStocks={sortedStocksArr.length} setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default Research;
