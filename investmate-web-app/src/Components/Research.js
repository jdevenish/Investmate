import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink,
        Card, CardText, CardBody,
        CardTitle, CardSubtitle, CardFooter, Spinner} from 'reactstrap';
import ResearchPagination from './ResearchPagination'
import apiCred from "../apiDetails";
import { StocksContext } from '../App'



function Research() {
    const [currentPage, setCurrentPage] = useState(0)
    const [haveImg, setHaveImg] = useState([]);
    const cardLimit =  24;
    const sharedStates = useContext(StocksContext)
    // console.log("Research - context check: ",sharedStates)

    const upperLimit = (cardLimit * (sharedStates.currentPage));
    const lowerLimit = sharedStates.currentPage > 0 ? (cardLimit * (sharedStates.currentPage-1)) : 0;

    if(sharedStates.selectedSector === "" && localStorage.getItem("selectedSector") !== null){
        sharedStates.setSelectedSector(localStorage.getItem("selectedSector"))
    }

    let testState = localStorage.getItem("selectedSector")
    let stocksArrLocalStorage = JSON.parse(localStorage.getItem(testState));

    // console.log("Research: key used for local storage: ", sharedStates.selectedSector)
    // console.log("Research: value from local storage: ", stocksArrLocalStorage)

    // Clean up local storage. Data set is very large ~ 3.5MB
    function handleSectorSelection(newSector){
        if(newSector !== sharedStates.selectedSector) {
            while(localStorage.getItem(sharedStates.selectedSector) !== null) {
                console.log("removing key...")
                localStorage.clear();
            }
            localStorage.setItem("selectedSector", newSector)
            sharedStates.setSelectedSector(newSector);
            setHaveImg([])
            sharedStates.setCurrentPage(0)
        }
    }



    // sharedStates.setStocksArr(stocksArrLocalStorage)

    console.log("Research :: stocks from storage: ", stocksArrLocalStorage)
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
                    <NavLink onClick={() => handleSectorSelection(sector.name)}>
                        {sector.name}
                    </NavLink>
                </NavItem>
            )
        }
    });

    // Fetch icons on page load and/or when category changes.
    // Add icon url to stocksArr for future use
    useEffect( () => {
        // console.log("Fetch Icon Logic Check: if(stocksArrLocalStorage) = ", stocksArrLocalStorage, "   ")
        // console.log("LowerLimit: ", lowerLimit)
        // Only fetch images if we have retrieved the sector data first
        console.log("fetch-icons: entered useEffect")
        if(sharedStates.stocksArr.length > 0 || stocksArrLocalStorage) {
            console.log("fetch-icons: local storage exists")
            // Only fetch if we haven't previously.
            const copyStocksArr = [...sharedStates.stocksArr];
            if(!haveImg[sharedStates.currentPage] && !copyStocksArr[lowerLimit].imgURL){
                console.log("fetch-icons: haven't fetched for this page and imgURL doesn't exist")
                // Make API call for all stocks visible on the page
                const makeImgApiCall = async () => {
                    for(let i=lowerLimit; i<upperLimit; i++){
                        const fetchImgAPI = `${apiCred.url}/stock/${copyStocksArr[i].symbol}/logo?token=${apiCred.apiKey}`;
                        const res = await fetch(fetchImgAPI);
                        const json = await res.json();
                        copyStocksArr[i]["imgURL"] = json.url;
                        console.log("RESEARCH: verify IMG URL: ", copyStocksArr[i].imgURL)
                    }
                    // Update state INSIDE API call function
                    sharedStates.setStocksArr(copyStocksArr);
                    localStorage.setItem(sharedStates.selectedSector, JSON.stringify(copyStocksArr));
                };
                makeImgApiCall();
            }
            // Update States:
            let newHaveImg = [...haveImg];
            newHaveImg[sharedStates.currentPage] = true;
            setHaveImg(newHaveImg)
        }

    }, [sharedStates.currentPage]);


    function handleStockSelection(symbl) {
        sharedStates.setSelectedSymbl(symbl)
    }

    //

    const stockCards = sharedStates.stocksArr.map( (company, i) => {
        if(i >= lowerLimit && i < upperLimit){
            // Convert EPOCH date
            let lastUpdated = new Date(company.latestUpdate * 1000);
            lastUpdated.toJSON();
            // console.log("Research - last updated conversion check: ", lastUpdated)

            let iconContent = {
                backgroundImage: `url(${company.imgURL})`
            };

            // If company.imgURL === undefined we know the image is in local storage
            if(!company.imgURL && stocksArrLocalStorage){
                iconContent = {
                    backgroundImage: `url(${stocksArrLocalStorage[i].imgURL})`
                }
            }

            return(
                <div className="research-cards-cardContainer" key={i}>
                    <Link
                        to={`/details/${company.symbol}`}
                        onClick={() => handleStockSelection(company.symbol)}>
                        <Card>
                            <div style={iconContent} className="research-cards-iconContainer">
                                {/*<img src={company.imgURL} alt={company.symbol} />*/}
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
