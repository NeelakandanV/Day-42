import BaseApp from "./BaseApp";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faChildren } from "@fortawesome/free-solid-svg-icons";
import { Appstate } from "../AppContext/AppProvider";
import { useNavigate, useParams } from "react-router-dom";


export default function MentorViewComp(){
    const {mentor} = Appstate();
    const navigate = useNavigate();
    const {id} = useParams();
    const viewData = mentor.filter((staff)=>id==staff.Mentor_No);
    const Bk = viewData[0];
    const skills = Bk.Tech_Skills;

    return(
        <BaseApp PageTitle={`Mentor Name : ${Bk.Name}`}>
            <div className="view-mainCon">
                <div className="view-user">
                    <p>Mentor No : {Bk.Mentor_No}</p>
                    <p>Name : {Bk.Name}</p>
                    <p>Mobile : {Bk.Mobile}</p>
                    <p>Email Id : <a href={`mailto:${Bk.Email}`}>{Bk.Email}</a></p>
                    <p>Job Role : {Bk.Role}</p>
                    <p>Technical Skills : {skills.map((ele,ind)=><label key={ind}>{ele},{" "}</label>)}</p>
                    <div className="view-stu-btn">
                        <Button onClick={()=>navigate(`/mentees/${Bk.Name}`)}><FontAwesomeIcon icon={faChildren} />{" "}Mentees Data</Button>{' '}
                        <Button onClick={()=>navigate("/mentors")}><FontAwesomeIcon icon={faBook} />{" "}Mentor Data</Button>
                    </div>
                </div>
            </div>
        </BaseApp>
    );
}