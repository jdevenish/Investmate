import React, {useContext, useState} from 'react';
import { StocksContext } from '../App'
import { Nav, NavItem, NavLink } from 'reactstrap';

function Research(props) {
    const sharedStates = useContext(StocksContext)
    console.log("Research - context check: ",sharedStates)

    const sectorList = sharedStates.sectors.map( (sector, index) => {
        if(sector.name === sharedStates.selectedSector) {
            return (
                <NavItem key={index}  >
                    <NavLink active className="myColors">
                        {sector.name}
                        {/*<div className="myColors">*/}
                        {/*    {sector.name}*/}
                        {/*</div>*/}
                    </NavLink>
                </NavItem>
            )
        } else{
            return (
                <NavItem  key={index}>
                    <NavLink
                        onClick={()=>sharedStates.setSelectedSector(sector.name)}
                    >
                        {sector.name}
                    </NavLink>
                </NavItem>
            )
        }
    });

    const stockCards = sharedStates.stocksArr.map( (company, i) => {

    });


    return (
        <div className="research" >
            <div className="research-sectors">
                <p>Sector Filters</p>
                <Nav vertical pills>
                    {sectorList}
                </Nav>
            </div>
            <div className="research-cards">

            </div>
        </div>
    );
}

export default Research;
