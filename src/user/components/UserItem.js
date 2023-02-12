import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import { useState } from 'react';
import RelationList from './RelationList';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import './UserItem.css';

const DUMMY_RELATIONS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
  },
  {
    id: 'u2',
    name: 'Max Schwarz the 1st',
  },
  {
    id: 'u3',
    name: 'Max Schwarz Junior',
  }
]


const UserItem = props => {
  //Basically within the User Item component
  //We are going to have to links followers
  //and following

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  const openModalFollowers = () => {
    setShowFollowers(true)
  }

  const openModalFollowing = () => {
    setShowFollowing(true)
  }

  const closeModalFollowers = () => {
    setShowFollowers(false)
  }

  const closeModalFollowing = () => {
    setShowFollowing(false)
  }

  return (
    <li className="user-item">
      <Modal show={showFollowers} 
      header="Followers"
      contentClass="place-item__modal-content" 
      footerClass="place-item__modal-actions" 
      footer={<Button onClick={closeModalFollowers}>CLOSE</Button>}>
        <RelationList items={DUMMY_RELATIONS}></RelationList>
      </Modal>
      <Modal show={showFollowing} 
      header="Following"
      contentClass="place-item__modal-content" 
      footerClass="place-item__modal-actions" 
      footer={<Button onClick={closeModalFollowing}>CLOSE</Button>}>
        <RelationList items={DUMMY_RELATIONS}></RelationList>
      </Modal>
      <Card>
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
        <Button default onClick={openModalFollowers}>Followers</Button>
        <Button default onClick={openModalFollowing}>Following</Button>
      </Card>
    </li>
  );
};

export default UserItem;
