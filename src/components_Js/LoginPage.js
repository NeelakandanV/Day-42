import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login(){
  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate();

  function check(){
    if(login==="Admin" && password==="Admin@123"){
      toast.success("Login Success!!")
      navigate("/Dashboard")
    }else{
      toast.error("Incorrect username or Password")
    }
  }

    return(
      <div className="loginMainPar"> 
         <div className="formCon">
          <h2>ICY Mentor-Student Management Portal</h2>
             <h3>Welcome Back!!</h3>
             <Form>
              <label><b>Enter your username</b></label>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="text" placeholder="Enter Username" value={login}
                   onChange={(e)=>setLogin(e.target.value)} />
                 </Form.Group>
              <label><b>Enter your password</b></label>
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Control type="password" placeholder="Password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
                   <Form.Check type="checkbox" label="Remember me" />
                 </Form.Group>
               <div className="d-grid gap-2">
                   <Button variant="primary"  size="md" onClick={()=>check()}>
                     LOGIN
                   </Button>
                   <hr></hr>
               <Button variant="danger" size="md">
                   <FontAwesomeIcon icon={faGoogle} style={{color: "#245a94",}}/>
                     Login With Google
                   </Button>
                   <Button variant="info" size="md">
                   <FontAwesomeIcon icon={faFacebook} style={{color: "#1e7bc2",}}/>
                     Login With Facebook
                   </Button>
                   <hr></hr>
                   <a href="/">Forgot Password?</a>
                   <a href="/">Create an Account!!</a>
                 </div>
             </Form>
         </div>
      </div> 
    );
}