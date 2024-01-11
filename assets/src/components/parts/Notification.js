import React from "react";

export default function Notification({classname, message}) {
    var icon = ""
    if(classname === "danger") {
        icon = "/content/svg/closemark-red.svg"
    } else if(classname === "warning") {
        icon = "/content/svg/questionmark-yellow.svg"
    } else if(classname === "success") {
        icon = "/content/svg/checkmark-green.svg"
    } else if(classname === "information") {
        icon = "/content/svg/informationmark-gray.svg"
    }

    return (
        <div className={`notification ${classname}`}>
            <div className={"icon"}>
                <img src={`${window.location.origin}${icon}`} alt={"icon"} />
            </div>
            <div className={"message"}>
                <span>{message}</span>
            </div>
        </div>
    )
}