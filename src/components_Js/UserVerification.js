import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function UserVerification(){
    const navigate = useNavigate();
    const {id,pin,token} = useParams();

    useEffect(()=>{
        const check = async()=>{
            try{
                const response = await axios.get(`https://mentor-student-vulz.onrender.com/Verification/${id}/${pin}/${token}`,{
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
                    navigate("/")
            }
        }
        check();
    },[])

    return(
      <div className="loginMainPar"> 
          <h1>Do not refresh...We will automatically redirect you once verified.....</h1>
      </div> 
    );
}