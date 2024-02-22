import React from "react";
import CategoryCard from "./CategoryCard";
import Notification from "./Notification";

export default function PastGameCategory({playedCategories = []}) {

    return (
        <div className={"category-list"}>
            {playedCategories.length > 0 ? (
                playedCategories.map((item, index) => (
                    <div key={index} className={"category-card"}>
                        <div className={"-content"}>
                            <label className={"-title"}>{item.category.label}</label>
                            <span className={"-subtitle"}>{item.nbrGames}</span>
                        </div>
                    </div>
                ))
            ) : (
                <Notification classname={"information"} message={"You have played no category game for now"} />
            )}
        </div>
    )
}