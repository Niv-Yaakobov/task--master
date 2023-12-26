import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosGet = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true); // Rename loading to isPending
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsPending(false); // Rename loading to isPending
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error }; // Rename loading to isPending
};

export default useAxiosGet;