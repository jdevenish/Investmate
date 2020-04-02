import React, {useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

function CompanyDetails({sharedStates}) {
    const keyStats = sharedStates.showDetailsFor.keyStats;
    const overView = sharedStates.showDetailsFor.overview;
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

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
                            <p>{keyStats.ytdChangePercent}%</p>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>5 Years</p>
                            </Col>
                            <p>{(keyStats.year5ChangePercent) ? keyStats.year5ChangePercent.toFixed(2) : (keyStats.year5ChangePercent)}%</p>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>Dividend Yield</p>
                            </Col>
                            <p>{keyStats.dividendYield ? keyStats.dividendYield.toFixed(4) : keyStats.dividendYield}%</p>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <p>Expense Ratio</p>
                            </Col>
                            <p>{keyStats.peRatio}%</p>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className="details-detailsContainer__table-companyInfo">
                            <Col sm="6">
                                <p>{overView.description}</p>
                            </Col>
                            <Col sm="12">
                                <Col className="companyDetails" sm="8" >
                                    <h5>CEO:</h5>
                                    <p>{overView.CEO}</p>
                                </Col>

                                <Col className="companyDetails" sm="8" >
                                    <h5>Industry:</h5>
                                    <p>{overView.industry}</p>
                                </Col>

                                <Col className="companyDetails" sm="8" >
                                    <h5>Employees:</h5>
                                    <p>{overView.employees}</p>
                                </Col>

                                <Col className="companyDetails" sm="8" >
                                    <h5>Address:</h5>
                                    <div style={{textAlign: "right"}}>
                                        <p style={{margin: "0"}}>{overView.address}</p>
                                        <p style={{margin: "0"}}>{overView.city}, {overView.state}</p>
                                        <p style={{margin: "0"}}>{overView.zip}</p>
                                    </div>
                                </Col>

                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

            </div>
            <div className="details-disclosure">
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
