import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constant";
import { addUser } from "../store/slices/userSlice";

const EditProfile = ({user}) => {
  const dispatch = useDispatch();
  console.log(user);
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName)
  const [age, setAge] = useState(user.user.age);
  const [photoUrl, setPhotoUrl] = useState(user.user.photoUrl);
  const [skill, setSkill] = useState(user.user.skill);
  const [gender, setGender] = useState(user.user.gender);


  const editHandler = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        age,
        photoUrl,
        gender
      }, { withCredentials: true });
      console.log(res.data);
      dispatch(addUser(res.data))
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    < div className="flex mx-auto max-w-[850px] justify-between  mt-4">
      <div className="card card-border bg-base-300 w-96">
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
          <p className="text-red-600"></p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={editHandler}>Save</button>
          </div>
        </div>
      </div>
      <div className="card bg-base-300 w-96 shadow-sm ">
        <figure>
          <img className=' rounded-md w-full max-h-72'
            src={photoUrl}
            alt="Shoes" />
        </figure>
        <div className="pl-3 mt-2">
          <h2 className="font-bold">{`${firstName} ${lastName}`}</h2>
          <p >age: {age}</p>
          <p >gender: {gender}</p>
        </div>
      </div>
    </div>
  )
}

export default EditProfile