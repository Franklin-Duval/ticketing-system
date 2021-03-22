import React from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

//import API_URL from '../assets/constant'
import '../../assets/css/form.css'
import logo from '../../assets/images/finger.png'

export default class Login extends React.Component{

    state = {
        email: "",
        password: "",
        type: "",

        finish: false,
    }

    /* handleSubmit = (event) => {
        event.preventDefault()
        fetch(API_URL + 'auth-login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.user_name,
                password: this.state.password,
                type: this.state.type,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.login === "FAILED"){
                alert(responseJson.message)
            }
            else if (responseJson.login === "SUCCESS"){
                if (responseJson.type === "admin"){
                    this.setState({
                        finish: true,
                        type: "admin"
                    })
                }
                else{
                    this.setState({
                        finish: true,
                        type: "policier"
                    })
                }
            }

        })
        .catch((error) =>{
            console.log(error)
        })
    } */

    render(){
        return(
            <div className="container-fluid bodys" >
                <p style={styles.text}>Ticketing System</p>
                <form className="forms" onSubmit={(event) => this.handleSubmit(event)} >
                    <img src={logo} alt="" style={{width: 75, height: 75, marginBottom: 20}} />
                    
                    
                    <div className="form-group">
                        <FiMail color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="email" 
                            className="text-field" id="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => {
                                this.setState({email: event.target.value})
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FiLock color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="password" 
                            className="text-field" id="password"
                            placeholder="Mot de Passe"
                            value={this.state.password}
                            onChange={(event) => {
                                this.setState({password: event.target.value})
                            }}
                        />
                    </div>
                    
                    <button type="submit" className="button" >Connexion</button>
                    <div style={styles.subText}>
                        <Link to="/register" style={{color: 'black'}}>Créer un compte !</Link>
                    </div>
                </form>
                
            </div>
        )
    }
}

const styles = {
    text:{
        color: "#ffa000",
        marginBottom: 30,
        fontSize: 50,
        fontFamily: 'Montserrat'
    },

    subText:{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 20,
        marginBottom: -20,
        fontFamily: "Tauri",
        fontSize: 14,
    }
}