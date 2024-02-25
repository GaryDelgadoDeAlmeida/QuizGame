import React, { useEffect, useState } from "react";
import HeaderUser from "../../components/parts/HeaderUser";
import Pagination from "../../components/parts/Pagination";
import Notification from "../../components/parts/Notification";
import CategoryCard from "../../components/parts/CategoryCard";
import PrivateRessource from "../../components/utils/PrivateRessource";

export default function Game() {

    const [offset, setOffset] = useState(1)
    const {loading, items: categories, load, error} = PrivateRessource(`${window.location.origin}/api/categories?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderUser>
            <div className={"page-section"}>
                {!loading ? (
                    Object.keys(categories.results ?? []).length > 0 ? (
                        <>
                            <div className={"d-grid -col-3 -t-col-2 -m-col-1"}>
                                {Object.values(categories.results ?? []).map((category, index) => (
                                    <CategoryCard 
                                        key={index} 
                                        label={category.label}
                                        labelKey={category.label_key}
                                        subText={category.nbrQuestions + " questions"}
                                    />
                                ))}
                            </div>

                            <Pagination 
                                offset={offset}
                                setOffset={setOffset}
                                maxOffset={categories.maxOffset}
                            />
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