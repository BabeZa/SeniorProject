import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './TQF3PDF';

export default function TQF3Viewer() {
    return (
// const PDFViewer = () => (
        <React.Fragment>
            <PDFViewer width="100%" height="700">
                <MyDocument />
            </PDFViewer>
            
        </React.Fragment>
  
    );
}

// export default TQF3;