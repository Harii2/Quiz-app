import Header from "../header";
import './index.css'
import { useState } from "react";
import axios from "axios";

const AddQuestion =()=>{
    
    const [topic,setTopic] = useState('')
    const [question,setQuestion] = useState('')
    const [succesMsg,setSuccesMsg] = useState('')
    const id = localStorage.getItem('id');
    const jwtToken = localStorage.getItem('jwtToken')

    const submitClicked = ()=>{
        const body = {id,topic,question};
        const headers = {'Authorization' : `Bearer ${jwtToken}`} 
        console.log(body)
        axios.post('http://localhost:5000/add-question',body,{headers})
         .then(res =>{
             if(res.status===200){
                setSuccesMsg(res.data)
             } 
             else{
                console.log(res.data)
             }
         })
    }


    return(
        <>
        <Header/> 
        <div className="add-question-bg shadow p-5">
            <h1>Ask your doubts</h1>
            <p>Topic</p> 
            <input onChange={e => {setTopic(e.target.value);setSuccesMsg('')}} value={topic} className="input-add-question mb-3" type='text' placeholder="Related topics"/> <br/>
            <p>Frame Your Question</p>
            <textarea onChange={e => {setQuestion(e.target.value);setSuccesMsg('')}} value={question} className="text-area" cols='100' rows='10'/> <br/> 
            <p>*You can check your posted questions in DashBoard</p>
            <p className='suuces-msg'>{succesMsg}</p>
            <button onClick={submitClicked} className="btn btn-primary">Submit</button>
        </div>
        </>
    )
}

export default AddQuestion