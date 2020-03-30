import React, {useState, useContext, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
        CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';

function CompanyOverview({sharedStates, currentSymbolDetails}) {
    console.log("Company Overview - current Symbol details ", currentSymbolDetails)
    const overviewObj = sharedStates.showDetailsFor.overview;

    const keyStats = sharedStates.showDetailsFor.keyStats;
    console.log("Company Overview - Key Stats: ", keyStats)

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
                            <CardTitle>Track {currentSymbolDetails.companyName} on investmate!</CardTitle>
                            <CardText>{currentSymbolDetails.companyName} ({currentSymbolDetails.symbol})</CardText>
                            <CardText><a href={overviewObj.website}>{overviewObj.website}</a></CardText>
                            <CardText>Exchange: {overviewObj.exchange}</CardText>
                            <div className="research-cards-cardContainer__spacer"/>
                            <Button color="primary" size="lg" block>Track {overviewObj.symbol}</Button>
                        </CardBody>
                    </Card>
                </div>
                <div> {/* Button */}
                    <p className="disclaimer">Disclaimer: Any investment you’ve selected
                        here, which may be available
                        on the investmate platform, is intended to be used for
                        informational purposes only, should not be relied
                        upon as the sole basis for making any investment
                        decision, and is not intended to be a recommendation
                        or advice by investmate that is based on your investment
                        time horizon and/or risk tolerance.</p>
                </div>
            </div>
        </div>
    );
}

export default CompanyOverview;
