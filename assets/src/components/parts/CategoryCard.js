import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupGameConfig from "../parts/PopupGameConfig";

export default function CategoryCard({label, labelKey, subText, path = ""}) {

    const navigate = useNavigate()
    const [modal, setModal] = useState({
        showModal: false,
        category_key: ""
    })

    const handleNaviate = (path) => {
        navigate(path)
    }

    const handleModal = (show, category) => {
        setModal({
            showModal: show,
            category_key: category
        })
    }

    return (
        <>
            {modal.showModal && (
                <PopupGameConfig 
                    category={modal.category_key} 
                    handleClose={handleModal}
                />
            )}

            <div className={"category-card"} onClick={() => path.length > 0 ? handleNaviate(path) : handleModal(true, labelKey)}>
                <div className={"-content"}>
                    <label className={"-title"}>{label}</label>
                    <span className={"-subtitle"}>{subText}</span>
                </div>
            </div>
        </>
    )
}