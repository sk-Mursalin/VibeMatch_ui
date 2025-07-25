import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLogInForm, setIsLogInForm] = useState(true)
    const [err, setErr] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandle = async () => {
        try {
            const response = await axios.post(
                BASE_URL + "/login",
                {
                    email,
                    password
                },
                { withCredentials: true }
            )
            dispatch(addUser(response.data));
            return navigate('/')
        } catch (err) {
            setErr(err.response.data)
            console.log(err);
        }
    }

    const signUPHandle = async () => {
        try {
            const response = await axios.post(
                BASE_URL + "/signup",
                {
                    email,
                    password,
                    firstName,
                    lastName
                },
                { withCredentials: true }
            )
            dispatch(addUser(response.data));
            return navigate('/profile')
        } catch (err) {
            setErr(err.response.data)
            console.log(err);
        }
    }

    return (
        <div className="card card-border bg-base-300 max-w-96 screen400:mx-auto screen350:mx-2  mt-7 ">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLogInForm ? "Log IN" : "signUp"}</h2>
                {!isLogInForm && <>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">FirstName:</legend>
                        <input type="text" className="input" placeholder="Type here" value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">LastName:</legend>
                        <input type="text" className="input" placeholder="Type here" value={lastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                    </fieldset>
                </>}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-normal">Email:</legend>
                    <input type="text" className="input" placeholder="Type here" value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-normal">Password:</legend>
                    <input type="text" className="input" placeholder="Type here" value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </fieldset>
                <p className="text-red-600">{err}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={isLogInForm ? loginHandle : signUPHandle}>{isLogInForm ? "Log IN" : "signUp"}</button>
                </div>
                <p className="cursor-pointer" onClick={() => { setIsLogInForm(!isLogInForm) }}>{isLogInForm ? "new user? sign up" : "have an account? login"}</p>
            </div>
        </div>
    )
}

export default Login