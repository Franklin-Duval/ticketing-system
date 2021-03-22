import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { BsFileEarmarkCheck, } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import '../../assets/css/header.css'

export default class Header extends Component {
    render() {
        return (
            <div className="head">
                <div className="container-fluid">
                    <div className="row" style={{ padding: 20}}>
                        <p style={{fontFamily: 'Tauri', fontSize: 25, color: 'black'}}>DASHBOARD</p>
                        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                            <Link to="/user/creer-ticket" className="btn-new-ticket">Créer un nouveau tickets</Link>
                        </div>
                        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end',}}>
                            <FaUserCircle color="white" size={40} />
                            <p style={{fontFamily: 'Tauri', fontSize: 16, color: 'white', marginLeft: 10, textAlign: 'center'}}>User Talom</p>
                        </div>
                        
                    </div>
                </div>
                
                <div className="header pb-8 pt-5 pt-md-8">
                    <Container fluid>
                        <div className="header-body">
                        {/* Card stats */}
                            <Row>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Nouveaux Tickets
                                                </CardTitle>
                                                <span className="h3 font-weight-bold mb-0">
                                                28
                                                </span>
                                            </div>
                                            <BsFileEarmarkCheck color='green' size={30} />
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>
                                
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Tickets en attente
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">26</span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>

                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Tickets résolus
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">9</span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>

                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Techniciens
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">26</span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
            
        )
    }
}


