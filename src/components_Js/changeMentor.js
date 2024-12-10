import { useNavigate, useParams } from "react-router-dom";
import BaseApp from "./BaseApp";
import { Appstate } from "../AppContext/AppProvider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from 'react-bootstrap';
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";


const UserSchemaValidation = yup.object({
    Mentor : yup.string().min(1).required("!This field required to change mentor")
})

export default function ChangeMentorComp(){
    const navigate = useNavigate();
    const {id} = useParams();
    const {mentor} = Appstate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
          navigate("/")
        }
      },[])

    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues : {
            Mentor : ""
        },
        validationSchema : UserSchemaValidation,
        onSubmit : (newData) =>{
            updateMentor(newData)
            //console.log(newData)
        }
    });

    const updateMentor = async(newData)=>{
        try{
            const response = await axios.put(`https://mentor-student-vulz.onrender.com/ChangeMentor/${id}`,newData,{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            const data = await response;
            //console.log(data)
            toast.success(data.message)
            navigate("/students")
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }

    return(
        <BaseApp PageTitle="Change Mentor">
            <div className="AssignForm">
                <form className="AssignFormCont" onSubmit={handleSubmit}>
                    <p>Select a mentor to change </p>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-helper-label">Mentors</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="Mentor"
                        value={values.Mentor}
                        label="Mentor"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                            {mentor.map((ele,ind)=>(
                                <MenuItem value={ele.Name} key={ind}>{ele.Name}</MenuItem>
                            ))}
                      </Select>
                      <FormHelperText>Available mentors</FormHelperText>
                    </FormControl>
                    {errors.Mentor && touched.Mentor ? <p style={{color:"crimson"}}>{errors.Mentor}</p>:""}
                    <br/>
                      <Button variant="primary" size="lg" type="submit">Change</Button>{' '}
                      <Button variant="primary" size="lg" onClick={()=>navigate(`/View-Stud/${id}`)}>⬅️Back</Button>
                </form>
            </div>
        </BaseApp>
    );
}