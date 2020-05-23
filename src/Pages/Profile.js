import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { callProfileApi } from '../Functions/User';
import Message from '../Components/Message';
function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const [errors, setErrors] = useState("");
    useEffect(() => {
        const getProfileData = async () => {
            const [profile, apiError] = await callProfileApi(id);
            setProfile(profile);
            setErrors(apiError);
        }
        getProfileData();
    }, [id])
    return (
        <div className="register">
            <h1>User Profile</h1>
            <div className="container">
                {errors && <Message type="danger" message={errors} />}
                {profile && <div className="details">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Label</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">{profile.username}</th>
                            </tr>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">{profile.email}</th>
                            </tr>
                            <tr>
                                <th scope="col">Contact</th>
                                <th scope="col">{profile.contact}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default Profile
