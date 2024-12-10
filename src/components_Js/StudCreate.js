import BaseApp from "./BaseApp";
import * as yup from "yup";
import { Appstate } from "../AppContext/AppProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect } from "react";


const UserSchemaValidation = yup.object({
    Name : yup.string().required("!Kindly provide your name"),
    Mobile : yup.number().required("Enter mobile number").positive().min(1).max(9999999999,"Indian Mobile Numbers only allowed"),
    Email : yup.string().email().required("!Enter valid Email"),
    Course : yup.string().required("Please select one course"),
    Mentor : yup.string()
});

export default function StudCreate(){

    const {student,setStudent} = Appstate();
    const {mentor} = Appstate();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
          navigate("/")
        }
      },[])

    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues : {
            Name :"",
            Mobile :"",
            Email :"",
            Course :"",
            Mentor:""
        },
        validationSchema : UserSchemaValidation,
        onSubmit : (newData)=>{
            CreateNew(newData)
            //console.log(newData)
        }
    });

    const CreateNew = async(newData)=>{
        try{
            const response = axios.post("https://mentor-student-vulz.onrender.com/CreateStudent",newData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            const data = await response
            //console.log(data)
            setStudent([...student,newData])
            navigate("/students")
            toast.success(data.message)
        }
        catch(err){
            // console.log(err) 
            toast.error(err.response.data.message)
        }
    }

    return(
        <BaseApp PageTitle="Create a Student">
            <div className="Crebtn">
                <Button onClick={()=>navigate("/students")}>⬅️Back to Students data</Button>
            </div>
            <div className="CreateForm">
                <form className="FormCont" onSubmit={handleSubmit}>
                    <TextField fullWidth margin="normal" 
                    id = "outlined-helperText"
                    label = "Name"
                    helperText = "Enter Your Name"
                    name = "Name"
                    value = {values.Name}
                    onChange = {handleChange}
                    onBlur = {handleBlur} /><br/>
                    {errors.Name && touched.Name ? <p style={{color:"crimson"}}>{errors.Name}</p>:""}

                    <TextField fullWidth margin="normal" 
                    id = "outlined-helperText"
                    label = "Mobile Number"
                    helperText = "Enter Your Mobile Number"
                    name = "Mobile"
                    value = {values.Mobile}
                    onChange = {handleChange}
                    onBlur = {handleBlur} /><br/>
                    {errors.Mobile && touched.Mobile ? <p style={{color:"crimson"}}>{errors.Mobile}</p>:""}

                    <TextField fullWidth margin="normal" 
                    id = "outlined-helperText"
                    label = "Email Id"
                    helperText = "Enter Your Email Id"
                    name = "Email"
                    value = {values.Email}
                    onChange = {handleChange}
                    onBlur = {handleBlur} /><br/>
                    {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}

                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-helper-label">Course</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name = "Course"
                          value={values.Course}
                          label="Couse Name"
                          onChange={handleChange}
                          onBlur = {handleBlur}
                        >
                            <MenuItem value={"MERN Fullstack Development"}>MERN Fullstack Development</MenuItem>
                            <MenuItem value={"Data Science"}>Data Science</MenuItem>
                        </Select>
                       <FormHelperText>Select your Course</FormHelperText>
                    </FormControl>
                    {errors.Course && touched.Course ? <p style={{color:"crimson"}}>{errors.Course}</p>:""}
                    <br/>

                    <FormControl sx={{ m: 1, minWidth: 150}}>
                        <InputLabel id="demo-simple-select-helper-label">Mentor Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name = "Mentor"
                          value={values.Mentor}
                          label="Mentor Name"
                          onChange={handleChange}
                          onBlur = {handleBlur}
                        >
                            <MenuItem value="">
                                None
                            </MenuItem>
                            {mentor.map((ele,ind)=>(
                                <MenuItem value={ele.Name} key={ind}>{ele.Name}</MenuItem>
                            ))}
                        </Select>
                       <FormHelperText>Select Mentor</FormHelperText>
                    </FormControl>
                    {errors.Mentor && touched.Mentor ? <p style={{color:"crimson"}}>{errors.Mentor}</p>:""}

                    <br/>
                    <div className="StuCrtBtn">
                    <Button type="submit" className="StuCrt"><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button> 
                    </div>
                </form>
            </div>
        </BaseApp>
    );
}