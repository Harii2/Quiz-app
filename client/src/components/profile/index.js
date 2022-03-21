import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../header";

const Profile = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [mobileNo,setMobileNo] = useState('')
    const [errorMsg,setErrorMsg] = useState('');
    const [succesMsg,setSuccesMsg] = useState('');
    const [btnContent,setBtnContent] = useState('up-date')
   

    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        if(email === ''){
            setErrorMsg('*please enter email')
        }
        else if(password === ''){
            setErrorMsg('*please enter password')
        }
        else if(firstName === ''){
            setErrorMsg('*please enter first name')
        }
        else if(lastName === ''){
            setErrorMsg('*please enter last name')
        }
        else if(confirmPassword === ''){
            setErrorMsg('*please enter confirm password')
        }
        else if(mobileNo === ''){
            setErrorMsg('*please enter mobile no')
        }
        else{
            setErrorMsg('')
            setSuccesMsg('changes are made succesfully')
        }
      }



    return(
      <>
      <Header/>
        <div className="Login ">
        <Form className='shadow login-forn-container' onSubmit={handleSubmit}> 
          <h1 className="heading-log-in">Profile</h1>
          <Form.Group size="lg" controlId="fName">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value);setErrorMsg('')}}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="sName">
          <Form.Label>LastName</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value);setErrorMsg('')}}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value);setErrorMsg('')}}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="mobileNo">
            <Form.Label>Mobile NO</Form.Label>
            <Form.Control
              type="text"
              value={mobileNo}
              onChange={(e) => {setMobileNo(e.target.value);setErrorMsg('')}}
            />
          </Form.Group> 
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value);setErrorMsg('')}}
            />
          </Form.Group> 
          <Form.Group size="lg" controlId="cPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword} 
              onChange={(e) => {setConfirmPassword(e.target.value);setErrorMsg('')}}
            />
          </Form.Group> 
          
          <p className='error-msg'>{errorMsg}</p>
          <p className="succes-msg">{succesMsg}</p>
          <Button onClick={handleSubmit} block className='mt-2' size="lg" type="submit" disabled={!validateForm()}>
            {btnContent}
          </Button> <br/>
          
        </Form>
      </div>
      </>
    )
}

export default Profile