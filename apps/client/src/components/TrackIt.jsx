import {useState} from 'react'
import NavBar from "./Navbar";
import Balance from "./Balance"
import "../App.css"
import IncomeExpenses from "./IncomeExpenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import GlobalProvider from "../context/GlobalState"

const TrackIt = () => {
    const [shouldFetch, setShouldFetch] = useState(true)

    return (
        <GlobalProvider>
            <NavBar />
            <div className="body">
                <div className="container">
                    <Balance shouldFetch={shouldFetch} setShouldFetch={setShouldFetch}/>
                    <IncomeExpenses shouldFetch={shouldFetch} setShouldFetch={setShouldFetch}/>
                    <TransactionList shouldFetch={shouldFetch} setShouldFetch={setShouldFetch} />
                    <AddTransaction onAddTransaction={() => setShouldFetch(true)} />
                </div>
            </div>
        </GlobalProvider>
    )
}

export default TrackIt
