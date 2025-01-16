import { useState } from "react"
import Cookies from "js-cookie";
import  { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Login.css"
function  Login(){
     const [attributes, setAttributes] = useState({email:"",password:""})
     const navigate = useNavigate();
     const updateData=(e)=>{
        setAttributes((prevState)=>(
            {
                ...prevState,
                [e.target.name]:e.target.value
            }
        ))
     }

     const displayPopup =()=>{
        navigate('/forgotpassword')
     }

     const loginUser= async (e)=>{
        e.preventDefault();
        const body = {data:{type: "email_account",attributes: attributes}}
        setAttributes({email:"", password:""})

        try{
            const respose = await fetch("https://classboxv2-291276-ruby.b291276.dev.eastus.az.svc.builder.cafe/bx_block_login/logins", {method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(body)
             }
            );

            const apiRespose = await respose.json();

            if(apiRespose.token!==undefined){
                
                Cookies.set("token", apiRespose.token)
                Cookies.set("userId", apiRespose.account.data.id)
                navigate(`/`, {state:{userId: apiRespose.account.data.id}})
                alert("Login Sucess")   
            }else{
                alert(apiRespose.errors)
            }    

        } catch(error){
            alert(`got error ${error.message}`)
        }        

     }

     return(
        <>
            <div className="main"> 
                <Form onSubmit={loginUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={updateData} name="email" value={attributes.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        <Form.Label>Password</Form.Label>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" onChange={updateData} placeholder="Enter Password" name="password" value={attributes.password}/>
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <br/>
                <Button variant="primary" type="submit" onClick={displayPopup}>Forgot your Password</Button>
            </div>
        </>
     )
    
}

export default Login;