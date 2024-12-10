import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate();
 const check = async(name,email,password)=>{
  try{
    const response = await axios.post(`https://mentor-student-vulz.onrender.com/Register`,{"Name":name,"Email":email,"Password":password},{
        headers : {
            "Content-Type" : "application/json"
        }
    })
    const data = await response.data;
    //console.log(data.token)
    toast.success(data.message)
    navigate("/")
    }
    catch(err){
        toast.error(err.response.data.message)
    }
  }

    return(
      <div className="loginMainPar"> 
         <div className="formCon">
          <h2>ICY Mentor-Student Management Portal</h2>
             <h3>Signup here!!</h3>
             <Form>
             <label><b>Enter your Name</b></label>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="text" placeholder="Enter Your Name" value={name}
                   onChange={(e)=>setName(e.target.value)} />
                 </Form.Group>
              <label><b>Enter your Email</b></label>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="text" placeholder="Enter Email" value={email}
                   onChange={(e)=>setEmail(e.target.value)} />
                 </Form.Group>
              <label><b>Enter your password</b></label>
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Control type="password" placeholder="Enter Password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} />
                 </Form.Group>
               <div className="d-grid gap-2">
                   <Button variant="primary"  size="md" onClick={()=>check(name,email,password)}>
                     Register
                   </Button>
                   <hr></hr>
                   <a href="/ForgotPassword">Forgot Password?</a>
                   <a href="/">Login Now!!</a>
                   <a href="/VerifyAccount">Verify Your Account!</a>
                 </div>
             </Form>
         </div>
      </div> 
    );
}