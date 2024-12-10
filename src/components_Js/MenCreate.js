import BaseApp from "./BaseApp";
import * as yup from "yup";
import { Appstate } from "../AppContext/AppProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect } from "react";


const UserSchemaValidation = yup.object({
    Name : yup.string().required("!Kindly provide your name"),
    Mobile : yup.number().required("Enter mobile number").positive().min(1).max(9999999999,"Indian Mobile Numbers only allowed"),
    Email : yup.string().email().required("!Enter valid Email"),
    Role : yup.string().required("Enter your Role (e.g-Fullstack Developer)"),
    Tech_Skills : yup.array().of(yup.string()).min(3,"Kindly Provide atleast 3 technical skills").required("!Kindly select your skills")
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
    "Html5","Java","Springboot","serverlets","Docker","Node js","Express js","Mongodb","Python",
   "PowerBi","Azure","PHP","AWS","Machine learning","Deep Learning","AI and IOT","Css3","Javascript",
   "Bootstrap","React js","AI Automation","C","Django","C++","Angular js","Typescript"
];

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


export default function MenCreate(){
    const {mentor,setMentor} = Appstate();
    const navigate = useNavigate();
    const theme = useTheme();
    const personName = [];
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
            Role :"",
            Tech_Skills:[]
        },
        validationSchema : UserSchemaValidation,
        onSubmit : (newData)=>{
            CreateNew(newData)
            //console.log(newData)
        }
    });

    const CreateNew = async(newData)=>{
        try{
            const response = axios.post("https://mentor-student-vulz.onrender.com/CreateMentor",newData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            const data = await response
            //console.log(data)
            setMentor([...mentor,newData])
            navigate("/mentors")
            toast.success(data.message)
        }
        catch(err){
            //console.log(err) 
            toast.error(err.response.data.message)
        }
    }

    return(
        <BaseApp PageTitle="Create a Mentor">
            <div className="Crebtn">
                <Button onClick={()=>navigate("/mentors")}>⬅️Back to Mentors</Button>
            </div>
            <div className="CreateMenForm">
                <form className="MenFormCont" onSubmit={handleSubmit}>
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

                    <TextField fullWidth margin="normal" 
                    id = "outlined-helperText"
                    label = "Role"
                    helperText = "Enter Your Job Role"
                    name = "Role"
                    value = {values.Role}
                    onChange = {handleChange}
                    onBlur = {handleBlur} /><br/>
                    {errors.Role && touched.Role ? <p style={{color:"crimson"}}>{errors.Role}</p>:""}

                    <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-chip-label">Technical Skills</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          name = "Tech_Skills"
                          value={values.Tech_Skills}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {skills.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name,personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                    {errors.Tech_Skills && touched.Tech_Skills ? <p style={{color:"crimson"}}>{errors.Tech_Skills}</p>:""}
                    <br/>
                    <div className="MenCrtBtn">
                    <Button type="submit" className="MenCrt"><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button> 
                    </div>
                </form>
            </div>
        </BaseApp>
    );
}