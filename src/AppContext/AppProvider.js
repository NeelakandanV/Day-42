import axios from "axios";
import { children, createContext, useContext, useEffect, useState } from "react";

let AppContext = createContext("");

const AppProvider=({children})=>{
    const [student,setStudent]=useState([]);
    const [mentor,setMentor]= useState([]);

    useEffect(()=>{
        const getDetails = async()=>{
            try{
                //students
                const StuResponse = await axios.get("https://mentor-student-vulz.onrender.com/students")
                setStudent(StuResponse.data.students)
                if(!StuResponse.data.students){
                    console.log("Unable to fetch students")
                }

                //Mentors
                const MenResponse = await axios.get("https://mentor-student-vulz.onrender.com/mentors")
                setMentor(MenResponse.data.MentorData)
                if(!MenResponse.data){
                    console.log("Unable to fetch Mentors")
                }
            }
            catch(err){
                //console.log(err)
            }
        } 
        getDetails()
    },[])

    return(
        <AppContext.Provider value={{student,setStudent,mentor,setMentor}}>
            {children}
        </AppContext.Provider>
    );
}

export const Appstate = ()=>{
    return useContext(AppContext);
}

export default AppProvider;