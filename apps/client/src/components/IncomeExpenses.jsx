import { useEffect, useState } from "react";

const IncomeExpenses = ({shouldFetch,
    setShouldFetch}) => {
    const [list, setList] = useState([])

    useEffect(() => {
        if (shouldFetch) {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`/api/expenses/listexpense/${id}`)
          .then((response) => response.json())
          .then((data) =>
            setList(data))
            setShouldFetch(false)
      }}, [shouldFetch]);

    const amounts = list.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc,item) => (acc += item),0) * -1) 
        .toFixed(2)

    return (
        <>
            <div className="inc-exp-container">
                <div>
                    <h4>Income</h4>
                    <p className="money plus"> ${income} </p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p className="money minus"> ${expense}</p>
                </div>
            </div>
        </>
    )

}

export default IncomeExpenses
