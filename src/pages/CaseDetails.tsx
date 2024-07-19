// src/pages/CaseDetails.js
import BackButton from '@/components/BackButton';
import { Header } from '@/components/Header';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CaseDetails() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://bikeindex.org/api/v3/bikes/${id}`)
      .then(response => response.json())
      .then(data => setCaseData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Header />
      <div className="flex items-center justify-between">
        {
          !caseData
            ? (
              <div>Loading...</div>
            )
            : (
              <div className='p-2 flex items-center flex-col'>
                <h1 className='text-2xl font-semibold'>Case Details for {id}</h1>
                <p>{JSON.stringify(caseData, null, 2)}</p>
                <BackButton onClick={() => navigate('/')} />
              </div>
            )
        }
      </div>
    </div>
  );
}

export default CaseDetails;
