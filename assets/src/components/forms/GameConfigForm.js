import React, { useEffect, useState } from "react";
import PrivateResources from "../utils/PrivateRessource";
import Notification from "../parts/Notification";
import { useNavigate } from "react-router-dom";

export default function GameConfigForm({category}) {
    const datas = {
        questionQuantity: [
            10,
            15,
            20,
            25,
            30
        ],
        modes: [
            {
                value: "standard",
                text: "Standard"
            },
            {
                value: "challenge",
                text: "Challenge"
            }
        ],
        difficulties: [
            "all",
            "easy", 
            "medium",
            "hard"
        ]
    }

    const navigation = useNavigate()
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/categories?fields=all`)
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        nbr_questions: 10,
        mode: "standard",
        difficulty: "all",
        category: category
    })

    useEffect(() => {
        load()

        return () => {}
    }, [])

    const handleChange = (e, fieldName) => {
        setFormResponse({})

        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isNaN(credentials.nbr_questions)) {
            setFormResponse({classname: "danger", message: "Le nombre de question n'est pas un nombre"})
            return
        }

        if(credentials.nbr_questions < 10) {
            setFormResponse({classname: "danger", message: "Le nombre de question doit être supérieur ou égale à 10 questions"})
            return
        }

        if(credentials.mode.length == 0) {
            setFormResponse({classname: "danger", message: "Veuillez sélectionner un mode de jeu"})
            return
        }

        if(credentials.category.length == 0) {
            setFormResponse({classname: "danger", message: "Veuillez sélectionner une categorie"})
            return
        }

        if(credentials.mode.length == 0) {
            setFormResponse({classname: "danger", message: "Veuillez sélectionner le mode du jeu"})
            return
        }

        navigation("/user/game/start", {
            state: {
                ...credentials
            }
        })
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <label htmlFor={"nbr-questions"}>Number of questions</label>
                    <select id={"nbr-questions"} onChange={(e) => handleChange(e, "nbr_questions")}>
                        <option value={""} defaultChecked>Select a number of question</option>
                        {datas.questionQuantity.map((item, index) => (
                            <option key={index} value={item} selected={item == credentials.nbr_questions ? true : false}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className={"form-field"}>
                    <label htmlFor={"mode"}>Mode</label>
                    <select id={"mode"} onChange={(e) => handleChange(e, "mode")}>
                        <option value={""} defaultChecked>Select a mode for the quiz game</option>
                        {datas.modes.map((item, index) => (
                            <option key={index} value={item.value} selected={item.value == credentials.mode ? true : false}>{item.text}</option>
                        ))}
                    </select>
                </div>
                <div className={"form-field"}>
                    <label htmlFor={"difficulty"}>Difficulty</label>
                    <select id={"difficulty"} onChange={(e) => handleChange(e, "difficulty")}>
                        <option value={""} defaultChecked>Select a difficulty for the quiz game</option>
                        {datas.difficulties.map((item, index) => (
                            <option key={index} value={item} selected={item == credentials.difficulty ? true : false}>{item}</option>
                        ))}
                    </select>
                </div>
                {!loading && Object.keys(items).length > 0 ? (
                    <div className={"form-field"}>
                        <label htmlFor={"category"}>Category</label>
                        <select id={"category"} onChange={(e) => handleChange(e, "category")}>
                            <option value={""} defaultChecked={true}>Select a category</option>
                            {Object.values(items.results ?? []).map((item, index) => (
                                <option key={index} value={item.label_key} selected={item.label_key == credentials.category ? true : false}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <p>Loading ...</p>
                )}
                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-palette-four"}>Submit</button>
                </div>
            </form>
        </>
    )
}