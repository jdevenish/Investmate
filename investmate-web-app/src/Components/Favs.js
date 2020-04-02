import React, {useContext} from 'react';
import { StocksContext } from '../App'
import { Link } from 'react-router-dom';
import {Card, CardBody, CardText, CardTitle, Spinner, Button} from "reactstrap";

function Favs() {
    const sharedStates = useContext(StocksContext);

    console.log("Favs = ",sharedStates.favs);

    function removeFavs(index){
        const copyFavs = [...sharedStates.favs];
        copyFavs.splice(index,1);
        localStorage.setItem("favs", JSON.stringify(copyFavs));
        sharedStates.setFavs(copyFavs)
    }

    function handleStockSelection(symbl) {
        localStorage.setItem("lastSelectedSymbol", symbl);
        sharedStates.setSelectedSymbl(symbl)
    }

    let headingStatement = "Companies you're currently tracking";
    if(sharedStates.favs.length < 1) headingStatement = "Looks like you haven't added a company to track yet..."

    const favCards = sharedStates.favs.map( (fav, index) => {
        return(
            <div className="research-cards-cardContainer" key={index}>
                <Link
                    to={`/details/${fav.overview.symbol}`}
                    onClick={() => handleStockSelection(fav.overview.symbol)} >
                    <Card>
                        <div className="research-cards-iconContainer" >
                            {fav.hasOwnProperty("imgURL") ? <img className="research-cards-iconContainer__icon" src={fav.imgURL} alt={fav.overview.symbol}/> : <Spinner color="secondary"/>}
                        </div>
                        <CardBody>
                            <CardTitle>{fav.overview.companyName}</CardTitle>
                            <CardText>({fav.overview.symbol})</CardText>
                            <CardText>50 Day Moving Average: {fav.keyStats.day50MovingAverage}</CardText>
                            <CardText>Exchange: {fav.overview.exchange}</CardText>
                            <Button
                                color="primary"
                                size="lg"
                                onClick={() => removeFavs(index)}
                                block>Stop tracking {fav.overview.symbol}</Button>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        )
    });

    return (
        <div className="favsContainer">
            <h1>{headingStatement}</h1>
            <div className="research-cards favs-card-container">
                {favCards}
            </div>
        </div>
    );
}

export default Favs;
