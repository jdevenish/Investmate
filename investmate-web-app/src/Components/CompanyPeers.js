import React, {useState, useEffect} from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
     Spinner
} from 'reactstrap';
import {Link} from "react-router-dom";
import apiCred from "../apiDetails";


function CompanyPeers({sharedStates}) {

    const peerGroup = sharedStates.showDetailsFor.peerGroups;
    const [peerObjs, setPeerObjs] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const knownPeers = sharedStates.stocksArr.filter((stock) => {
        for(let i=0; i<peerGroup.length; i++){
            if(stock.symbol === peerGroup[i]){
                return stock
            }
        }
    });


    useEffect( () => {
        const makeImgApiCall = async () => {
            for(let i=0; i<knownPeers.length; i++){
               if(!knownPeers[i].imgURL){
                   const fetchImgAPI = `${apiCred.url}/stock/${knownPeers[i].symbol}/logo?token=${apiCred.apiKey}`;
                   const res = await fetch(fetchImgAPI);
                   const json = await res.json();
                   knownPeers[i]["imgURL"] = json.url;
               }
            }
            setPeerObjs(knownPeers)
        };
        makeImgApiCall()
    }, []);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === knownPeers.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? knownPeers.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const peerCards = peerObjs.map((peerData, index) => {

        return(
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
            >
                <div className="research-cards-cardContainer">
                    <Link
                        to={`/details/${peerData.symbol}`}
                        onClick={() => sharedStates.setSelectedSymbl(peerData.symbol)}
                        >
                        <Card>
                            <div className="research-cards-iconContainer" >
                                {peerData.hasOwnProperty("imgURL") ? <img className="research-cards-iconContainer__icon" src={peerData.imgURL} alt={peerData.symbol}/> : <Spinner color="secondary"/>}
                            </div>
                            <CardBody>
                                <CardTitle>{peerData.companyName}</CardTitle>
                                <CardSubtitle>{peerData.symbol}</CardSubtitle>
                                <CardText>Click the card to learn more about {peerData.companyName}</CardText>

                            </CardBody>
                        </Card>
                    </Link>
                </div>

            </CarouselItem>
        )
    });

    return (
        <div className="carousel-container">
            <h4 style={{marginBottom: "45px", textAlign:"center"}}>Based on your selection, you may be interested in these similar companies...</h4>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                className="carousel"
            >
                <CarouselIndicators items={peerObjs} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {peerCards}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>

    );
}

export default CompanyPeers;
