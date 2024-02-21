import React from "react";
import PopupGameConfig from "../parts/PopupGameConfig";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({label, labelKey, subText, path = ""}) {

    const navigate = useNavigate()

    const handleGameConfig = (e, category_key) => {
        e.preventDefault()
        
        return (
            <PopupGameConfig category={category_key} />
        )
    }

    const handleNaviate = (path) => {
        navigate(path)
    }

    return (
        <div className={"category-card"} onClick={(e) => path.length > 0 ? handleNaviate(path) : handleGameConfig(e, labelKey)}>
            <div className={"-content"}>
                <label className={"-title"}>{label}</label>
                <span className={"-subtitle"}>{subText}</span>
            </div>
        </div>
    )
}