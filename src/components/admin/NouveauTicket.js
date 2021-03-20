import React, { Component } from 'react'
import { Card, CardBody, CardTitle, } from "reactstrap";

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'

export default class NouveauTicket extends Component {
    render() {
        return (
            <div>
                <Sidebar clicked="new" />
                <div style={{marginLeft: 220}}>
                    <Header />
                    <div className="container-fluid">
                        <Card className="shadow">
                            <CardTitle className="border-0">
                                <h5 className="mb-0" style={{marginTop: 15, marginLeft: 20}}>Nouveaux Tickets</h5>
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
