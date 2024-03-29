import React from 'react'
import { Link } from 'react-router-dom'
import { FaDesktop, FaUserCog, FaSignOutAlt, FaSpinner, FaUserCircle } from 'react-icons/fa'
import { FiFilePlus } from 'react-icons/fi'
import { FcComboChart } from 'react-icons/fc'
import { BsFileEarmarkCheck, BsFileEarmarkDiff } from 'react-icons/bs'
import '../../assets/css/sidebar.css'

import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'

class SidebarAdmin extends React.Component{

    render(){
        let clicked = this.props.clicked
        return(
            <div>
                <div className="side-nav">

                    <div style={styles.user}>
                        <FaUserCircle color='#546e7a' size={100} />
                        <p style={styles.text}>{this.props.user.nom} {this.props.user.prenom} </p>
                    </div>

                    <div className="line"></div>
                    <div className="link row" >
                        <div style={clicked === "dashboard" ? styles.vertical : {}}></div>
                        <FaDesktop color='blue' size={16} style={{marginTop: 5}} />
                        <Link to="/admin/dashboard" style={styles.links}>Dashboard</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "technicien" ? styles.vertical : {}}></div>
                        <FaUserCog color='#ffa000' size={16} style={{marginTop: 5}} />
                        <Link to="/admin/technicien" style={styles.links}>Techniciens</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "new" ? styles.vertical : {}}></div>
                        <FiFilePlus color='green' size={16} style={{marginTop: 5}} />
                        <Link to="/admin/new-ticket" style={styles.links}>Nouveaux Tickets</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "ticketAttente" ? styles.vertical : {}}></div>
                        <FaSpinner color='#0277bd' size={16} style={{marginTop: 5}} />
                        <Link to="/admin/ticket-en-attente" style={styles.links}>Tickets en attente</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "ticketResolu" ? styles.vertical : {}}></div>
                        <BsFileEarmarkCheck color='green' size={16} style={{marginTop: 5}} />
                        <Link to="/admin/ticket-resolu" style={styles.links}>Tickets résolus</Link>
                    </div>

                    <div className="link row">
                        <div style={clicked === "ticketRelance" ? styles.vertical : {}}></div>
                        <BsFileEarmarkDiff color='#7e57c2' size={16} style={{marginTop: 5}} />
                        <Link to="/admin/ticket-relancer" style={styles.links}>Tickets relancés</Link>
                    </div>
                    
                    <div className="link row">
                        <div style={clicked === "statistic" ? styles.vertical : {}}></div>
                        <FcComboChart size={16} style={{marginTop: 5}} />
                        <Link to="/admin/statistics" style={styles.links}>Statistiques</Link>
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
    },

    user:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarAdmin)