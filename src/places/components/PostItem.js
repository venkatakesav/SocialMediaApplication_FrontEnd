import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "../../shared/components/FormElements/Button"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import {useContext} from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import Modal from "../../shared/components/UIElements/Modal"
import "./PlaceItem.css"
import Card from "../../shared/components/UIElements/Card"

function PostItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext)
  const [showConfirm, showUpdateConfirm] = useState(false);

  const showDeleteWarningHandler = () => {
    showUpdateConfirm(true);
  }

  const CancelDeleteWarningHandler = () => {
    showUpdateConfirm(false);
  }

  const confirmDeleteHandler = async () => {
    console.log("DELETING.......");
    try {
      await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE', null, {})
    } catch (err) {
      console.log("Error")
    }
  }

  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal show={showConfirm} onCancel={CancelDeleteWarningHandler} header="Are You Sure" footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={CancelDeleteWarningHandler}>Cancel</Button>
              <Button danger onClick={confirmDeleteHandler}>Delete</Button>
            </React.Fragment>
          }>
          <h2>Are you sure, you want to Delete?</h2>
        </Modal>
        <li className="place-item">
          <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <div className="place-item__image">
              <img src = "https://media.istockphoto.com/id/1136409408/photo/close-up-view-of-a-common-octopus.jpg?s=612x612&w=0&k=20&c=PHlT9mhvOOhDf8mMmgOO-FkAf3EbpjpQtZiVFllH5P0=" alt={props.title} />
            </div>
            <div className="place-item__info">
              <h2>{props.title}</h2>
              <h3>{props.description}</h3>
              {/* <h3>Tags: {props.tags}</h3>
              <h3>Banned Words: {props.bannedKeyWords}</h3>
              <h3>Creation Time: {props.creationTime}</h3>
              <p>{props.description}</p> */}
            </div>
            <div className="place-item__actions">
              {auth.userId != props.creatorId && auth.isLoggedIn && <Button>JOIN</Button>}
              {auth.userId == props.creatorId && auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
              {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
            </div>
          </Card>
        </li>
      </React.Fragment>
    // <p>Hello World</p>
  )
}
export default PostItem