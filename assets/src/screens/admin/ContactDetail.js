import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import PrivateResources from "../../components/utils/PrivateRessource";

export default function ContactDetail() {
    const { contactID } = useParams()
    if(isNaN(contactID)) {
        return <Navigate to={"/admin/contact"} />
    }

    const { loading, items: contact, load, error } = PrivateResources(`${window.location.origin}/api/contact/${contactID}`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-palette-four"} to={"/admin/contact"}>Return</Link>

            <div className={"mt-25"}>
                HI ContactDetail
            </div>
        </HeaderAdmin>
    )
}