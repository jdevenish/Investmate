import React, {useState, useContext, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
        CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';

function CompanyOverview({sharedStates, currentSymbolDetails}) {
    console.log("Company Overview: ", currentSymbolDetails)
    const overviewObj = sharedStates.showDetailsFor.overview;
    const detailsObj = sharedStates.showDetailsFor.balancesheet;

    return (
        <div className="details-overviewContainer">
            <div> {/* left hand side*/}
                <div className="details-overviewContainer__header">
                    <p>Ticker: {overviewObj.symbol}</p>
                    <h1>{overviewObj.companyName}</h1>
                    <h1>${currentSymbolDetails.latestPrice} <span>({(currentSymbolDetails.changePercent*100).toFixed(2)}%) </span></h1>
                </div>
                <div>
                    <h2>Add graph</h2>
                </div>
            </div>
            <div> {/* right hand card*/}
                <div> {/* Card */}
                    <Card>
                        <div className="research-cards-iconContainer">
                            <img src={currentSymbolDetails.imgURL} alt={currentSymbolDetails.symbol} />
                        </div>
                        <CardBody>
                            <CardTitle>{currentSymbolDetails.companyName}</CardTitle>
                            <CardText>{overviewObj.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div> {/* Button */}
                    <Button color="primary" size="lg" block>Track {overviewObj.symbol}</Button>
                </div>
            </div>
        </div>
    );
}

export default CompanyOverview;
