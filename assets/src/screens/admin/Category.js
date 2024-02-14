import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification"
import PrivateRessource from "../../components/utils/PrivateRessource"
import CategoryCard from "../../components/parts/CategoryCard";

export default function Category() {

    const [offset, setOffset] = useState(1)
    const {loading, items: categories, load, error} = PrivateRessource(`${window.location.origin}/api/categories?offset=${offset}`)
    useEffect(() => {
        load()
    }, [offset])

    const handlePagination = (e, newOffset) => {
        e.preventDefault()
        setOffset(newOffset)
    }

    return (
        <HeaderAdmin>
            {!loading ? (
                <>
                    <div className={"d-grid -col-3"}>
                        {Object.keys(categories.results ?? []).length > 0 && Object.values(categories.results).map((item, index) => (
                            <CategoryCard 
                                key={index} 
                                label={item.label} 
                                labelKey={item.labelKey} 
                                subText={`${item.nbrQuestions} questions`} 
                            />
                        ))}
                    </div>

                    {offset > 0 && offset <= categories.maxOffset && categories.maxOffset > 1 && (
                        <div className={"pagination"}>
                            {offset - 1 > 0 && (
                                <button className={"item"} onClick={(e) => handlePagination(e, offset - 1)}>{offset - 1}</button>
                            )}
                            
                            <button className={"item current-page"}>{offset}</button>
                            
                            {offset + 1 <= categories.maxOffset && (
                                <button className={"item"} onClick={(e) => handlePagination(e, offset + 1)}>{offset + 1}</button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
        </HeaderAdmin>
    )
}