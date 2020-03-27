import React, {useContext, useState} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { StocksContext } from '../App'
import '../App.css'

function Home(props) {
    const [symbl, setSymbl] = useState("")
    const sharedStates = useContext(StocksContext)

    const handleUserSubmit = e => {
        sharedStates.setSelectedSymbl(symbl)
        // console.log("Home - sharedStates: ",sharedStates)
    }

    const handleChange = e => { setSymbl(e.target.value) }

    return (
        <div className="search-container">
            <h1>Home Component</h1>
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
    );
}

export default Home;
