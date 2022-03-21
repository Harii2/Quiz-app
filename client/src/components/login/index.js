import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import { useNavigate } from "react-router";
import './index.css'
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [succesMsg,setSuccesMsg] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  const [BtnContent,setBtnContent] = useState('Login')
  const navigate = useNavigate()

  function validateForm() {
    return email.length > 0 && password.length > 0; 
  }

  function handleSubmit(event) {
    setBtnContent(<Spinner animation="border" variant="primary"/>)
    event.preventDefault();
    if(email===''){
      setErrorMsg('*please enter email')
    }
    else if(password === ''){
      setErrorMsg('*please enter password')
    }
    else{
    const body = {email,password}
    axios.post('http://localhost:5000/log-in',body)
      .then(res =>{
        //console.log(res.data)
        setBtnContent('Login')
        if (res.status === 200){
            const {id,jwtToken,email,msg} = res.data;
            setSuccesMsg(msg)
            localStorage.setItem('id',id);
            localStorage.setItem('jwtToken',jwtToken);
            localStorage.setItem('email',email)
            navigate('/home')
        }
        else{
          const {msg} = res.data 
          setErrorMsg(msg)
        }
      })}
  }

  return (
    <div className="Login ">
      <Form className='shadow login-forn-container' onSubmit={handleSubmit}> 
        <h1 className="heading-log-in">Log-In</h1>
        <Form.Group size="sm" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group> 
        <Button block onClick={handleSubmit} className='mt-2' size="lg" type="submit" disabled={!validateForm()}>
          {BtnContent}
        </Button> <br/>
        <p className="pt-2">{succesMsg}</p>
        <p className="error-msg">{errorMsg}</p>
        <a href="/sign-up">New User?</a>
      </Form>
    </div>
  );
}