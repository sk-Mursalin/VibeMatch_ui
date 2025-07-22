import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginHandle = async () => {
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
    }



    return (
        <div className="card card-border bg-base-300 w-96 mx-auto mt-7">
            <div className="card-body">
                <h2 className="card-title justify-center">Log IN</h2>
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
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={loginHandle}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Login