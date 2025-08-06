import { createPortal } from "react-dom"
import { useDispatch } from "react-redux"
import { closeModel } from "../store/slices/postModelSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useState } from "react";

const CreatePostModel = () => {
    const [content, setConent] = useState("");
    const [postPhoto, setPostPhoto] = useState("");

    const createPost = async () => {
        axios.post(BASE_URL + "/post/create", {
            content,
            postPhoto
        }, { withCredentials: true })
        setConent('')
        setPostPhoto("")
    }

    const dispatch = useDispatch();
    return createPortal(
        <div className="fixed inset-0 mx-auto  bg-black/40  ">
            <div className="card card-border mt-44 bg-base-100 max-w-96 screen400:mx-auto screen350:mx-2 ">
                <span className="ml-auto text-lg cursor-pointer pr-3 hover:text-red-700" onClick={() => {
                    dispatch(closeModel())
                }}>⨯</span>
                <div className="card-body w-full mx-auto ">
                    <textarea className="textarea" placeholder="What do you want to talk about?" value={content} onChange={(e) => {
                        setConent(e.target.value)
                    }}></textarea>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-normal">photoUrl:</legend>
                        <input type="text" className="input" placeholder="Type here" value={postPhoto}
                            onChange={(e) => { setPostPhoto(e.target.value) }}
                        />
                    </fieldset>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={createPost}>Post</button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default CreatePostModel