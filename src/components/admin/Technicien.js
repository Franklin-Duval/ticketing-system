import React, { Component } from 'react'
import { Card, CardBody, CardTitle, } from "reactstrap"
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'
import ToolkitProvider, { Search, } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { API_URL } from '../layouts/constants'

export default class Technicien extends Component {
    
    state = {
        isLoading: true,
        allTechnicians: [],
        selectedRow: {}
    }

    componentDidMount(){
        this.fetchTechnicians()
    }

    fetchTechnicians = () => {
        fetch(API_URL + "techniciens/")
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success){
                this.setState({
                    allTechnicians: responseJson.data,
                    isLoading: false
                })
            }
        })
        .catch((error) => {
            this.setState({isLoading: false})
            console.log(error)
        })
    }

    render() {
        const { SearchBar } = Search
        return (
            <div>
                <Sidebar clicked="technicien" />
                <div style={{marginLeft: 220}}>
                    <Header />
                    <div className="container-fluid" style={{marginBottom: 50}}>
                        <Card className="shadow">
                            <CardTitle className="border-0">
                                <h5 className="mb-0" style={{marginTop: 15, marginLeft: 20}}>Techniciens</h5>
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
                                        data={this.state.allTechnicians}
                                        columns={this.columns}
                                        search
                                    >
                                        {(props) => (
                                            <div>
                                                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 30, marginBottom: 20}}>
                                                    <button
                                                        style={this.styles.button}
                                                    >
                                                        <Link to="/admin/new-technicien" style={{textDecoration: 'none', color: 'white'}}>Nouveau Technicien</Link>
                                                    </button>
                                                    
                                                    <SearchBar {...props.searchProps} style={{width: 350}} />
                                                </div>
                                                
                                                <BootstrapTable
                                                    hover
                                                    bootstrap4
                                                    {...props.baseProps}
                                                    noDataIndication="Aucun technicien n'est disponible pour l'instant"
                                                    bordered={false}
                                                    pagination={paginationFactory()}
                                                    
                                                />
                                            </div>
                                        )}
                                    </ToolkitProvider>
                                }
                                
                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
            </div>
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
            width: 200,
            height: 40,
            marginRight: 50,
            borderRadius: 5,
            fontFamily: 'Montserrat',
            fontSize: 16
        }
    }

    columns = [
        {
            dataField: 'nom',
            text: 'Nom',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'prenom',
            text: 'Prénom',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_inscription',
            text: "Date d'Incription",
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
            dataField: 'number_ticket',
            text: 'Ticket en cours',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },
    ]
    
}

