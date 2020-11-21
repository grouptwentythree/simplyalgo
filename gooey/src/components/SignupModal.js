import React, {useState} from 'react'
import styled from 'styled-components'


const Modal = styled.div`
    background-color: white;
    width: 30%; /* Width in proportion to its parent container*/
    max-width: 440px; /* Max width where it stops expanding */
    height: 50%; /* Height in proportion to its parent container */
    margin: auto; /* Auto margin according to the element width */
    padding: 15px;
    color: black;
    border: 1px solid black;
    border-radius: 20px; /* Optional. Rounds container corners */
`

const Background = styled.div`
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Overlay effect: translucent background: black w/ partial opacity */
    z-index: 1; /* Overlay effect: positioned over other containers */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    position: fixed; /* Fix position on the top-left corner*/
    top: 0;
    left: 0;
    overflow: auto; /* Enable scroll if needed */
    padding-top: 80px; /* Location of the content container */
`

const CloseButton = styled.span`
    color: #aaaaaa;
    float: right; /* Positioned to the right of the parent container whichever size it is */
    font-size: 25px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        color: #000000
    }
`
const Content = styled.div`
    padding: 30px;
`

export default function SignupModal({onClose}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const isEmailValid = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    var isEnabled = isEmailValid(email) && password.length > 0;

    
  const signup = () => { 
    // push to validated webbage or tell user that theyre' not defined
    fetch("http://localhost:9000/client/add/"+email.trim()+"?password="+password.trim())  
        .then(res => res.text())
        .then(res => {
            console.log(res)
            if(res=="WELCOME TO SIMPLYALGO!"){
                alert("Welcome to SimplyAlgo :) Please log-in from the landing page")
                onClose()
            } else {
                alert("uwu we messed up, blame alex, also the backend probably crashed")
            }
        })       
    }
       
 
    return(
        <Background>
            <Modal>
                <CloseButton onClick={onClose}> x </CloseButton>
                <Content>
                    <p> Email Address: </p>
                    <input type="text" 
                        value={email} 
                        pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})" 
                        onChange={e => setEmail(e.target.value)} />

                    <p> Password: </p>
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    <div>
                        {isEnabled}
                    </div>
                    <button disabled={!isEnabled} onClick={()=>signup()}>Sign up</button>
                </Content>
            </Modal>
        </Background>
      
    )



}