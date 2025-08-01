import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });
    const [isLogInForm, setIsLogInForm] = useState(true)
    const [err, setErr] = useState()
    const [validationData, setValidationData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const validationConfig = {
        email: [{ require: true, message: "please enter email" }],
        password: [{ require: true, message: "please enter password" }],
        firstName: [{ require: true, message: "please enter firstname" }],
        lastName: [{ require: true, message: "please enter lastname" }],
    }




    const validation = () => {
        const copyValidationData = {};

        if (!formData.email) {
            copyValidationData.email = "please enter email"
        }
        if (!formData.password) {
            copyValidationData.password = "please enter password"
        }
        setValidationData(copyValidationData)
        return copyValidationData;
    }
    const formHandle = (e) => {
        const { name, value } = e.target
        setFormData((prvState) => ({ ...prvState, [name]: value }))
    }

    const loginHandle = async () => {
        const { email, password } = formData
        const data = validation();
        console.log(data);

        if (Object.keys(data).length > 0) return
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
        }
    }

    const signUPHandle = async () => {
        const { email, password, firstName, lastName } = formData

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
                        <input type="text" name="firstName" className="input" placeholder="Type here" value={formData.firstName}
                            onChange={(e) => { formHandle(e) }}
                        />

                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">LastName:</legend>
                        <input type="text" name="lastName" className="input" placeholder="Type here" value={formData.lastName}
                            onChange={(e) => { formHandle(e) }}
                        />
                    </fieldset>
                </>}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-normal">Email:</legend>
                    <input type="text" name="email" className="input" placeholder="Type here" value={formData.email}
                        onChange={(e) => { formHandle(e) }}
                    />
                    <p className="text-red-600">{validationData.email}</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-normal">Password:</legend>
                    <input type="password" name="password" className="input" placeholder="Type here" value={formData.password}
                        onChange={(e) => { formHandle(e) }}
                    />
                    <p className="text-red-600">{validationData.password}</p>
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