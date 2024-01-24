import React from "react";

export default function GameConfig({category}) {

    if(!category) {
        return null
    }

    return (
        <div className={"game-config"}></div>
    )
}