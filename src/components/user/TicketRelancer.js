
import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { BeatLoader } from 'react-spinners'

import Sidebar from './SidebarUser'
import Header from './HeaderUser'
import ToolkitProvider, { Search, } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { API_URL } from '../layouts/constants'
import { connect } from 'react-redux'


class TicketRelancer extends Component {
    
    state = {
        isLoading: true,
        waitingTickets: [],
        selectedRow: null,
        showModal: false,
        message: ""
    }

    componentDidMount(){
        this.fetchTickets()
    }

    fetchTickets = () => {
        fetch(API_URL + "relanced-user-tickets/" + this.props.user.id + "/")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    waitingTickets: responseJson.data,
                    isLoading: false
                })
            }
        })
        .catch((error) => console.log(error))
    }

    relancerTicket = () => {
        this.setState({isLoading: true})
        fetch(API_URL + 'relancer-tickets/' + this.state.selectedRow.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({isLoading: false})
            if (responseJson.success){
                this.setState({
                    showModal: true,
                    message: responseJson.message
                })
            }
        })
        .then(() => this.fetchTickets())
    }

    render() {
        const { SearchBar } = Search
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

                            <CardBody style={{padding: 0}}>
                                {
                                    this.state.isLoading
                                    ?
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <BeatLoader loading={this.state.isLoading} size={20} color="#ffa000" />
                                    </div>
                                    :
                                    <ToolkitProvider
                                        keyField="id"
                                        data={this.state.waitingTickets}
                                        columns={this.columns}
                                        search
                                    >
                                        {(props) => (
                                            <div>
                                                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 30}}>
                                                    <button
                                                        style={this.styles.button}
                                                        disabled={this.state.selectedRow ? false : true}
                                                        onClick={() => this.relancerTicket()}
                                                    >
                                                        Relancer un ticket
                                                    </button>

                                                    <SearchBar {...props.searchProps} style={{width: 350, height: 50, fontFamily: 'Tauri'}} />
                                                </div>
                                                <hr/>
                                                <BootstrapTable
                                                    hover
                                                    bootstrap4
                                                    {...props.baseProps}
                                                    noDataIndication="Aucun ticket n'est disponible pour l'instant"
                                                    bordered={false}
                                                    selectRow={this.selectRow}
                                                    rowStyle={{}}
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )}
                                    </ToolkitProvider>
                                }
                                
                            </CardBody>
                        </Card>
                    </div>

                    <Modal isOpen={this.state.showModal} toggle={() => this.setState({showModal: !this.state.showModal})}>
                        <ModalHeader>Opération</ModalHeader>
                        <ModalBody>
                            {this.state.message}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.setState({showModal: !this.state.showModal})}>Fermer</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }

    selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: {
            backgroundColor: '#ffe0b2',
        },
        onSelect: (row) => {
            this.setState({selectedRow: row})
            console.log("selected", row)
        }
    }

    priorityFormatter = (cell, row) => {
        
        if (row.priorite === "Inconnu") {
            return(
                <span>
                    <strong style={{color: '#ce93d8', fontSize: 18}}>{cell} </strong>
                </span>
            )
        }
        else if (row.priorite === "Normal") {
            return(
                <span>
                    <strong style={{color: '#8bc34a', fontSize: 18}}>{cell} </strong>
                </span>
            )
        }
        else if (row.priorite === "Urgent"){
            return(
                <span>
                    <strong style={{color: 'red', fontSize: 18}}>{cell} </strong>
                </span>
            )
        }
        else if (row.priorite === "Critique") {
            return(
                <span>
                    <strong style={{color: '#c62828', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        
    }

    etatFormatter = (cell, row) => {
        if (row.etat === "En cours"){
            return(
                <span>
                    <strong style={{color: 'green', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else{
            return(
                <span>{cell} </span>
            )
        }
    }

    styles = {
        header:{
            backgroundColor: '#ffa000', //#f5f5f5 grey white
            color: '#fff',
            fontFamily: 'Montserrat',
            fontSize: 16,
            minWidth: 150
        },

        headerSort:{
            backgroundColor: '#e0e0e0',

        },

        button:{
            backgroundColor: '#ffa000',
            color: 'white',
            width: 300,
            height: 50,
            marginRight: '15%',
            borderRadius: 5,
            fontFamily: 'Montserrat',
            fontSize: 18
        }
    }

    columns = [
        {
            dataField: 'client',
            text: 'Client',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'service',
            text: 'Service',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_creation',
            text: 'Date de Création',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_created',
            text: 'Date de Relance',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'priorite',
            text: 'Priorité',
            sort: true,
            formatter: this.priorityFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'etat',
            text: 'Etat',
            sort: true,
            formatter: this.etatFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'nombre_relance',
            text: 'Nombre de Relance',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },
        
    ]
    
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(TicketRelancer)

