import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { BeatLoader } from 'react-spinners'

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'
import ToolkitProvider, { Search, } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { API_URL } from '../layouts/constants'
import { connect } from 'react-redux'

class TicketAttente extends Component {
    
    state = {
        isLoading: true,
        waitTickets: [],
        allTechnicians: [],
        selectedRow: null,
        idTechnicien: "",
        showModal: false,
        showModal2: false,
        message: ""
    }

    componentDidMount(){
        this.fetchTickets()
    }

    fetchTickets = () => {
        fetch(API_URL + "waiting-tickets/")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    waitTickets: responseJson.data,
                    isLoading: false
                })
            }
        })
        .catch((error) => console.log(error))
    }

    fetchTechnicians = () => {
        fetch(API_URL + "techniciens/")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    allTechnicians: responseJson.data,
                    isLoading: false
                })
            }
        })
        .catch((error) => {
            console.log(error)
            this.setState({
                isLoading: false
            })
        })
    }

    //permet d'affecter un ticket a un technicien
    affectTicket = () => {
        this.setState({
            isLoading: true,
            showModal: false
        })
        fetch(API_URL + 'affect-tickets/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ticket: this.state.selectedRow.id,
                admin: this.props.user.id,
                technicien: this.state.idTechnicien
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success){
                this.setState({
                    message: responseJson.message,
                    showModal2: true
                })
            }
        })
        .then(() => this.fetchTickets())
    }

    render() {
        const { SearchBar } = Search
        return (
            <div>
                <Sidebar clicked="ticketAttente" />
                <div style={{marginLeft: 220}}>
                    <Header />
                    <div className="container-fluid" style={{marginBottom: 50}}>
                        <Card className="shadow">
                            <CardTitle className="border-0">
                                <h5 className="mb-0" style={{marginTop: 15, marginLeft: 20}}>Tickets en Attente</h5>
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
                                        data={this.state.waitTickets}
                                        columns={this.columns}
                                        search
                                    >
                                        {(props) => (
                                            <div>
                                                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 30, marginBottom: 20}}>
                                                    <button
                                                        style={this.styles.button}
                                                        disabled={this.state.selectedRow ? false : true}
                                                        onClick={() => this.setState({showModal: true})}
                                                    >
                                                        Reattribuer un ticket
                                                    </button>

                                                    <SearchBar {...props.searchProps} style={{width: 350, height: 50, fontFamily: 'Tauri'}} />
                                                </div>
                                                
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
                        <ModalHeader>Choisir le Technicien</ModalHeader>
                        <ModalBody>
                            <select style={this.styles.dropDown} onChange={(event) => this.setState({idTechnicien: event.target.value})}>
                                <option>Choisir Technicien</option>
                                {
                                    this.state.allTechnicians.map((item, index) => {
                                        return(
                                            <option key={index} value={item.id}>
                                                {item.nom} {item.prenom} | Ticket en cours : {item.number_ticket}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.affectTicket()}>Valider</Button>
                        </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={this.state.showModal2} toggle={() => this.setState({showModal2: !this.state.showModal2})}>
                        <ModalHeader>Opération</ModalHeader>
                        <ModalBody>
                            {this.state.message}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.setState({showModal2: !this.state.showModal2})}>Fermer</Button>
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

    descriptionFormatter = (cell, row) => {
        return(
            <span>
                {cell.slice(0, 100)}
                {
                    cell.length>100 && <span>...</span>
                }
                
            </span>
        )
    }

    styles = {
        header:{
            fontFamily: 'Montserrat',
            fontSize: 17,
            minWidth: 150
        },

        headerSort:{
            backgroundColor: '#e0e0e0',

        },

        button:{
            backgroundColor: '#ffa000',
            color: 'white',
            width: 220,
            height: 40,
            marginRight: 50,
            borderRadius: 5,
            fontFamily: 'Montserrat',
            fontSize: 16
        },

        dropDown: {
            height: 50,
            width: '100%',
            fontFamily: 'Montserrat',
            fontSize: 16,
            borderRadius: 5,
            paddingLeft: 10
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
            text: 'Date',
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
            dataField: 'technicien',
            text: 'Technicien',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'description',
            text: 'Description',
            sort: false,
            formatter: this.descriptionFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        }
    ]
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(TicketAttente)
