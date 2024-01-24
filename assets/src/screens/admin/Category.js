import React, { useEffect } from "react";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import PrivateRessource from "../../components/utils/PrivateRessource"

export default function Category() {

    const {loading, items: categories, load, error} = PrivateRessource(`${window.location.origin}/api/categories`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                <div className={"d-grid -col-3"}></div>
            </div>
        </HeaderAdmin>
    )
}