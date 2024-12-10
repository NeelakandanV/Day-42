import BaseApp from "./BaseApp";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



export default function StudViewComp(){
    const [learn,setLearn] = useState([""]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const getData = async()=>{
            try{
                const StuResponse = await axios.get("https://mentor-student-vulz.onrender.com/students")
                setLearn(StuResponse.data.students.filter((ele)=>ele.Roll_No==id))
                toast.success(StuResponse.data.message)
            }
            catch(err){
                toast.error(err.response.data.message)
            }
        }
        if(token){
            getData()
        }else{
            navigate("/")
        }
    },[])

    return(
        <BaseApp PageTitle={`Student Name : ${learn[0].Name}`}>
            <div className="Crebtn">
                <Button onClick={()=>navigate("/students")}><FontAwesomeIcon icon={faUser} />{" "}Back to Students data</Button>
            </div>
            <div className="view-mainCon">
                <div className="view-user">
                    <p>Roll No: {learn[0].Roll_No}</p>
                    <p>Name : {learn[0].Name}</p>
                    <p>Email Id : <a href={`mailto:${learn[0].Email}`}>{learn[0].Email}</a></p>
                    <p>Mobile : {learn[0].Mobile}</p>
                    <p>Course : {learn[0].Course}</p>
                    <p>Mentor : {learn[0].Mentor}</p>
                    <div className="view-stu-btn">
                        <Button onClick={()=>navigate(`/ChangeMentor/${learn[0].Roll_No}`)}><FontAwesomeIcon icon={faChalkboardUser} />{" "}Change Mentor</Button>{' '}
                        <Button onClick={()=>navigate(`/PreviousMentor/${learn[0].Roll_No}`)}><FontAwesomeIcon icon={faChalkboardUser} />{" "}Previous Mentor</Button>
                    </div>
                </div>
            </div>
        </BaseApp>
    );
}