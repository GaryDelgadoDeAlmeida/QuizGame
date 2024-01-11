import React from "react";

export default function Badge({text}) {
    let badgeClass = "", badgeText = ""
    if(text == "WAIT") {
        badgeClass = "badge-information"
        badgeText = "Waiting"
    } else if(text == "ONGOING") {
        badgeClass = "badge-warning"
        badgeText = "Ongoing"
    } else if(text == "TERMINATED") {
        badgeClass = "badge-success"
        badgeText = "Terminated"
    } else if(text == "CANCELLED") {
        badgeClass = "badge-danger"
        badgeText = "Cancelled"
    }

    return (
        <span className={`badge ${badgeClass}`}>{badgeText}</span>
    )
}