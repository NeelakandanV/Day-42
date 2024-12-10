import BaseApp from "./BaseApp";
import { Button,Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function StudRead(){
    const navigate = useNavigate();
    const [learner,setLearner] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(()=>{
        const getData = async()=>{
            try{
                const StuResponse = await axios.get("https://mentor-student-vulz.onrender.com/students",{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                setLearner(StuResponse.data.students)
                // console.log(StuResponse.data)
                toast.success(StuResponse.data.message)
            }
            catch(err){
                toast.error(err.response.data.message)
            }
        }
        if(token){
            getData();
        }
        else{
            navigate("/")
        }
    },[])

    
    // For delete a student
    const delData = async(Stu_Id)=>{
        try{
            const response = await axios.delete(`https://mentor-student-vulz.onrender.com/DeleteStudent/${Stu_Id}`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            //console.log(response);
            toast.success(response.data.message)
            const data = learner.filter((std)=>std.Roll_No!=Stu_Id)
            setLearner(data)
        }
        catch(err){
            toast.error(err.response.data.message)
        }
    }

        // For Pagination

        const [CurrPage,setCurrPage] = useState(1);
        let DataPerPage = 5;
        let TotalPage = Math.ceil(learner.length/DataPerPage);
        const LastIndex = CurrPage*DataPerPage;
        const FirstIndex = LastIndex-DataPerPage;
        const PageData = learner.slice(FirstIndex,LastIndex);
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
        <BaseApp PageTitle="Students Data">
            <div className="StuReadCont">
                <div className="StuTableCont">
                    <Table responsive striped bordered hover variant="dark">
                      <thead className="tableHead">
                        <tr>   
                          <th>#</th>
                          <th>Roll No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Mentor</th>
                          <th>Course</th>
                          <th></th>
                          <th></th>
                          <th></th>
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
                                <td>{stu.Mentor}</td>
                                <td>{stu.Course}</td>
                                <td><Button  className="view-btn" variant="outline-info" onClick={()=>navigate(`/View-Stud/${stu.Roll_No}`)}>View</Button></td>
                                <td><Button className="edit-btn" variant="primary"  disabled>Edit</Button></td>
                                <td><Button onClick={()=>{delData(stu.Roll_No)}} className="delete-btn" variant="outline-danger">Delete</Button></td>
                            </tr>
                        ))}    
                            <tr>
                                <td colSpan={10}><Button  onClick={()=>navigate("/CreateStudent")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button></td>
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