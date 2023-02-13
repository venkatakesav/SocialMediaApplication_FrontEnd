import React from "react"
import PostList from "../components/PostList"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import {useContext} from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import "./UserPlaces.css"

function Posts() {
    const place_id = useParams().placeId
    const [loadedPosts, setLoadedPosts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext)

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/posts/${auth.userId}/${place_id}`)
                setLoadedPosts(responseData.posts)
            } catch (err) {
            };
        }; fetchPlaces()
    }, [sendRequest, place_id])

    {console.log(loadedPosts)}

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <div className='center'><LoadingSpinner></LoadingSpinner></div>}
        {!isLoading && loadedPosts && <PostList items={loadedPosts} user__id={auth.userId} place__id={place_id}/>}
        {console.log(`http://localhost:5000/api/posts/${auth.userId}/${place_id}`)}
    </React.Fragment>;
}
export default Posts