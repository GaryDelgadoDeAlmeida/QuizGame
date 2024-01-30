import React, { useEffect, useState } from "react";
import HeaderUser from "../../components/parts/HeaderUser";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";

export default function Game() {

    const [offset, setOffset] = useState(1)
    const {loading, items: categories, load, error} = PrivateRessource(`${window.location.origin}/api/categories?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handlePagination = (e, newOffset) => {
        e.preventDefault()
        setOffset(newOffset)
    }

    const handleGameConfig = (e, category_key) => {
        e.preventDefault()
        
        return (
            <GameConfig category={category_key} />
        )
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                {!loading ? (
                    Object.keys(categories.data ?? []).length > 0 ? (
                        <>
                            <div className={"d-grid -col-3 -t-col-2 -m-col-1"}>
                                {Object.values(categories.data).map((category, index) => (
                                    <div key={index} className={"category-card"} onClick={(e) => handleGameConfig(e, category.labelKey)}>
                                        <div className={"-content"}>
                                            <label className={"-title"}>{category.label}</label>
                                            <span className={"-subtitle"}>Nbr questions</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {offset > 0 && offset <= categories.maxOffset && categories.maxOffset > 1 && (
                                <div className={"pagination"}>
                                    {offset - 1 > 0 && (
                                        <>
                                            <button className={"item"} onClick={(e) => handlePagination(e, 1)}>&laquo;</button>
                                            <button className={"item"} onClick={(e) => handlePagination(e, offset - 1)}>{offset - 1}</button>
                                        </>
                                    )}

                                    <button className={"item current-page"}>{offset}</button>
                                    
                                    {offset + 1 <= categories.maxOffset && (
                                        <>
                                            <button className={"item"} onClick={(e) => handlePagination(e, offset + 1)}>{offset + 1}</button>
                                            <button className={"item"} onClick={(e) => handlePagination(e, categories.maxOffset)}>&raquo;</button>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <Notification classname={"warning"} message={"Il n'y a aucune catégorie de quiz pour commercer à jouer. Veuillez en informer l'administrateur"} />
                    )
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderUser>
    )
}