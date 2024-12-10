import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function ResetPassword(){
  const [password,setPassword] = useState('')
  const [conPassword,setConPassword] = useState("")

  const {id,pin,token} = useParams();
  const navigate = useNavigate();
 const check = async(password,conPassword)=>{
  try{
        if(password==conPassword){
            const response = await axios.put(`https://mentor-student-vulz.onrender.com/ResetPassword/${id}/${pin}/${token}`,{"Password":password},{
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            const data = await response.data;
            //console.log(data.token)
            toast.success(data.message)
            navigate("/")
        }
        else{
            toast.error("Confirm Password not matched!")
        }
    }
    catch(err){
        toast.error(err.response.data.message)
    }
  }

    return(
      <div className="loginMainPar"> 
         <div className="formCon">
          <h2>ICY Mentor-Student Management Portal</h2>
             <h3>Reset your Password here!!</h3>
             <Form>
              <label><b>Enter your Password</b></label>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="text" placeholder="Enter your Password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} />
                 </Form.Group>
              <label><b>Confirm your Password</b></label>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="text" placeholder="Confirm your Password" value={conPassword}
                   onChange={(e)=>setConPassword(e.target.value)} />
                 </Form.Group>
               <div className="d-grid gap-2">
                   <Button variant="primary"  size="md" onClick={()=>check(password,conPassword)}>
                     Reset Password
                   </Button>
                   <hr></hr>
                   <a href="/">Remember Password ? Login </a>
                 </div>
             </Form>
         </div>
      </div> 
    );
}