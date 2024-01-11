import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import UserForm from "../../components/forms/UserForm";
import PrivateResources from "../../components/utils/PrivateRessource";
import Notification from "../../components/parts/Notification";

export default function UserEdit() {
    const { userID } = useParams()
    if(isNaN(userID)) {
        return <Navigate to={"/admin/user"} />
    }

    const { loading, items: user, load, error } = PrivateResources(`${window.location.origin}/api/user/${userID}`)
    
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/user"}>Return</Link>

            <div className={"mt-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>User</label>
                    </div>
                    <div className={"-content"}>
                        {!loading ? (
                            Object.keys(user).length > 0 ? (
                                <UserForm user={user} />
                            ) : (
                                <Notification classname={"danger"} message={"An error occured"} />
                            )
                        ) : (
                            <Notification classname={"information"} message={"Loading ..."} />
                        )}
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}