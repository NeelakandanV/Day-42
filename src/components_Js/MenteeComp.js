import axios from "axios";
import BaseApp from "./BaseApp";
import { useParams } from "react-router-dom";
import { Button,Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MenteeComp(){
    const {id} = useParams();
    let [mentee,setMentee] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        const mentee = async()=>{
            try{
                const response = await axios.get(`https://mentor-student-vulz.onrender.com/mentees/${id}`,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                //console.log(response)
                setMentee(response.data.Mentees);
                toast(response.data.message)
            }
            catch(err){
                toast.error(err.response.data.message)
                //console.log(err)
            }
        }
        if(token){
            mentee()
        }else{
            navigate("/")
        }
    },[])

        // For Pagination

        const [CurrPage,setCurrPage] = useState(1);
        let DataPerPage = 5;
        let TotalPage = Math.ceil(mentee.length/DataPerPage);
        const LastIndex = CurrPage*DataPerPage;
        const FirstIndex = LastIndex-DataPerPage;
        const PageData = mentee.slice(FirstIndex,LastIndex);
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

    return(
        <BaseApp PageTitle= {`Mentees of ${id}`}>
            <div className="StuReadCont">
                <div className="Crebtn">
                    <Button onClick={()=>navigate("/mentors")}>⬅️Back to Mentors</Button>
                </div>
                <div className="StuTableCont">
                    <Table responsive striped bordered hover variant="dark">
                      <thead className="tableHead">
                        <tr>   
                          <th>#</th>
                          <th>Roll No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Course</th>
                        </tr>
                      </thead>
                      <tbody>    
                        {PageData.map((stu,index)=>(
                            <tr key={index}>
                                <td>{FirstIndex + index +1}</td>
                                <td>{stu.Roll_No}</td>
                                <td>{stu.Name}</td>
                                <td>{stu.Email}</td>
                                <td>{stu.Mobile}</td>
                                <td>{stu.Course}</td>
                            </tr>
                        ))}    
                            <tr>
                                <td colSpan={6}><Button  onClick={()=>navigate(`/AssignMentees/${id}`)}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Add Mentee</Button></td>
                            </tr>
                      </tbody>
                    </Table>
                </div>
                <div className="StuPagiCont">
                    <p>Page : {CurrPage} of {TotalPage}</p>
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
                </div>
            </div>
        </BaseApp>
    );
}