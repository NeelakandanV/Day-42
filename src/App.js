import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './Styles_css/LoginPage.css'
import './Styles_css/Dashboard.css'
import './Styles_css/StudRead.css'
import './Styles_css/StudCreate.css'
import './Styles_css/MenCreate.css'
import './Styles_css/MenRead.css'
import './Styles_css/AssignMentee.css'
import './Styles_css/StudView.css'
import { Routes,Route } from 'react-router-dom';
import BaseApp from './components_Js/BaseApp';
import Login from './components_Js/LoginPage'
import Dashboard from './components_Js/Dashboard';
import NoPage from './components_Js/NoPage';
import StudRead from './components_Js/StudRead';
import MenRead from './components_Js/MenRead';
import StudCreate from './components_Js/StudCreate';
import MenCreate from './components_Js/MenCreate';
import MenteeComp from './components_Js/MenteeComp';
import AssignMentee from './components_Js/AssignMentee';
import StudViewComp from './components_Js/StudView';
import MentorViewComp from './components_Js/MentorView';
import ChangeMentorComp from './components_Js/changeMentor';
import PrevMentorComp from './components_Js/PrevMentor';
import Register from './components_Js/RegisterPage';
import ForgotPassword from './components_Js/ForgotPassword';
import ResetPassword from './components_Js/ResetPassword';
import VerifyAccount from './components_Js/VerifyAccount';
import UserVerification from './components_Js/UserVerification';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      <Route path='/ResetPassword/:id/:pin/:token' element={<ResetPassword/>}/>
      <Route path="/VerifyAccount" element={<VerifyAccount/>}/>
      <Route path='/Verification/:id/:pin/:token' element={<UserVerification/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/students" element={<StudRead/>}/>
      <Route path="/mentors" element={<MenRead/>}/>
      <Route path="/CreateStudent" element={<StudCreate/>}/>
      <Route path="/CreateMentor" element={<MenCreate/>}/>
      <Route path="/mentees/:id" element={<MenteeComp/>}/>
      <Route path="/AssignMentees/:id" element={<AssignMentee/>}/>
      <Route path="/View-Stud/:id" element={<StudViewComp/>}/>
      <Route path="/View-Mentor/:id" element={<MentorViewComp/>}/>
      <Route path="/ChangeMentor/:id" element={<ChangeMentorComp/>}/>
      <Route path="/PreviousMentor/:id" element={<PrevMentorComp/>}/>
      <Route path="*" element={<NoPage/>}/>
    </Routes>
  );
}

export default App;
