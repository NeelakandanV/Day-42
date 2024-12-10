import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function VerifyAccount(){
  const [email,setEmail] = useState('')

  const navigate = useNavigate();
 const check = async(email)=>{
  try{
    const response = await axios.put(`https://mentor-student-vulz.onrender.com/VerifyLink`,{"Email":email},{
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
             <h3>Verify your Password??</h3>
             <p><b>Verify your account from the management to get access to Modifying changes in our portal.</b></p>
             <Form>
              <label><b>Enter your Email</b></label>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="text" placeholder="Enter Email" value={email}
                   onChange={(e)=>setEmail(e.target.value)} />
                 </Form.Group>
               <div className="d-grid gap-2">
                   <Button variant="primary"  size="md" onClick={()=>check(email)}>
                     Send Verification Link
                   </Button>
                   <hr></hr>
                   <a href="/">Already Verified ? Login </a>
                   <a href="/Register">Create an Account!!</a>
                 </div>
             </Form>
         </div>
      </div> 
    );
}