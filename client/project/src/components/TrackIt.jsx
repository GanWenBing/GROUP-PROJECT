import NavBar from "./Navbar";
import Balance from "./Balance"
import "../App.css"
import IncomeExpenses from "./IncomeExpenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import GlobalProvider from "../context/GlobalState"

const TrackIt = () => {
    return (
        <GlobalProvider>
            <NavBar />
            <div className="body">
                <div className="container">
                    <Balance />
                    <IncomeExpenses />
                    <TransactionList />
                    <AddTransaction />
                </div>
            </div>


        </GlobalProvider>
    )
}



export default TrackIt