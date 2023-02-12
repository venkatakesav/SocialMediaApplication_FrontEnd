import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async() => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/places/users/${userId}`)
        setLoadedPlaces(responseData.places_user)
      }catch(err){
      };
    }; fetchPlaces() 
  }, [sendRequest, userId])

  console.log()

  return <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <div className='center'><LoadingSpinner></LoadingSpinner></div>}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </React.Fragment>;
};

export default UserPlaces;
