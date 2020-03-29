import React, {useState, useContext, useEffect} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

function CompanyDetails({sharedStates, currentSymbolDetails}) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="details-detailsContainer" >
            <div className="details-detailsContainer__table">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Performance Breakdown
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Company Info
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h3>Historical performances</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>Last 12 months</p>
                            </Col>
                            <p>{(currentSymbolDetails.ytdChange*100).toFixed(2)}%</p>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>Since inception</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>Dividend Yield</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>Expense Ratio</p>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                <h5>Disclosure</h5>
                <p>The historical data for individual securities quoted on this website represents past
                performance reported as an average annual return for a given time horizon. Historical performance
                over the last 5 years, for example, is simply what the average return per year (compound annual
                growth rate) was for the investment over the past 5 years.</p>
            </div>
        </div>
    );
}

export default CompanyDetails;
