import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constant";
import { addUser } from "../store/slices/userSlice";
import ChangePass from "./ChangePass";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [age, setAge] = useState(user.user.age);
  const [photoUrl, setPhotoUrl] = useState(user.user.photoUrl);
  const [about,setAbout] = useState(user?.user?.about);
  const [gender, setGender] = useState(user.user.gender);
  const [toast, setToast] = useState(false);
  const [popUp, setPopUp] = useState(false);


  const editHandler = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        age,
        photoUrl,
        gender,
        about
      }, { withCredentials: true });
      dispatch(addUser(res.data))
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000)
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    < div className="screen705:flex screen705:flex-row screen705:mx-auto max-w-[850px] justify-between  mt-4 screen350:gap-3">
      <div className="card card-border bg-base-300 screen705:w-96 screen350:mx-auto screen350:max-w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-normal">Firstname:</legend>
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-normal">age:</legend>
            <input type="text" className="input" placeholder="Type here" value={age}
              onChange={(e) => { setAge(e.target.value) }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-normal">photoUrl:</legend>
            <input type="text" className="input" placeholder="Type here" value={photoUrl}
              onChange={(e) => { setPhotoUrl(e.target.value) }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-normal">gender:</legend>
            <input type="text" className="input" placeholder="Type here" value={gender}
              onChange={(e) => { setGender(e.target.value) }}
            />
          </fieldset>
          <textarea className="textarea" placeholder="Bio" value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
          <p className="font-bold text-orange-600 cursor-pointer" onClick={() => setPopUp(true)}>change password</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={editHandler}>Save</button>
          </div>
        </div>
        {popUp && <ChangePass setPopUp={setPopUp} />}
      </div>
      <div className="card bg-base-300  max-w-96 shadow-sm h-full  p-4 screen350:mx-auto screen350:mt-4">
        <figure>
          <img className=' rounded-md w-full'
            src={photoUrl}
            alt="Shoes" />
        </figure>
        <div className="pl-3 mt-2">
          <h2 className="font-bold">{`${firstName} ${lastName}`}</h2>
          <p >age: {age}</p>
          <p >gender: {gender}</p>
          <p>Bio: {about}</p>
        </div>
      </div>
      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>profile update successfully.</span>
        </div>
      </div>}
    </div>
  )
}

export default EditProfile
