import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavbarToggler
} from 'reactstrap';
import '../App.css';


function Header({sectors, setSelectedSector}) {
    /*
        TODO: Need to pass the selected sector to research
     */

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    // console.log("Header - sectors: ",sectors)
    const searchOptions = sectors.map((sector, i) => {
        return (
            <Link to="/research" key={i} onClick={()=>setSelectedSector(sector.name)}>
            <DropdownItem >
                {sector.name}
            </DropdownItem>
            </Link>
        );
    });

    // Build Desktop and Table Navigation Menu
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
                  <NavLink href="/favs/">My Favorites</NavLink>
              </NavItem>
          </Nav>
      )
    }

    // Build Mobile Navigation Menu
    function mobileNavContents() {
        return(
            <>
                <NavbarToggler onClick={toggleNavbar} className="mr-2 mobileNav" />
                <Collapse isOpen={!collapsed} navbar >
                    <Nav navbar className="mobileNav">
                        <NavItem>
                            <NavLink to="/favs">My Favorites</NavLink>
                        </NavItem>
                        <NavItem>
                            <h5>Sectors</h5>
                            {searchOptions}
                        </NavItem>
                    </Nav>
                </Collapse>
            </>
        )
    }

    return (
        <div className="header">
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/" >investmate</NavbarBrand>
                {tabletNavContents()}
                {mobileNavContents()}
            </Navbar>
        </div>
    );
}

export default Header;
