import React from 'react';
import Head from '../../components/Head';
import './Contact.css'

import { useTranslation } from 'react-i18next';

export default function Contact() {

    const { t } = useTranslation();
    
return (
    <>
        <Head title={t('contact.title')}/>
        
    
    </>
)
}
