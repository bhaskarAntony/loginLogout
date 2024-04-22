import React, { useState } from 'react'
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';


function Scanner() {
        const [result, setResult] = useState('');
        const navigate = useNavigate();
      
        const handleScan = (data) => {
          if (data) {
            setResult(data);
            navigate({ pathname: '/waiting', state: 'hello' });
          }
        };
      
        const handleError = (error) => {
          console.error(error);
        };
  return (
    <div>
          <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default Scanner