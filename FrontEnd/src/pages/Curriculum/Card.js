import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card(props) {
  return (
    <>
      <a className='c-cards-item card-hover1 none-a' target='_blank' href={props.link}>
        <div className="c-cards-head">
          <h2>{props.name}</h2>
        </div>
        <div className="c-cards-content">
          <h1>{props.type}</h1>
        </div>
          
        {/* <a className='cards-item-button' target='_blank' href={props.link}>เพิ่มเติม</a> */}
      </a>
    </>
  );
}

export default Card;