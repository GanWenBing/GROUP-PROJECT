import { useEffect, useState } from "react";

const Balance = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`http://localhost:3000/expense/listexpense/${id}`)
          .then((response) => response.json())
          .then((data) =>
            setList(data));
      }, []);

    // map over all the amounts and use reduce to add them together
    const amounts = list.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4> Your Balance </h4>
            <h1> ${total} </h1>
        </>
    )
}

export default Balance



// import { GlobalContext } from "../context/GlobalState"
// import { useContext } from "react";

// const Balance = () => {
//     const { transactions } = useContext(GlobalContext);

//     // map over all the amounts and use reduce to add them together
//     const amounts = transactions.map(transaction => transaction.amount)
//     const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

//     return (
//         <>
//             <h4> Your Balance </h4>
//             <h1> ${total} </h1>
//         </>
//     )
// }

// export default Balance

