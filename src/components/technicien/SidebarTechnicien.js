import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaDesktop, FaSignOutAlt, FaSpinner } from 'react-icons/fa'
import { BsFileEarmarkCheck, BsFileEarmarkDiff } from 'react-icons/bs'
import '../../assets/css/sidebar.css'

export default class SidebarTechnicien extends Component {
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
                        <Link to="/technicien/dashboard" style={styles.links}>Déconnecter</Link>
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
