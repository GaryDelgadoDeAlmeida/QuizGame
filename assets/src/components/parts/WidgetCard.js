import React from "react";

export default function WidgetCard({number, category}) {

    return (
        <div className={"widget-card"}>
            <div className={"-content"}>
                <span>{number}</span>
                <span>{category}</span>
            </div>
        </div>
    )
}