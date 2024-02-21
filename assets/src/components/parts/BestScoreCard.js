import React from "react";

export default function BestScoreCard({position, username, score}) {

    let 
        classname, 
        imgTag
    ;

    if(position == 1) {
        classname = "-first"
        imgTag = `<img src="${window.location.origin}/content/svg/medal-gold-winner.svg" alt="" />`
    } else if(position == 2) {
        classname = "-second"
        imgTag = `<img src="${window.location.origin}/content/svg/medal-silver-badge.svg" alt="" />`
    } else if(position == 3) {
        classname = "-third"
        imgTag = `<img src="${window.location.origin}/content/svg/medal-bronze-prize.svg" alt="" />`
    } else {
        classname = "-others"
        imgTag = `<span className="-classment">${position}</span>`
    }

    return (
        <div className={`best-score-card ${classname}`}>
            <div className={"m-tb-auto"}>{imgTag}</div>
            <div className={"m-tb-auto"}>
                <span>{username}</span>
            </div>
            <div className={"m-tb-auto"}>
                <span>{score} points</span>
            </div>
        </div>
    )
}