import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import Card from '../components/Card'
import { PieChart } from 'react-minimal-pie-chart';

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
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('query');

        const [api, setResponse] = useState([])
   
        useEffect(()=>{
            fetchPortfolio()
         }, []);
 
        const fetchPortfolio = () =>{
            fetch("http://localhost:9000/portfolio?user="+myParam)  
             .then(res => res.text()) // res.text()
             .then(res=> JSON.parse(res))
             .then(res => res.map((element, index) => ({ ...element, color: randomColor[index]})))
             .then(res=> setResponse(res))
        }

        const randomColor=["#555b6e", "#89b0ae", "#bee3db", "#faf9f9", "#ffd6ba", "#ecf8f8", '#eee4e1', '#e7d8c9', '#e6beae', '#b2967d']
      
        return(       
            <div style={{margin: '40px', fontSize:'5px', lineHeight:'normal', fontStretch:'normal', transitionDuration: '3s' }}>
                <PieChart animate={true}
                        lineWidth={60}
                        labelPosition={70}
                        animationDuration={2500+Math.random()} 
                        label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}` }
                        data={api} />
            </div>
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
            .then(console.log(myParam))
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
             console.log('fetching all')
             fetch("http://localhost:9000/algotrader/all")  
             .then(res => res.text()) // res.text()
             .then(res => { setResponse(JSON.parse(res))
             })
         }

         const popularAlgos = () =>{
            fetch("http://localhost:9000/algotrader/popular")  
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
                 <button onClick={()=>popularAlgos()}> Find popular algotraders </button>
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
        const [api, setResponse] = useState([])
        let history = useHistory();

        
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('query');

        const deleteAcc = () =>{
            console.log("deleting current account")
            fetch("http://localhost:9000/client/delete/"+myParam)
            history.push('/');
        }

        return(
            <div style={{padding: '30px'}}>
                <button onClick={()=>deleteAcc()}>Delete Account</button>
            </div>
        )
    }


}