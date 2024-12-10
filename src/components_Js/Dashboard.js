import { useEffect } from "react";
import BaseApp from "./BaseApp";
import { useNavigate } from "react-router-dom";


export default function Dashboard(){
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
          navigate("/")
        }
      },[])


    return(
        <BaseApp PageTitle="Dashboard">
            <div className="HomeParent">
                <div className="TeacherCont">
                    <p><b>Mentors</b></p>
                    <img src="https://static.vecteezy.com/system/resources/previews/005/519/978/original/cartoon-drawing-of-a-teacher-vector.jpg"/><br/>
                    <a href="/mentors">Click for Mentor➡️</a>
                </div>
                <div className="StudentCont">
                    <p><b>Students</b></p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFSmbcfAeLiZVw1HsUkOXe6aBARNwZQqhNg&usqp=CAU"/><br/>
                    <a href="/Students">Click for Student➡️</a>
                </div>
            </div>
        </BaseApp>
    );
}