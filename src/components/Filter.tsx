import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../auth_config.json';
import FilterSelector from './FilterSelector';

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const { isLoading, error, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState<{ columns: any[] }>();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(`${config.apiBase}/synopsis`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          setData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  return <div></div>;
};

export default Filter;
