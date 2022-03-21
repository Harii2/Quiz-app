import Header from "../header";
import FrameQuestions from "./FrameQuestions";
import { useState,useEffect } from "react";
import './index.css'
import axios from "axios";

const Questions = [{id:1,question:"What is pure function ?",asked_by:'Prem',},{id:2,question:'What is navigation in react hooks ?',asked_by:'Nithin'}]


const Home = ()=>{
   
    const jwtToken = localStorage.getItem('jwtToken')
    const id = localStorage.getItem('id')
    const headers = {'Authorization':`Bearer ${jwtToken}`}

    useEffect(()=>{
        axios.get(`http://localhost:5000/home/get-questions?id=${id}`,{headers})
        .then(res =>{
            console.log(res.data)
        },[])
    })
     
    return(
        <>
        <Header/> 
        <h1 className="top-h1 p-3">Todays Feed of questions</h1>
        {
            Questions.map(eachQuestion => <FrameQuestions key={eachQuestion.id} eachQuestion={eachQuestion}/>)
        }
        </>
    )
}

export default Home
