import React, {useState} from 'react'
import styled from 'styled-components'


const Main = styled.div`
    border-radius: 5px; 
    border: 1px solid gray; 
    text-align: left; 
    margin-right: 20px; 
    margin-bottom: 20px;
    transition-duration: 1s;
    &:hover {
        box-shadow: 3px 3px 6px 2px #d3d3d3;
        cursor: pointer;
    }
`

const Content = styled.div`
    padding: 20px;
    backgroundColor: light-gray;
`

const Modal = styled.div`
    background-color: white;
    width: 40%; /* Width in proportion to its parent container*/
    max-width: 440px; /* Max width where it stops expanding */
    
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
const Order = styled.div`
    padding: 10px 20px;
    border: 2px dotted teal;
    background-color: lightGreen;
    border-radius: 2px;
    margin: 2px;
`



export default function Card(props) {
    const [showPopup, setShowPopup] = useState(false)
    const [status, setStatus] = useState([])


    const getAlgoStatus = () =>{
        fetch("http://localhost:9000/algotrader/performance/"+props.algo.id)  
        .then(res => res.text()) // res.text()
        .then(res => { 
            console.log(JSON.parse(res))
            setStatus(JSON.parse(res))
        })
    }
    
    const onClick = () => {
        if(props.canAccess) {
            getAlgoStatus();
            setShowPopup(!showPopup)
        } 
    }

    function CardModal() {
        return(
        <Background onClick={()=>{setShowPopup(!showPopup)}}>
            <Modal>
                <h4> {props.algo.name} </h4>
                <p> {props.algo.performance_metrics} </p>
                <div>
                    {status.map((trade)=>(
                        <Order key={trade.order_id}>
                            <p >
                            {trade.quantity} x {trade.ticker}
                            </p>
                            <p>
                                {trade.name}
                            </p>
                        </Order>
                    ))}
                </div>
            </Modal>
        </Background>)
    }

    return(
        <Main onClick={onClick}>
            <Content>
                <h3> {props.algo.name} </h3>
                <p> {props.algo.general_parameters} </p>
                <i> <small> Annual Fee: {props.algo.fee}% </small> </i>
            </Content>
            <div>
    {showPopup ? <CardModal onRequestClose={()=>setShowPopup(false)}>  </CardModal> : null}
            </div>
        </Main>
    )



}