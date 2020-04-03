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

    const upperLimit = (cardLimit * (sharedStates.currentPage));
    const lowerLimit = sharedStates.currentPage > 0 ? (cardLimit * (sharedStates.currentPage-1)) : 0;

    function handleStockSelection(symbl) {
        localStorage.setItem("lastSelectedSymbol", symbl)
        sharedStates.setSelectedSymbl(symbl)
    }

    function handleSectorSelection(newSector){
        if(newSector !== sharedStates.selectedSector) {
            while(localStorage.getItem(sharedStates.selectedSector) !== null) {
                localStorage.clear();
            }
            localStorage.setItem("selectedSector", newSector);
            sharedStates.setSelectedSector(newSector);
            sharedStates.setCurrentPage(0)
        } else {
        }
    }

    useEffect( () => {
        if(sharedStates.currentPage > 0){
            if(!sharedStates.stocksArr[lowerLimit].hasOwnProperty("imgURL")){
                const makeImgApiCall = async () => {
                    const copyStocksArr = [...sharedStates.stocksArr];

                    for(let i=lowerLimit; i<upperLimit; i++){
                        const fetchImgAPI = `${apiCred.url}/stock/${copyStocksArr[i].symbol}/logo?token=${apiCred.apiKey}`;
                        const res = await fetch(fetchImgAPI);
                        const json = await res.json();
                        copyStocksArr[i]["imgURL"] = json.url;
                    }
                    localStorage.setItem(sharedStates.selectedSector, JSON.stringify(copyStocksArr));
                    sharedStates.setStocksArr(copyStocksArr);
                };
                makeImgApiCall();
            } else{
            }
        } else{
        }
    }, [sharedStates.currentPage]);

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

    const stockCards = sharedStates.stocksArr.map( (company, i) => {
        if(i >= lowerLimit && i < upperLimit){
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
