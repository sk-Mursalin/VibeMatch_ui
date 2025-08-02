import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { validationConfig } from "../utils/validation";


const Login = () => {
    const [signupFormData, setSignupFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });
    const [loginFormData, setLoginFromData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : { email: "", password: "" };
  });
    const [isLogInForm, setIsLogInForm] = useState(true)
    const [err, setErr] = useState()
    const [validationData, setValidationData] = useState({});
    const [logValidationData, setlogValidationData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(loginFormData));
    }, [loginFormData]);


    const validation = () => {
        const copyValidationData = {};

        Object.entries(isLogInForm ? loginFormData : signupFormData).forEach(([key, value]) => {
            validationConfig[key].some((rule) => {
                if (!value && rule.require) {
                    copyValidationData[key] = rule.message
                    return true
                }
                if (rule.minLength && value.length < rule.minLength) {
                    copyValidationData[key] = rule.message
                    return true
                }
                if (rule.pattern && !rule.pattern.test(value)) {
                    copyValidationData[key] = rule.message
                    return true
                }
            })
        })

        isLogInForm ? setlogValidationData(copyValidationData) : setValidationData(copyValidationData)
        return copyValidationData;
    }

    const formHandle = (e) => {
        const { name, value } = e.target
        isLogInForm ? setLoginFromData((prvState) => ({ ...prvState, [name]: value })) : setSignupFormData((prvState) => ({ ...prvState, [name]: value }))
    }

    const loginHandle = async () => {
        const { email, password } = loginFormData
        const data = validation();
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
            console.log(err.response.data);
        }
    }

    const signUPHandle = async () => {
        const { email, password, firstName, lastName } = signupFormData
        const data = validation();
        if (Object.keys(data).length > 0) return

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
        }
    }

    return (
        <div className="card card-border bg-base-300 max-w-96 screen400:mx-auto screen350:mx-2  mt-7 ">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLogInForm ? "Log IN" : "signUp"}</h2>
                {!isLogInForm && <>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">FirstName:</legend>
                        <input type="text" name="firstName" className="input" placeholder="Type here" value={setSignupFormData.firstName}
                            onChange={(e) => { formHandle(e) }}
                        />
                        <p className="text-red-600">{validationData.firstName}</p>

                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">LastName:</legend>
                        <input type="text" name="lastName" className="input" placeholder="Type here" value={setSignupFormData.lastName}
                            onChange={(e) => { formHandle(e) }}
                        />
                        <p className="text-red-600">{validationData.lastName}</p>

                    </fieldset>
                </>}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-normal">Email:</legend>
                    <input type="text" name="email" className="input" placeholder="Type here" value={isLogInForm ? loginFormData.email : signupFormData.email}
                        onChange={(e) => { formHandle(e) }}
                    />
                    <p className="text-red-600">{isLogInForm ? logValidationData.email : validationData.email}</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-normal">Password:</legend>
                    <input type="password" name="password" className="input" placeholder="Type here" value={isLogInForm ? loginFormData.password : signupFormData.password}
                        onChange={(e) => { formHandle(e) }}
                    />
                    <p className="text-red-600">{isLogInForm ? logValidationData.password : validationData.password}</p>
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