import React from 'react';
import './Head.css';

export default function Head(props) {
  return (
    <div className="Head">
        <div className="Head-content" >
        <div >
            <label>{props.title}</label>
        </div>
        <div className="Head-title2">
            <label>{props.title2}</label>
        </div>
        </div>
    </div>
  );
}