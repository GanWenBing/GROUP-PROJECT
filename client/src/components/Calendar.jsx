import NavBar from "./Navbar";

const Calendar = ({visible, onClose}) => {

    if(!visible) return null
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white p-2 rounded">
                <h2> Insert Calendar here </h2>
                <p> Not sure if this page is needed. If there is no planned use for it, can remove </p>
                <button onClick={onClose}>Hello</button>
                </div>
               
            </div>

        </>
    )
}

export default Calendar