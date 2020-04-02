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
    //https://canvasjs.com/
    const options = {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        exportEnabled: true,
        title:{
            text: `${overviewObj.companyName} Stock Price -  2017`
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
            dataPoints: [
                { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
                { x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.20] },
                { x: new Date("2017-03-01"), y: [35.85, 36.30, 34.66, 36.07] },
                { x: new Date("2017-04-01"), y: [36.19, 37.50, 35.21, 36.15] },
                { x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
                { x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
                { x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
                { x: new Date("2017-08-01"), y: [35.66, 36.70, 34.38, 35.07] },
                { x: new Date("2017-09-01"), y: [35.24, 38.15, 34.93, 38.08] },
                { x: new Date("2017-10-01"), y: [38.12, 45.80, 38.08, 45.49] },
                { x: new Date("2017-11-01"), y: [45.97, 47.30, 43.77, 44.84] },
                { x: new Date("2017-12-01"), y: [44.73, 47.64, 42.67, 46.16] }
            ]
        }
        ]
    }


    return (
        <div className="details-overviewContainer">
            <div> {/* left hand side*/}
                <div className="details-overviewContainer__header">
                    <p>Ticker: {overviewObj.symbol}</p>
                    <h1>{overviewObj.companyName}</h1>
                    <h1>${sharedStates.showDetailsFor.latestPrice} </h1>
                </div>
                <div className="chartContainer">
                    <CanvasJSChart options={options}/>
                </div>
            </div>
            <div> {/* right hand card*/}
                <div> {/* Card */}
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
