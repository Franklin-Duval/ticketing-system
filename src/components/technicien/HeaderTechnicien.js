import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { API_URL } from '../layouts/constants'

import { FaUserCircle, FaBell } from 'react-icons/fa'
import '../../assets/css/header.css'

class Header extends Component {

    state = {
        stats: {},
        update: false,
        showModal: false,
        showModal2: false,
        mdp: ""
    }

    componentDidMount(){
        this.fetchStats()
        this.fetchNewTechnicien()
    }

    fetchStats = () => {
        fetch(API_URL + "technician-stats/" + this.props.user.id + "/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                stats: responseJson,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    fetchNewTechnicien = () => {
        fetch(API_URL + "check-password/" + this.props.user.id + "/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                update: responseJson.update
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    updatePassword = () => {
        this.setState({showModal: false})
        fetch(API_URL + 'update-password/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.user.id,
                password: this.state.mdp
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === true){
                this.setState({
                    isLoading: false,
                    showModal2: true,
                })
            }
            else{
                this.setState({
                    isLoading: false,
                })
            }
            
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
            update: false
        })
    }

    render() {
        return (
            <div className="head">
                <div className="container-fluid">
                    <div className="row" style={{ padding: 20}}>
                        <p style={{fontFamily: 'Tauri', fontSize: 25, color: 'white'}}>DASHBOARD</p>
                        
                        {
                            this.state.update && (
                                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                                    <FaBell className="heart" size={25} />
                                    <button 
                                        className="notif"
                                        onClick={() => this.setState({showModal: true})}
                                    >
                                        Update Password
                                    </button>
                                    
                                </div>
                                
                            )
                        }
                        
                        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end',}}>
                            <FaUserCircle color="white" size={40} />
                            <div>
                                <p style={{fontFamily: 'Tauri', fontSize: 16, color: 'white', marginLeft: 10}}>
                                    {this.props.user.nom} {this.props.user.prenom}
                                    <br/>
                                    
                                </p>
                                <p style={{fontFamily: 'Tauri', color: 'white', fontSize: 14, marginTop: -15, marginLeft: 10}}>Technicien</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div className="header pb-8 pt-5 pt-md-8">
                    <Container fluid>
                        <div className="header-body">
                        {/* Card stats */}
                            <Row>                                
                                <Col lg="6" xl="4">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Tickets en attente
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                {this.state.stats.num_wait_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>

                                <Col lg="6" xl="4">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Tickets résolus
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                {this.state.stats.num_fin_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>

                                <Col lg="6" xl="4">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase text-muted mb-0" >
                                                    Tickets Relancés
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                {this.state.stats.num_rel_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>

                <Modal isOpen={this.state.showModal} toggle={this.handleModal}>
                    <ModalHeader toggle={() => this.setState({showModal: false})}>Signalez le type problème</ModalHeader>
                    <ModalBody>
                        
                        <div className="form-group">
                            <div className="col-xs-2">
                            
                                <label htmlFor="autre">Nouveau Mot de Passe</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    value={this.state.mdp}
                                    onChange={(event) => this.setState({mdp: event.target.value})}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.updatePassword}>Valider</Button>
                        <Button color="secondary" onClick={this.handleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.showModal2} toggle={this.handleModal2}>
                    <ModalHeader>Opération</ModalHeader>
                    <ModalBody>
                        Le mot de passe a été mis a jour avec succès
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

export default connect(mapStateToProps)(Header)
