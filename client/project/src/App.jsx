import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CreateHolidayForm from "./components/CreateHolidayForm";
import Homepage from "./components/Homepage";
import CreateAccount from "./components/CreateAccount";
import Income from "./components/Income";
<<<<<<< HEAD
import IncomeList from "./components/IncomeList";
//import Dashboard from "./components/Dashboard";
import Team from "./components/Team"
import TrackIt from "./components/TrackIt";
=======
import { useState } from "react";
import IncomeList from "./components/IncomeList";
>>>>>>> bce4fda5830c0397e999fc8a1a55a722f6ef5cb7
//import LoginForm from "./components/LoginForm";

function App() {

  //const [userid, setUserid] = useState("hello")
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm /> }/>
      <Route path='/CreateAccount' element={<CreateAccount/>}/>
      <Route path='/Homepage' element={<Homepage />}/>
<<<<<<< HEAD
      {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
      <Route path='/Homepage/Income' element={<Income/>}/>
      <Route path='/Homepage/Incomelist' element={<IncomeList/>}/>
      <Route path='/Team' element={<Team/>} />
      <Route path='/TrackIt' element={<TrackIt/>} />
=======
      <Route path='/Homepage/Income' element={<Income/>}/>
      <Route path='/Homepage/Incomelist' element={<IncomeList/>}/>
>>>>>>> bce4fda5830c0397e999fc8a1a55a722f6ef5cb7
      {/* <Route path="/holidays" element={<p>All Holidays</p>} />
      <Route path="/holidays/new" element={<CreateHolidayForm />} /> */}
    </Routes>
  </BrowserRouter>
    </>
    

  );
}

export default App;