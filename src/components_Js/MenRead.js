import BaseApp from "./BaseApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";



export default function MenRead(){
    const navigate = useNavigate();
    const [teacher,setTeacher] =useState([]);
    const token = localStorage.getItem('token')

    useEffect(()=>{
        const getData = async()=>{
            try{
                const MenResponse = await axios.get("https://mentor-student-vulz.onrender.com/mentors",{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                // console.log(MenResponse.data)
                setTeacher(MenResponse.data.MentorData)
                toast.success(MenResponse.data.message)
            }
            catch(err){
                toast.error(err.response.data.message)
            }
        }
        if(token){
            getData()
        }
        else{
            navigate("/")
        }
    },[])

        // For delete a Mentor
        const delData = async(Men_Id)=>{
            try{
                const response = await axios.delete(`https://mentor-student-vulz.onrender.com/DeleteMentor/${Men_Id}`,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                //console.log(response);
                toast.success(response.data.message)
                const data = teacher.filter((std)=>std.Mentor_No!=Men_Id)
                setTeacher(data)
            }
            catch(err){
                toast.error(err.response.data.message)
            }
        }
   
    // For Pagination

    const [CurrPage,setCurrPage] = useState(1);
    let DataPerPage = 6;
    let TotalPage = Math.ceil(teacher.length/DataPerPage);
    const LastIndex = CurrPage*DataPerPage;
    const FirstIndex = LastIndex-DataPerPage;
    const PageData = teacher.slice(FirstIndex,LastIndex);
    const PageNumbers = [...Array(TotalPage+1).keys()].slice(1);


    const PrevPage = ()=>{
        if(CurrPage!==1){
            setCurrPage(CurrPage-1);
        }
    }
    
    const NextPage = ()=>{
        if(CurrPage !== TotalPage){
            setCurrPage(CurrPage+1);
        }
    }
    
    const PageNav = (PageNo)=>{
        setCurrPage(PageNo)
    }


  return (
        <BaseApp PageTitle="Mentors Data">
            <div className="StuReadCont">
                <div className="Crebtn">
                <Button size="lg" onClick={()=>navigate("/CreateMentor")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button>
                </div>
                <div className="TeachCont">
                    {PageData.map((Teac,Ind)=>(
                        <div className="TeachBoxCont" key={Ind}>
                            <h4>Name : {Teac.Name}</h4>
                            <p>Employee Id : {Teac.Mentor_No}</p>
                            <p>Role : {Teac.Role}</p>
                            <p>Mobile : {Teac.Mobile}</p>
                            <a href={`mailto:${Teac.Email}`}>Email : {Teac.Email}</a><br/>
                            <div className="MenteeCont">
                                <Button onClick={()=>navigate(`/mentees/${Teac.Name}`)}>Click for Mentees data</Button>
                                <Button onClick={()=>navigate(`/AssignMentees/${Teac.Name}`)}>Click to Assign Mentees</Button>
                            </div>
                            <div className="btn-Cont">
                                <Button onClick={()=>navigate(`/View-Mentor/${Teac.Mentor_No}`)} variant="outline-info" size="lg">View</Button>
                                <Button  variant="primary" size="lg" disabled>Edit</Button>
                                <Button onClick={()=>{delData(Teac.Mentor_No)}} variant="outline-danger" size="lg">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="StuPagiCont">
                    <nav className="Pagination">
                        <a href="#" onClick={PrevPage}>Prev</a>
                        {PageNumbers.map((num,ind)=>(
                            <a href="#" key={ind}
                            onClick ={()=>PageNav(num)}
                            >
                                {num}
                            </a>
                        ))}
                        <a href="#" onClick={NextPage}> Next</a>
                    </nav>
                    <p>Page : {CurrPage} of {TotalPage}</p>
                </div>
            </div>
        </BaseApp>
    );
}