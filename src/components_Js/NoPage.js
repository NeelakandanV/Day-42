import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";


export default function NoPage(){
    const navigate = useNavigate();
    return(
        <div className="NoPage">
            <img src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"/>
            <p><b>⬅️Back to Home</b></p>
            <Button onClick={()=>navigate("/")}><FontAwesomeIcon icon={faSchool} />{" "}Login</Button>
        </div>
    );
}