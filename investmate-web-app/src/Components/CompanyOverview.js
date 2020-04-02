import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, Button, Spinner
} from 'reactstrap';
import CanvasJSReact from '../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CompanyOverview({sharedStates, currentSymbolDetails}) {
    console.log("Company Overview - current Symbol details ", currentSymbolDetails)
    const overviewObj = sharedStates.showDetailsFor.overview;
    console.log("Company Overview - overviewObj check: ", overviewObj);

    function updateFavs(imgURL) {
        const copyFavs = [...sharedStates.favs];
        sharedStates.showDetailsFor.imgURL = imgURL;
        copyFavs.push(sharedStates.showDetailsFor);
        localStorage.setItem("favs", JSON.stringify(copyFavs));
        sharedStates.setFavs(copyFavs);
    }

    const options = {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        exportEnabled: true,
        title:{
            text: `Stock Price -  last 6 months`
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            includeZero:false,
            prefix: "$",
            title: "Price (in USD)"
        },
        data: [{
            type: "candlestick",
            showInLegend: true,
            name: `${overviewObj.companyName}`,
            yValueFormatString: "$###0.00",
            xValueFormatString: "MMMM YY",
            dataPoints: sharedStates.showDetailsFor.historicalData
        }
        ]
    };

    return (
        <div className="details-overviewContainer">
            <div>
                <div className="details-overviewContainer__header">
                    <p>Ticker: {overviewObj.symbol}</p>
                    <h1>{overviewObj.companyName}</h1>
                    <h1>${sharedStates.showDetailsFor.latestPrice} </h1>
                </div>
                <div className="chartContainer">
                    <CanvasJSChart options={options}/>
                </div>
            </div>
            <div>
                <div>
                    <Card>
                        <div className="research-cards-iconContainer">
                            {sharedStates.showDetailsFor.hasOwnProperty("imgURL") ? <img className="research-cards-iconContainer__icon" src={sharedStates.showDetailsFor.imgURL} alt={overviewObj.symbol}/> : <Spinner color="secondary"/>}
                        </div>
                        <CardBody>
                            <CardTitle>Track {overviewObj.companyName} on investmate!</CardTitle>
                            <CardText>{overviewObj.companyName} ({overviewObj.symbol})</CardText>
                            <CardText><a href={overviewObj.website}>{overviewObj.website}</a></CardText>
                            <CardText>Exchange: {overviewObj.exchange}</CardText>
                            <div className="research-cards-cardContainer__spacer"/>
                            <Button
                                color="primary"
                                size="lg"
                                onClick={() => updateFavs(sharedStates.showDetailsFor.imgURL)}
                                block>Track {overviewObj.symbol}</Button>
                        </CardBody>
                    </Card>
                </div>
                <div>
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
