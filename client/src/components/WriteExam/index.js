import React, { useState ,useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './index.css'
import { useNavigate } from "react-router";
import Header from "../header";


const concepts = [{id:1,val:'OOP',},{id:2,val:'collections'},{id:3,val:'JDBC'},{id:4,val:'ExceptionalHandling'},{id:5,val:'MultiThreading'},{id:6,val:'Arrays'}]



export default function WriteExam() {
  const [topic, setTopic] = useState("OOPS");
  const [range,setRange] = useState('10');
  const navigate = useNavigate()




  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('topic',topic);
    localStorage.setItem('range',range);
    navigate('/write-exam/exam');
  }

  return (
    <>
    <Header/>
    <div className="Login "> 
    <p className='main-para'>Exam Contains 20 Questions and Time also 20 minutes. Each Question has exactly one minute. Before starting the exam you need to select Topic & Questions Range then you can click on start.</p>
      <Form className='shadow login-forn-container' onSubmit={handleSubmit}> 
        <h1 className="heading-log-in">Quiz</h1>
        <Form.Group size="sm" controlId="email">
          <Form.Label>Topic </Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setTopic(e.target.value)}>
          {concepts.map(eachTopic =>{
                          return(
                          <option key={eachTopic.id} value={eachTopic.val}>{eachTopic.val}</option>)
                      })}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mt-2" size="lg" controlId="password">
            <Form.Label>Range</Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => setRange(e.target.value)}>
                    <option value="10">10</option>
                    <option value="20">20</option>
            </Form.Select>
        </Form.Group> 
        <Button block className='mt-2' size="lg" type="submit" >
           write exam
        </Button> <br/>
      </Form>
    </div>
    </>
  );
}

