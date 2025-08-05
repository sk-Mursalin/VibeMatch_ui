import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const ProfilePopUp = ({ setProfilePopUp, profileId }) => {

    const connections = useSelector((state) => state.friend);


    const account = connections.data.find((account) => account._id == profileId);
    const { firstName, lastName, gender, photoUrl, age, about } = account

    return createPortal (
        <div className="fixed inset-0 mx-auto  bg-black/40  ">
            <div className="card card-border mt-44 bg-base-100 max-w-96 screen400:mx-auto screen350:mx-2 ">
                <span className="ml-auto text-lg cursor-pointer pr-3 hover:text-red-700" onClick={() => { setProfilePopUp(false) }}>⨯</span>
                <div className="card-body w-full mx-auto ">
                    <div className="avatar flex justify-center">
                        <div className="w-24 rounded-full">
                            <img src={photoUrl} />
                        </div>
                    </div>
                    <div className=" flex flex-col items-center">
                        <h2 className="text-lg font-bold">{`${firstName} ${lastName}`}</h2>
                        <p className="font-semibold">Gender: {gender}</p>
                        <p className="font-semibold">Age: {age}</p>
                        <p className="font-semibold">Bio: {about}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default ProfilePopUp