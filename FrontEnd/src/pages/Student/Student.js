import React from 'react';
import Head from '../../components/Head';

import { useTranslation } from 'react-i18next';


export default function Student() {

    const { t } = useTranslation();
    
return (
    <>
        <Head title={t('student.title')}/>
    
    </>
)
}
