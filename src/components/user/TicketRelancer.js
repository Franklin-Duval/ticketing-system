
import React, { Component } from 'react'
import { Card, CardBody, CardTitle, } from "reactstrap";

import Sidebar from './HeaderUser'
import Header from './HeaderUser'

export default class TicketRelancer extends Component {
    render() {
        return (
            <div>
                <Sidebar clicked="ticketRelance" />
                <div style={{marginLeft: 220}}>
                    <Header />
                    <div className="container-fluid">
                        <Card className="shadow">
                            <CardTitle className="border-0">
                                <h5 className="mb-0" style={{marginTop: 15, marginLeft: 20}}>Tickets Relancés</h5>
                            </CardTitle>

                            <CardBody>
                                <p>Test</p>
                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
            </div>
        )
    }
}

