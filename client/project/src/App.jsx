import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard"
import Team from "./components/Team"
import Calendar from "./components/Calendar";
import Settings from "./components/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/CreateAccount' element={<CreateAccount />} />
          <Route path='/Homepage' element={<Homepage />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Team' element={<Team />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/Settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;