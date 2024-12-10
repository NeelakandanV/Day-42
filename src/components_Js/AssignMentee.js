import { useNavigate, useParams } from "react-router-dom";
import BaseApp from "./BaseApp";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import { toast } from "react-toastify";


const UserSchemaValidation = yup.object({
    Mentees : yup.array().of(yup.string()).min(1,"Kindly select atleast 1 student").required("!Kindly select mentees to assign with")
})

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

export default function AssignMentee(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [menStud,setMenStud] = useState([]);
    const token = localStorage.getItem('token')

    let StudData = menStud;
    let StudDataArr = [];

    useEffect(()=>{
      const getData = async()=>{
        try{
            const response = await axios.get("https://mentor-student-vulz.onrender.com/AssignMentees",{
              headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }
            })
            // console.log(response.data.data[1]["Students without mentors"])
            setMenStud(response.data.data[1]["Students without mentors"])
            toast(response.data.message)
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

    for(let i of StudData){
        StudDataArr.push({"Roll_No" : i.Roll_No,"Name" :i.Name})
    }
    

    const{values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues :{
            Mentees :[]
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(newData)=>{
            AddMentee(newData);
            //console.log(newData)
        }
    });

    const AddMentee = async(newData)=>{
        try{
            const response = await axios.put(`https://mentor-student-vulz.onrender.com/AssignMentees/${id}`,newData,{
                headers :{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            //console.log(data)
            toast.success(response.data.message)
            navigate(`/mentees/${id}`)
        }
        catch(err){
            toast.info(err.response.data.message)
        }
    }

    return(
        <BaseApp PageTitle={`Assign Mentees to ${id}`}>
            <div className="Crebtn">
                <Button variant="contained" onClick={()=>navigate("/mentors")}>⬅️Back to Mentors</Button>
            </div>
            <div className="AssignForm">
                <form className="AssignFormCont" onSubmit={handleSubmit}>
                  <p>Select mentees to assign with</p>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Mentees</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        name = "Mentees"
                        value={values.Mentees}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {StudDataArr.map((name) => (
                          <MenuItem key={name.Roll_No} value={name.Roll_No}>
                            <Checkbox checked={values.Mentees.indexOf(name.Roll_No) > -1} />
                            <ListItemText primary={`${name.Name}(${name.Roll_No})`} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.Mentees && touched.Mentees ? <p style={{color:"crimson"}}>{errors.Mentees}</p>:""}
                    <div className="AssignBtnCont">
                      <Button className="AssignBtn" variant="contained" size="medium" type="submit">Assign</Button>
                    </div>
                </form>
            </div>
        </BaseApp>
    );
}