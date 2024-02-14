import React from "react";
import PopupGameConfig from "../parts/PopupGameConfig";

export default function CategoryCard({label, labelKey, subText}) {

    const handleGameConfig = (e, category_key) => {
        e.preventDefault()
        
        return (
            <PopupGameConfig category={category_key} />
        )
    }

    return (
        <div className={"category-card"} onClick={(e) => handleGameConfig(e, labelKey)}>
            <div className={"-content"}>
                <label className={"-title"}>{label}</label>
                <span className={"-subtitle"}>{subText}</span>
            </div>
        </div>
    )
}