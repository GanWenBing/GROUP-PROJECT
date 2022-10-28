import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import CreateAccount from "./components/CreateAccount";
import Income from "./components/Income";
import IncomeList from "./components/IncomeList";
//import Dashboard from "./components/Dashboard";
import Team from "./components/Team"
import TrackIt from "./components/TrackIt";
import Settings from "./components/Settings"

function App() {

  //const [userid, setUserid] = useState("hello")
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm /> }/>
      <Route path='/CreateAccount' element={<CreateAccount/>}/>
      <Route path='/Homepage' element={<Homepage />}/>
      {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
      <Route path='/Homepage/Income' element={<Income/>}/>
      <Route path='/Homepage/Incomelist' element={<IncomeList/>}/>
      <Route path='/Team' element={<Team/>} />
      <Route path='/TrackIt' element={<TrackIt/>} />
      <Route path='/Settings' element={<Settings/>} />

    </Routes>
  </BrowserRouter>
    </>
    

  );
}

export default App;