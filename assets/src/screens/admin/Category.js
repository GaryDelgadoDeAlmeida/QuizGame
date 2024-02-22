import React, { useEffect, useState } from "react";
import Pagination from "../../components/parts/Pagination";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification"
import CategoryCard from "../../components/parts/CategoryCard";
import PrivateRessource from "../../components/utils/PrivateRessource"

export default function Category() {

    const [offset, setOffset] = useState(1)
    const {loading, items: categories, load, error} = PrivateRessource(`${window.location.origin}/api/categories?offset=${offset}`)
    useEffect(() => {
        load()
    }, [offset])

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
                                path={`/admin/category/${item.id}`}
                            />
                        ))}
                    </div>

                    <Pagination 
                        offset={offset}
                        maxOffset={categories.maxOffset}
                        setOffset={setOffset}
                    />
                </>
            ) : (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
        </HeaderAdmin>
    )
}