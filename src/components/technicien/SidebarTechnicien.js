import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaDesktop, FaSignOutAlt, FaSpinner } from 'react-icons/fa'
import { BsFileEarmarkCheck, BsFileEarmarkDiff } from 'react-icons/bs'
import '../../assets/css/sidebar.css'

import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'

class SidebarTechnicien extends Component {
    render() {
        let clicked = this.props.clicked
        return(
            <div>
                <div className="side-nav">
                    <div className="compu row" style={{marginLeft: 0}}>                        
                        <h6 className="text-center" style={{}}><Link to="/">Tiketing System</Link></h6>
                    </div>

                    <div className="line"></div>
                    <div className="link row" >
                        <div style={clicked === "dashboard" ? styles.vertical : {}}></div>
                        <FaDesktop color='blue' size={16} style={{marginTop: 5}} />
                        <Link to="/technicien/dashboard" style={styles.links}>Dashboard</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "ticketAttente" ? styles.vertical : {}}></div>
                        <FaSpinner color='#0277bd' size={16} style={{marginTop: 5}} />
                        <Link to="/technicien/ticket-en-attente" style={styles.links}>Tickets en attente</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "ticketResolu" ? styles.vertical : {}}></div>
                        <BsFileEarmarkCheck color='green' size={16} style={{marginTop: 5}} />
                        <Link to="/technicien/ticket-resolu" style={styles.links}>Tickets résolus</Link>
                    </div>

                    <div className="link row">
                        <div style={clicked === "ticketRelance" ? styles.vertical : {}}></div>
                        <BsFileEarmarkDiff color='#7e57c2' size={16} style={{marginTop: 5}} />
                        <Link to="/technicien/ticket-relancer" style={styles.links}>Tickets relancés</Link>
                    </div>
                    
                    <div className="link row">
                        <FaSignOutAlt color='red' size={16} style={{marginTop: 5}} />
                        <Link to="/" style={styles.links}>
                            <span onClick={() => {
                                this.props.save_user({
                                    authentifie: false,
                                    userType: "",
                                    id: "",
                                    nom: "",
                                    prenom: "",
                                    email: "",
                                    url: ""
                                })
                            }}>
                                Déconnecter
                            </span>
                        </Link>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const styles = {
    links:{
        textDecoration: 'none',
        marginLeft: 15,
        color: 'inherit',
    },

    vertical:{
        width: 3,
        height: 25,
        backgroundColor: 'black',
        marginLeft: -5,
        marginRight: 5
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save_user : (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTechnicien)
