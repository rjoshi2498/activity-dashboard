import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import Error from './components/Error';
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://mocki.io/v1/a7b364c5-bd3f-4028-b90a-95c1e8f8658a')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message}/>;
  }

  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
