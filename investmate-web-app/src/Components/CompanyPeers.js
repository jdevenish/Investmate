import React, {useState, useContext, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter,Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import {Link} from "react-router-dom";
// import CarouselItem from "reactstrap/es/CarouselItem";

function CompanyPeers({sharedStates, currentSymbolDetails}) {
    // console.log("Company Overview: ", currentSymbolDetails)
    const overviewObj = sharedStates.showDetailsFor.overview;
    const detailsObj = sharedStates.showDetailsFor.balancesheet;
    const peerGroup = sharedStates.showDetailsFor.peerGroups;

    // console.log("CompanyPeers - peersArr: ", sharedStates.showDetailsFor.peerGroups);

    // Will only find peers for the sector we already have downloaded.
    // To reduce API limits, will not fetch unknown peers at this point
    const knownPeers = sharedStates.stocksArr.filter((stock) => {
        for(let i=0; i<peerGroup.length; i++){
            if(stock.symbol === peerGroup[i]){
                return stock
            }
        }
    });


    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === knownPeers.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? knownPeers.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    console.log(knownPeers)

    const peerCards = knownPeers.map((peerData, index) => {
        return(
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
            >
                <div className="research-cards-cardContainer">
                    <Link
                        to={`/details/${peerData.symbol}`}
                        >
                        <Card>
                            <div className="research-cards-iconContainer">
                                <img src={peerData.imgURL} alt={peerData.symbol} />
                            </div>
                            <CardBody>
                                <CardTitle>{peerData.companyName}</CardTitle>
                                <CardSubtitle>{peerData.symbol}</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                            </CardBody>
                        </Card>
                    </Link>
                </div>

            </CarouselItem>
        )
    });

    return (
        <div className="carousel-container">
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                className="carousel"
            >
                <CarouselIndicators items={knownPeers} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {peerCards}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>

    );
}

export default CompanyPeers;
