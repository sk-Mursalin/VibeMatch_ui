import axios from "axios";
import { useState } from "react";
import { createPortal } from "react-dom"
import { BASE_URL } from "../utils/constant";

const ChangePass = ({ setPopUp }) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [toast, setToast] = useState(false);
    const [responseError, setResponseError] = useState("")
    const changePassword = async () => {
        try {
            await axios.patch(BASE_URL + "/profile/passwordedit", {
                oldPassword,
                newPassword
            }, { withCredentials: true })
            setOldPassword("");
            setNewPassword("");
            setToast(true);
            setTimeout(() => {
                setToast(false)
            }, 2000)
        } catch (err) {
            setResponseError(err.response?.data?.message);
        }
    }



    return createPortal(
        <div className="fixed inset-0 mx-auto  bg-black/40  ">
            <div className="card card-border mt-44 bg-base-100 max-w-96 screen400:mx-auto screen350:mx-2 ">
                <span className="ml-auto text-lg cursor-pointer pr-3 hover:text-red-700" onClick={() => { setPopUp(false) }}>⨯</span>
                <div className="card-body w-full mx-auto ">
                    <h2 className="card-title justify-center">password change</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">oldpassword:</legend>
                        <input type="text" name="lastName" className="input" placeholder="Type here" value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">newpassword:</legend>
                        <input type="text" name="lastName" className="input" placeholder="Type here" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
                    </fieldset>
                    <p className="text-red-500">{responseError}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={changePassword}>Save</button>
                    </div>
                </div>
            </div>
            {toast && <div className=" fixed top-20 left-11">
                <div className="alert alert-success">
                    <span> password update successfully</span>
                </div>
            </div>}
        </div>
        ,
        document.getElementById("portal")
    )
}

export default ChangePass