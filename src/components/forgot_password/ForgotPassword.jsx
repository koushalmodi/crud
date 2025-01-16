import React from 'react';
import axios from "axios";
import "./ForgotPassword.css"
import  { useNavigate } from 'react-router-dom'
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const ForgotPassword=()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const updateEmail=(e)=>{
        setEmail(e.target.value)
    }
    const forgotPassword= async (e)=>{
        e.preventDefault();
        const formData = {data:{attributes: {email:email}}}
        try{
          const response = await axios.post(
            "https://classboxv2-291276-ruby.b291276.dev.eastus.az.svc.builder.cafe/bx_block_forgot_password/passwords/forgot",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
          );
        //   const apiRespose = await response.json();
          if (response.status===200){
            setEmail("")
            alert("Reset Password Link Sent Successfully")
            navigate("/login")
          }
          else{
            alert(`${response.data.errors}`)
          }
        } catch(error){
            alert(error.message)
        }
    }
    return(
        <>
            <div className="main"> 
                <div className="second-secondry-div secondry-inner-div">
                    <div className="inner-div">
                        <h2>Forgot your password?</h2>
                    </div>
                    <div className="inner-div">
                        <h4>No worries! Enter your email down below and we will send a password reset link</h4>                        
                    </div>
                </div>
                <Form onSubmit={forgotPassword}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="mae@nasa.gov" value={email} onChange={updateEmail}/>
                        <Form.Text className="text-muted">
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}


export default ForgotPassword;
