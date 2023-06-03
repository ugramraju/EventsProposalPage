import './App.css';
import{BrowserRouter,Routes,Route} from "react-router-dom"
import UserLogin from './components/user/userLogin';
import VenderLogin from './components/vender/venderLogin';
import UserSignUp from './components/user/userSignUp';
import VenderSignup from './components/vender/venderSign';
import Home from './components/Home/Home';
import ProposalsData from './components/proposals/ProposalsData';
import EditProposal from './components/proposals/EditProposal';
import ProposalsForm from './components/proposals/ProposalsForm';
import EventDetails from './components/userProposals/EventDetails';
import Events from './components/userProposals/events';
import DisplayEvent from './components/DisplayEventsDetails/DisplayEvents';
import MainDisplay from './components/DisplayEventsDetails/DisplayLastPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/venderlogin' element={<VenderLogin/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/usersignup' element={<UserSignUp/>}/>
        <Route path='/vendersignup' element={<VenderSignup/>}/>
        <Route path='/proposalsData' element={<ProposalsData/>}/>
        <Route path={`/editProposal/:id`} element={<EditProposal />} />
        <Route path='/proposalsForm' element={<ProposalsForm/>}/>
        <Route path="eventDetails" element={<EventDetails/>}/>
        <Route path='events' element={<Events/>}/>
       <Route path={`/proposals/:id`} element={<DisplayEvent/>} />
       <Route path={`/maindisplay/:id`} element={<MainDisplay/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
