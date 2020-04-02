import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavbarToggler
} from 'reactstrap';
import '../App.css';


function Header({sectors, selectedSector, setSelectedSector, setCurrentPage}) {

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    function handleSectorSelection(newSector){
        if(newSector !== selectedSector){
            console.log("Header - handleSectorSelection: New sector selection is = ",newSector);
            while(localStorage.getItem(selectedSector) !== null) {
                console.log("Header - handleSectorSelection: removing old sector data");
                localStorage.clear()
            }
            localStorage.setItem("selectedSector", newSector);
            setSelectedSector(newSector);
            setCurrentPage(0)
        } else{
            console.log("Header - handleSectorSelection: Selected sector is equal to previous selector. Do nothing ")
        }
    }

    function handleMobSectorSelection(newSector) {
        handleSectorSelection(newSector)
        setCollapsed(!collapsed);
    }

    const searchOptions = sectors.map((sector, i) => {
        return (
            <Link to="/research" key={i} onClick={()=>handleSectorSelection(sector.name)}>
            <DropdownItem >
                {sector.name}
            </DropdownItem>
            </Link>
        );
    });

    const mobSearchOptions = sectors.map((sector, i) => {
        return (
            <Link
                to="/research"
                className="nav-link"
                key={i}
                onClick={()=>handleMobSectorSelection(sector.name)}>
                {sector.name}
            </Link>
        );
    });

    function tabletNavContents() {
      return (
          <Nav className="mr-auto tabletNav" navbar>
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                      Research
                  </DropdownToggle>
                  <DropdownMenu right >
                      {searchOptions}
                  </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                  <Link className="nav-link" to="/favs">My Favorites</Link>
              </NavItem>

          </Nav>
      )
    }

    function mobileNavContents() {
        return(
            <>
                <NavbarToggler onClick={toggleNavbar} className="mr-2 mobileNav" />
                <Collapse isOpen={!collapsed} navbar >
                    <Nav navbar className="mobileNav">
                        <NavItem>
                            <Link className="nav-link" to="/favs">My Favorites</Link>
                        </NavItem>
                        <NavItem>
                            <h5>Sectors</h5>
                            {mobSearchOptions}
                        </NavItem>
                    </Nav>
                </Collapse>
            </>
        )
    }

    return (
        <div className="header">
            <Navbar color="light" light expand="md">
                <Link className="navbar-brand" to="/" >investmate</Link>
                {tabletNavContents()}
                {mobileNavContents()}
            </Navbar>
        </div>
    );
}

export default Header;
