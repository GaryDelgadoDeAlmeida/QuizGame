import React, { useEffect } from "react";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import UserForm from "../../components/forms/UserForm";
import Notification from "../../components/parts/Notification";
import PrivateResources from "../../components/utils/PrivateRessource";

export default function Profile() {

    const { loading, item: user, load, error } = PrivateResources(`${window.location.origin}/api/user/me`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            {!loading ? (
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Account</label>
                    </div>
                    <div className={"-content"}>
                        <UserForm user={user} />
                    </div>
                </div>
            ) : (
                <Notification classname={"information"} message={"Loading . . ."} />
            )}
        </HeaderAdmin>
    )
}