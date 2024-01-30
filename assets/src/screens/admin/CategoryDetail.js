import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification"
import CategoryForm from "../../components/forms/CategoryForm";
import PrivateResources from "../../components/utils/PrivateRessource";

export default function CategoryDetail() {
    const { categoryID } = useParams()
    if(isNaN(categoryID)) {
        return <Navigate to={"/admin/category"} />
    }

    const { loading, items: category, load, error } = PrivateResources(`${window.location.origin}/api/category/${categoryID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-palette-four"} to={"/admin/category"}>Return</Link>

            <div className={"mt-25"}>
                {!loading ? (
                    <div className={"card"}>
                        <div className={"-header"}>
                            <label className={"-title"}>Category</label>
                        </div>
                        <div className={"-content"}>
                            <CategoryForm category={category} />
                        </div>
                    </div>
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderAdmin>
    )
}