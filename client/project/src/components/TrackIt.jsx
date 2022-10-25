import NavBar from "./Navbar";
import Balance from "./Balance"
import "../App.css"
import IncomeExpenses from "./IncomeExpenses"
import TransactionList from "./TransactionList";

const TrackIt = () => {
    return (
        <>
            <NavBar />
            <div className="body">
                <div className="container">
                    <Balance />
                    <IncomeExpenses />
                    <TransactionList />
                </div>
            </div>


        </>
            )
        }
        
        
        
export default TrackIt