import React, {useContext, useState} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { StocksContext } from '../App'
import '../App.css'

function Home() {
    const [symbl, setSymbl] = useState("");
    const sharedStates = useContext(StocksContext);

    const handleUserSubmit = e => {
        sharedStates.setSelectedSymbl(symbl);
    };

    const handleChange = e => { setSymbl(e.target.value) };

    return (
        <div className="welcomeBackground">
            <div className="callToAction">
                <div className="callToAction-slogan">
                    <h1>Trust your mates at investmate</h1>
                    <h3>Let us help make investing easier</h3>
                    <h5>To get started, enter a stock symbol below or click on research to browse by category</h5>
                </div>
                <div className="search-container">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Symbol</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="MSFT"
                            onChange={handleChange}/>
                        <Link to={`/details/${symbl}`} ><Button
                            color="warning"
                            className="search-button"
                            onClick={handleUserSubmit}>Get started</Button></Link>
                    </InputGroup>
                </div>
            </div>
            <div className="homepageAsset">
                <img src="https://res.cloudinary.com/doaftkgbv/image/upload/v1585590170/investmate-home-backgroundImage-v3_xcldcz.png" alt="backgroundImg" />
            </div>
        </div>
    );
}

export default Home;
