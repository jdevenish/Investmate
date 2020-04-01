import React, {useContext, useState} from 'react';
import { StocksContext } from '../App'
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";

function Favs() {
    const sharedStates = useContext(StocksContext)


    console.log("Favs = ",sharedStates.favs)

    const favsArray = JSON.parse(localStorage.getItem("favs"));

    const favCards = favsArray.map( (fav, index) => {
        const iconContent = {
            backgroundImage: `url(${fav.overview.imgURL})`
        };

        return(
            <Card>
                <div style={iconContent} className="research-cards-iconContainer">

                </div>
                <CardBody>
                    <CardTitle>{fav.overview.companyName}</CardTitle>
                    <CardText>({fav.overview.symbol})</CardText>
                    <CardText><a href={fav.overview.website}>{fav.overview.website}</a></CardText>
                    <CardText>Exchange: {fav.overview.exchange}</CardText>
                    <div className="research-cards-cardContainer__spacer"/>
                    <Button
                        color="primary"
                        size="lg"
                        // onClick={() => updateFavs(overviewObj.symbol)}
                        block>Stop tracking {fav.overview.symbol}</Button>
                </CardBody>
            </Card>
        )
    })

    console.log(favsArray)
    return (
        <div>
            <h1>Favs Component</h1>
            <div className="research-cards">
                {favCards}
            </div>
        </div>
    );
}

export default Favs;
