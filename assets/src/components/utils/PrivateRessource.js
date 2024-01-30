import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * This will be used to fetch the private resources from the protected route of the API and display it to the users.
 */
export default function PrivateResources(route) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let 
        items = useRef({}),
        error = useRef({})
    ;

    let user = JSON.parse(localStorage.getItem("user"))
    
    const load = useCallback(async () => {
        setLoading(true)

        await axios
            .get(route, {
                headers: {
                    "Content-Type": "application/json",
                    "Credentials": "same-origin",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {
                items.current = response.data
            })
            .catch((err) => {
                error.current = err
            })
        ;

        if(Object.keys(error.current).length > 0 && error.current.response.status == 401) {
            console.log(
                error.current,
                error.current.response
            )
            localStorage.setItem("user", "")
            alert(error.current.response.data.message)
            navigate(user.role == "ROLE_ADMIN" ? "/admin-login" : "/login")
            return
        }

        setLoading(false)
    }, [route])

    return {loading, items: items.current, load, error: error.current}
}