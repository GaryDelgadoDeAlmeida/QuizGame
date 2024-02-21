import React, { useCallback, useRef, useState } from "react";
import axios from "axios";

/**
 * This will be used to fetch the private resources from the protected route of the API and display it to the users.
 */
export default function ProtectedRessource(route) {
    const [loading, setLoading] = useState(false)
    let 
        items = useRef({}),
        error = useRef({})
    ;
    
    const load = useCallback(async () => {
        setLoading(true)

        await axios
            .get(route, {
                headers: {
                    "Content-Type": "application/json",
                    "Credentials": "same-origin",
                }
            })
            .then((response) => {
                items.current = response.data
            })
            .catch((err) => {
                error.current = err
            })
        ;

        setLoading(false)
    }, [route])

    return {
        loading, 
        items: items.current, 
        load, 
        error: error.current
    }
}