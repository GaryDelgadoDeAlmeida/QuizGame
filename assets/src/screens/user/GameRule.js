import React from "react";

export default function GameRules() {

    return (
        <div className={"game-rule"}>
            <div className={"-left"}>
                <h1>Games Rules</h1>
            </div>
            <div className={"-right"}>
                <div className={"rule-card"}>
                    <div className={"-content"}>
                        <h2 className={"-title"}>Rule title 1</h2>
                        <p></p>
                    </div>
                </div>
                <div className={"rule-card"}>
                    <div className={"-content"}>
                        <h2 className={"-title"}>Rule title 2</h2>
                        <p></p>
                    </div>
                </div>
                <div className={"rule-card"}>
                    <div className={"-content"}>
                        <h2 className={"-title"}>Rule title 3</h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}