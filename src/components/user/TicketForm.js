import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Redirect } from 'react-router-dom'
import Sidebar from './SidebarUser'
import Header from './HeaderUser'
import { BeatLoader } from 'react-spinners'

import { API_URL } from '../layouts/constants'
import { connect } from 'react-redux'

class TicketForm extends Component {
    
    state = {
        isLoading: true,
        allServices: [],
        allProblems: [],
        selectedRow: {},
        urlService:"",
        urlProblem:"",
        visible: false,
        description:"",
        finish: false,
        newProbleme: "",
        showModal: false,
        showModal2: false
    }

    componentDidMount(){
        this.fetchServices()
        this.fetchProblems()
    }

    fetchServices = () => {
        fetch(API_URL + "service/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                allServices: responseJson,
                isLoading: false
            })
            
        })
        .catch((error) => console.log(error))
    }

    fetchProblems = () => {
        fetch(API_URL + "probleme/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                allProblems: responseJson,
                isLoading: false
            })
            
        })
        .catch((error) => console.log(error))
    }

    handleProblem = (event) => {
        this.setState({isLoading: true})
        event.preventDefault()
        fetch(API_URL + 'probleme/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.newProbleme,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({showModal: false})
            this.fetchProblems()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleSubmit = (event) => {
        this.setState({isLoading: true})
        event.preventDefault()
        fetch(API_URL + 'ticket/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                description: this.state.description,
                service: this.state.urlService,
                probleme: this.state.urlProblem,
                client: API_URL + 'client/' + this.props.user.id + '/',
                etat: "Non attribué",
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                isLoading: false,
                showModal2: true,
            })
        })
        .catch((error) =>{
            console.log(error)
            this.setState({
                isLoading: false
            })
        })
    }

    handleModal = () => this.setState({showModal: !this.state.showModal})

    handleModal2 = () => {
        this.setState({
            showModal2: !this.state.showModal2,
            finish: true
        })
    }

    render() {
        return (
            this.state.finish
            ?
            <Redirect to="/user/dashboard" />
            :
            <div>
                <Sidebar />
                <div style={{marginLeft: 220}}>
                    <Header />
                    <div className="container-fluid" style={{marginBottom: 50}}>
                        <Card className="shadow">
                            <CardTitle className="border-0">
                                <h5 className="mb-0" style={{marginTop: 15, marginLeft: 20}}>Formulaire de création de ticket</h5>
                            </CardTitle>

                            <CardBody>
                                {
                                    this.state.isLoading
                                    ?
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <BeatLoader loading={this.state.isLoading} size={20} color="#ffa000" />
                                    </div>
                                    :
                                    <div>
                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label htmlFor="service">Service</label>
                                                        <select className="form-control" id="service" onChange={(event) => this.setState({urlService: event.target.value})}>
                                                            <option>---------</option>
                                                            {
                                                                this.state.allServices.map((item, index) => {
                                                                    return(
                                                                        <option key={index} value={item.url}>
                                                                        {item.nom}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label htmlFor="probleme">Type de Problème</label>
                                                        <select className="form-control" id="probleme" onChange={(event) => {
                                                            if(event.target.value === "autre"){
                                                                this.setState({showModal: true})
                                                            }
                                                            else{
                                                                this.setState({
                                                                    urlProblem: event.target.value,
                                                                    visible: false
                                                                })
                                                            }
                                                            
                                                        }}>
                                                            <option>---------</option>
                                                            {
                                                                this.state.allProblems.map((item, index) => {
                                                                    return(
                                                                        <option key={index} value={item.url}>
                                                                            {item.nom}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                            <option value="autre" >Autres</option>
                                                        </select>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label htmlFor="description">Décrivez brièvement le problème rencontré</label>
                                                        <textarea className="form-control" id="description" rows="5"  onChange={(event) => this.setState({description: event.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{width: 300}}>Créer</button>
                                        </form>

                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <Modal isOpen={this.state.showModal} toggle={this.handleModal}>
                    <ModalHeader toggle={() => this.setState({showModal: false})}>Signalez le type problème</ModalHeader>
                    <ModalBody>
                        
                        <div className="form-group">
                            <div className="col-xs-2">
                            
                                <label htmlFor="autre">Problème</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Donnez un nom au type de problème"
                                    onChange={(event) => this.setState({newProbleme: event.target.value})}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleProblem}>Valider</Button>
                        <Button color="secondary" onClick={this.handleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.showModal2} toggle={this.handleModal2}>
                    <ModalHeader>Opération</ModalHeader>
                    <ModalBody>
                        Le nouveau Ticket a été crée
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleModal2}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(TicketForm)
