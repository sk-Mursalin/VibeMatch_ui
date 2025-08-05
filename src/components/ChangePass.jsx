import { createPortal } from "react-dom"

const ChangePass = ({ setPopUp }) => {
    return createPortal(
        <div className="fixed inset-0 mx-auto top-40  ">
            <div className="card card-border bg-base-100 max-w-96 screen400:mx-auto screen350:mx-2 ">
                <span className="ml-auto text-lg cursor-pointer pr-3 hover:text-red-700" onClick={() => { setPopUp(false) }}>⨯</span>
                <div className="card-body w-full mx-auto ">
                    <h2 className="card-title justify-center">password change</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">oldpassword:</legend>
                        <input type="text" name="lastName" className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">newpassword:</legend>
                        <input type="text" name="lastName" className="input" placeholder="Type here" />
                    </fieldset>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    )
}

export default ChangePass