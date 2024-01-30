import React, { useEffect } from "react";
import PrivateRessource from "../../utils/PrivateRessource";

export default function CategoriesField({category = null, handleChange}) {

    const { loading, items: categories, load, error } = PrivateRessource(`${window.location.origin}/api/categories?fields=all`)
    useEffect(() => {
        load()
    }, [])

    return (
        <div className={"form-field"}>
            {!loading && Object.keys(categories.results ?? []).length > 0 && (
                <select onChange={(e) => handleChange(e, "category")} required>
                    <option value={""}>Select a category</option>
                    
                    {Object.values(categories.results).map((item, index) => (
                        <option 
                            key={index} 
                            value={item.labelKey} 
                            defaultChecked={category && category.labelKey == item.labelKey ? true : false}
                        >{item.label}</option>
                    ))}
                </select>
            )}
        </div>
    )
}