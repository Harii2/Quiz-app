import './App.css'; 
import {Route,Routes} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup'; 
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import AddQuestion from './components/AddQuestion';
import WriteExam from './components/WriteExam';
import Exam from './components/WriteExam/ExamPortal';
import Profile from './components/profile';

function App() {
  return (
    <Routes>
       <Route exact path='/' element={<Login/>}/>
       <Route exact path='/sign-up' element={<SignUp/>}/>
       <Route exact path='/home' element = {<Home/>}/>
       <Route exact path='/dash-board' element={<DashBoard/>}/>
       <Route exact path='/add-question' element={<AddQuestion/>}/> 
       <Route exact path='/write-exam' element={<WriteExam/>}/> 
       <Route exact path='/write-exam/exam' element={<Exam/>}/>
       <Route exact path='/profile' element={<Profile/>}/>
    </Routes>

  );
}

export default App;
