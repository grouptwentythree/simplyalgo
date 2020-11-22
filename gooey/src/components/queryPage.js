import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import {Dropdown, DropdownButton} from 'react-bootstrap'

const SideBar = styled.div`
    display: flex,
    flexDirection: column
    padding: 20px;
    min-width: 200px;
    text-align: left;   
`

const Tab = styled.div`
    padding: 10px;
    margin: 5px;
    borderRadius:2px;
    border: 1px solid green;
    &:hover {
        cursor: pointer;
        border: 1px solid pink;
    }
`

export default function QueryPage(){

    const [activeTab, setActiveTab] = useState('DASHBOARD')

    return(
        <div style={{ "display": "flex", "flexDirection": "row"}}>
            <SideBar>
                <Tab onClick={()=>(setActiveTab('DASHBOARD'))}> DASHBOARD </Tab>
                <Tab onClick={()=>(setActiveTab('ALGOTRADER'))}> ALGOTRADER </Tab>
                <Tab onClick={()=>(setActiveTab('BROWSE'))}> BROWSE </Tab>
                <Tab onClick={()=>(setActiveTab('SETTINGS'))}> SETTINGS </Tab>
            </SideBar>
            <div>
            {activeTab == 'DASHBOARD' ? 
                <Dashboard> </Dashboard> : 
                activeTab == 'ALGOTRADER' ? 
                    <Algotrader> </Algotrader> : 
                    activeTab == 'BROWSE' ? 
                        <Browse> </Browse> : 
                        activeTab == 'SETTINGS' ? 
                            <Settings> </Settings> :
                            null }
            </div>
        </div>
    )

    function Dashboard() {
        return(
            <h2>
               this page should show the user portfolio, which is the combination of all algotraders connected
            </h2>
        )
    }

    function Algotrader() {
         // lets you create and add an algotrader
        //lets you view and browse an algotrader 
        const [api, setResponse] = useState([])


        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('query');
    
        useEffect(()=>{
           fetchyourAlgos()
        }, []);

        const fetchyourAlgos = () =>{
            fetch("http://localhost:9000/algotrader?user="+myParam)  
            .then(res => res.text()) // res.text()
            .then(res => { 
                console.log(res)
                setResponse(JSON.parse(res))
            })
        }

        return(
            <div style={{padding: '30px', display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {api.map(algo => (
                    <Card canAccess={true} algo={algo} > {algo.id} </Card>   
            ))} 
            </div>
        )
    }

    function Browse() {
        const [api, setResponse] = useState([])
       
        useEffect(()=>{
            fetchAllAlgos()
         }, [])
 
         const fetchAllAlgos = () =>{
             console.log('fecthing all')
             fetch("http://localhost:9000/algotrader/all")  
             .then(res => res.text()) // res.text()
             .then(res => { setResponse(JSON.parse(res))
             })
         }

         const fetchDivisible = () =>{
            console.log('fetching divide')
            fetch("http://localhost:9000/algotrader/divide")  
            .then(res => res.text()) // res.text()
            .then(res => { setResponse(JSON.parse(res))
            })
        }
 
         return(
             <>
                <div style={{padding: '30px'}}>
                 <button onClick={()=>fetchDivisible()}> Find algotrader system integrated with all brokerages </button>
                 <button onClick={()=>fetchAllAlgos()}> Reset </button>
                </div>
                <div style={{padding: '30px', display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {api.map(algo => (
                        <Card canAccess={false} key={algo.id} algo={algo} />   
                ))} 
                </div>
             </>
         )
    }


    function Settings() {
        return(
            <div>Delete Account</div>
        )
    }


}