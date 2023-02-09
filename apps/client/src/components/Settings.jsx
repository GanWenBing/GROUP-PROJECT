import NavBar from "./Navbar";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate()
    // const [shouldFetch, setShouldFetch] = useState(true)
    //const [update, setUpdate] = useState(true)
    const [profile, setProfile] = useState({})
    //const [shouldFetch, setShouldFetch] = useState(true)
    const [error, setError] = useState()


    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`/api/users/user/${id}`)
            .then((response) => response.json())
            .then((data) => {

                setProfile(data)
            })
    }, []);




    const handleSave = (e) => {
        e.preventDefault();
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id

        const { Username, Password, ConfirmPassword, Email } = profile;


        if (Password !== ConfirmPassword) {

            return setError("Password did not match")
        }
        else {
            fetch(`/api/users/update/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        Username,
                        Password,
                        ConfirmPassword,
                        Email
                    }
                )
            })
                .then((response) => {

                    if (response.ok) {

                        navigate('/')
                    } else {

                    }
                    return response.json()
                })
                .then((data) => {

                    setError(data.error)
                });
        }

    }


    const setdata = (e) => {

        const { name, value } = e.target
        setProfile((preval) => {
            return {
                ...preval,
                [name]: value,
            }
        })
    }


    return (
        <>
            <NavBar />
            <div className="min-h-screen py-10">
                <div className="container mx-auto">
                    <div className=" lg:flex-row w-full lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div className="">
                            <h2 className="text-3xl mb-4">Edit User</h2>
                            <form onSubmit={handleSave}>

                                <div className="mt-5">
                                    <label>
                                        Username:
                                        </label>
                                    <input name="Username" placeholder={profile.Username} value={profile.Username} onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>

                                </div>

                                <div className="mt-5">
                                    <label>
                                        New Password: </label>
                                    <input name="Password" type="password" onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>
                                <div className="mt-5">
                                    <label>
                                        Confirm New Password: </label>
                                    <input name="ConfirmPassword" type="password" onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>

                                <div className="mt-5">
                                    <label>
                                        Email Address:
                                        </label>
                                    <input name="Email" placeholder={profile.Email} value={profile.Email} onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>


                                <div className="mt-5">
                                    <button className="w-full bg-purple-500 py-3 text-center text-white">Update</button>
                                </div>
                            </form>
                            <div className="mt-5 text-center text-red-600">
                                {error}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings