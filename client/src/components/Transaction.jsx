import { GlobalContext } from "../context/GlobalState"
import { useContext } from "react";


const Transaction = ({ transaction }) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const { deleteTransaction } = useContext(GlobalContext);

    return (
        <>
            <li className={transaction.amount < 0 ? "minus" : "plus"}>
                {transaction.text}
                <span> {sign} ${Math.abs(transaction.amount)} </span>
                <button 
                    className="delete-btn"
                    onClick= {() => deleteTransaction(transaction._id)}>x</button>
            </li>
        </>
    )
}

export default Transaction
