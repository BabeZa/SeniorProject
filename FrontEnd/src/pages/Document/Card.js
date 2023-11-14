import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

function Card(props) {
  const { t } = useTranslation();
  const newdate = moment(props.date).format("DD/MM/YYYY");
  const history = useHistory();
  return (
    // console.log("[Card.js] "+props.name+" : "+props.date+" -> "+newdate ),
    <>
      <div className='cards-item card-hover1' onClick={() => history.push('/document'+props.path+'/detail/'+props.id)}>
            <div className='cards-item-title' style={{backgroundColor: props.color}}>
                <h2>{props.name}</h2>
            </div>
            <div className='cards-item-info'>
                <p className='cards-item-text'>{t('document.card.by')} : {props.by}</p>
                <p className='cards-item-text'>{t('document.card.date')} : {newdate}</p>
            </div>
            {/* <button className='cards-item-button'>เพิ่มเติม</button> */}
            {/* <Link className='cards-item-button' to={'/document'+props.path+'/detail/'+props.id}>{t('document.card.more')}</Link> */}
      </div>
    </>
  );
}

export default Card;