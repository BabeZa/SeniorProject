import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import UserPhoto from '../../assert/image/user.png'
import { useHistory } from 'react-router-dom';

function Card(props) {
  const history = useHistory();
  return (
    <>
      <div className='p-cards-item card-hover1' onClick={() => history.push('/personnel/detail/'+props.id)}>
        <div className="p-cards-photo-crop">
          {/* <img src={props.photo} className="p-cards-photo"/> */}
          <img src={props.photo === null ? UserPhoto : props.photo} className="p-cards-photo"/>
        </div>
          <h2>{props.name}</h2>
          {/* <Link className='p-cards-item-button' to={'/personnel/detail/'+props.id}>เพิ่มเติม</Link> */}
      </div>
    </>
  );
}

export default Card;