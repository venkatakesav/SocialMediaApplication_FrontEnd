import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { InputBase } from '@mui/material';
import Button from '../../shared/components/FormElements/Button';
import './UserPlaces.css';


const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchPlace, setSearchPlace] = useState();
  const [searchTags, setSearchTags] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/users/${userId}`)
        setLoadedPlaces(responseData.places_user)
      } catch (err) {
      };
    }; fetchPlaces()
  }, [sendRequest, userId])

  const searchPlaceHandler = event => {
    setSearchPlace(event.target.value)
    console.log(searchPlace)
  }

  const searchTagsHandler = event => {
    setSearchTags(event.target.value)
    console.log(searchTags)  
  }

  const[finalTags, setFinalTags] = useState();
  const setFinalTags_1 = () => {
    setFinalTags(searchTags.split(','))
    console.log(finalTags)
  }

  // console.log()

  return <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <div className='center'><LoadingSpinner></LoadingSpinner></div>}
    <div><input type="text"
      value={searchPlace} onChange={searchPlaceHandler}
    ></input><Button type="submit">Search Name</Button></div>
    <div><input type="text" onChange={searchTagsHandler}></input><Button type="submit" onClick={setFinalTags_1}>Search Tags!!</Button></div>
    <div className='InLine'><Button inverse>Ascending</Button>
      <Button inverse>Followers</Button>
      <Button inverse>Descending</Button>
      <Button inverse>Creation Date</Button></div>
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} searchVal={searchPlace} searchTags={finalTags}/>}
  </React.Fragment>;
};

export default UserPlaces;
