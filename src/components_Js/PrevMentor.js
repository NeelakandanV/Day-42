import { useNavigate, useParams } from "react-router-dom";
import { Appstate } from "../AppContext/AppProvider";
import BaseApp from "./BaseApp";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


export default function PrevMentorComp(){

    const {student} = Appstate();
    const navigate = useNavigate();
    const {id} = useParams();
    const viewData = student.filter((stu)=>id==stu.Roll_No);
    const Us = viewData[0];

    const [prevMenData,setPrevMenData] = useState([]);

    useEffect(()=>{
            const getPrevMentor = async()=>{
                try{
                    toast.info("Kindly wait for Sometime!!")
                    const response = await axios.get(`https://mentor-student-vulz.onrender.com/PreviousMentor/${id}`)
                    //console.log(response.data)
                    setPrevMenData(response.data["Old_Mentor_Data"])
                    //console.log(prevMenData)
                    toast.success("!Previous Mentor fetch successful")
                }
                catch(err){
                    //console.log(err)
                    toast.error("!Previous Mentor not available");
                }
            };
    getPrevMentor();
    },[])

    return(
        <BaseApp PageTitle= {`Previous Mentor of ${Us.Name}`}>
            <div className="view-mainCon">
                <div className="view-user">
                    <Card border="primary" bg="dark" text="white" style={{ width: '18rem' }}>
                        <Card.Header className="BookTitle">Employee Id : {prevMenData.Mentor_No}</Card.Header>
                        <Card.Body>
                          <Card.Title>Mentor Name : {prevMenData.Name} </Card.Title>
                          <Card.Text>Mobile :{prevMenData.Mobile} </Card.Text>
                          <Card.Text>Email : {prevMenData.Email}</Card.Text>
                          <Card.Text>Job Role : {prevMenData.Role}</Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Button variant="primary" size="lg" onClick={()=>navigate(`/View-Stud/${id}`)}><FontAwesomeIcon icon={faUser} />{" "}{`Back to ${Us.Name}`}</Button>
                </div>   
            </div>
        </BaseApp>
    );
}