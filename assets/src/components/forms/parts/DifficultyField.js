import React from "react";

export default function DifficultyField({difficulty, handleChange}) {

    const difficulties = [
        {
            value: "",
            text: "Select a difficulty"
        },
        {
            value: "easy",
            text: "Easy"
        },
        {
            value: "medium",
            text: "Medium"
        },
        {
            value: "hard",
            text: "Hard"
        }
    ]

    return (
        <div className={"form-field"}>
            <select onChange={(e) => handleChange(e, "difficulty")} required>
                {difficulties.map((item, index) => (
                    <option 
                        key={index}
                        value={item.value} 
                        defaultChecked={difficulty == item.value ? true : false}
                    >{item.text}</option>
                ))}
            </select>
        </div>
    )
}