import { useEffect, useState } from "react";

const Balance = ({
    shouldFetch,
    setShouldFetch
}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        if (shouldFetch) {
            const userinfo = JSON.parse(localStorage.getItem("userInfo"))
            const id = userinfo.id
            fetch(`http://localhost:3000/expense/listexpense/${id}`)
                .then((response) => response.json())
                .then((data) =>
                    setList(data));
            setShouldFetch(false);

        }

    }, [shouldFetch]);

    // map over all the amounts and use reduce to add them together
    const amounts = list.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4 className="text-lg font-medium"> Your Balance </h4>
            <h1 className="text-lg font-medium"> ${total} </h1>
        </>
    )
}

export default Balance