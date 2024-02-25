import React from "react";
import GameConfigForm from "../forms/GameConfigForm";

export default function PopupGameConfig({category, handleClose}) {

    if(!category) {
        return null
    }

    return (
        <div className={"popup"}>
            <div className={"popup-widget"}>
                <div className={"popup-header txt-right"}>
                    <button className={"btn btn-transparent -inline-flex"} onClick={(e) => handleClose(e, false, "")}>
                        <img src={`${window.location.origin}/content/svg/closemark-red.svg`} alt={""} />
                    </button>
                </div>
                <div className={"popup-content"}>
                    <GameConfigForm category={category} />
                </div>
            </div>
        </div>
    )
}