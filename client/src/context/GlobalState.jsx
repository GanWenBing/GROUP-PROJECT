import { createContext, useReducer } from "react"
import AppReducer from './AppReducer'
import { useEffect } from "react";

// Initial state 
const initialState = {
    transactions: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export default function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions 
    async function getTransactions() {
        try {
         const res= await fetch("http://localhost:3000/expense/listexpense/:id")
         console.log(res)
    
          dispatch({
            type: 'GET_TRANSACTIONS',
            payload: res.data.data
          });
        } catch (err) {
            res.status(500).json({msg: "error"})
        }
      }

    

    async function deleteTransaction(id) {
        try {
            await fetch(`http://localhost:3000/expense/listexpense/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: _id
            });
        } catch (err) {
            res.status(500).json({msg: "error"})
        }
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            getTransactions,
            deleteTransaction, 
            addTransaction
            
        }}>
            {children}
        </GlobalContext.Provider >);
}