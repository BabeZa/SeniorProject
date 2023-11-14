import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

function UploadCard(props) {
  const { t } = useTranslation();
  const newdate = moment(props.date).format("DD/MM/YYYY");;
  return (
    // console.log("[Card.js] "+props.name+" : "+props.date+" -> "+newdate ),
    <>
      <a className='cards-item card-hover1 none-a' target='_blank' href={props.dataID}>
            <div className='cards-item-title' style={{backgroundColor: props.color}}>
                <h2>{props.name}</h2>
            </div>
            <div className='cards-item-info'>
                <p className='cards-item-text'>{t('document.card.by')} : {props.by}</p>
                <p className='cards-item-text'>{t('document.card.date')} : {newdate}</p>
            </div>
            {/* <button className='cards-item-button'>เพิ่มเติม</button> */}
            {/* <a className='cards-item-button' target='_blank' href={props.dataID}>{t('document.card.more')}</a> */}
      </a>
    </>
  );
}

export default UploadCard;