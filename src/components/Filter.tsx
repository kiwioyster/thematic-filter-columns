import { useAuth0 } from '@auth0/auth0-react';
import { arrayMoveImmutable } from 'array-move';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { OnDropCallback } from 'react-smooth-dnd';
import config from '../auth_config.json';
import { IColumn } from '../definitions/Column';
import { IData } from '../definitions/Data';
import { getDefaultFilter } from '../utils/getFilterTypes';
import FilterList from './FilterList';
import FilterSelector from './FilterSelector';

interface Props {}

const Filter: React.FC<Props> = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState<IData[]>();
  const [columns, setColumns] = useState<IColumn[]>([]);

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
          const response = (await axios.get(`${config.apiBase}/synopsis`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })) as { data: { data: { columns: IData[] } } };

          setData(response.data.data.columns);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  const addFilterColumn = (newCol: IData) => {
    setColumns((prev) => {
      return [
        ...prev,
        {
          ...newCol,
          // set id as the time it was created, guaranteed to be unique.
          // you could also create unique id with encryption
          uid: new Date().getTime(),
          filterType: getDefaultFilter(),
          selectOpen: false,
        },
      ];
    });
  };
  const deleteFilterColum = (id: number) => {
    setColumns((prev) => {
      return prev.filter((p) => p.uid !== id);
    });
  };
  const handleClose = (id: number) => {
    setColumns((prev) =>
      prev.map((p) => (p.uid === id ? { ...p, selectOpen: false } : p))
    );
  };
  const handleOpen = (id: number) => {
    setColumns((prev) =>
      prev.map((p) => (p.uid === id ? { ...p, selectOpen: true } : p))
    );
  };
  const changeFilterType = (id: number, newType: string) => {
    setColumns((prev) =>
      prev.map((p) => (p.uid === id ? { ...p, filterType: newType } : p))
    );
  };
  const onDrop: OnDropCallback = ({ removedIndex, addedIndex }) => {
    if (typeof removedIndex === 'number' && typeof addedIndex === 'number') {
      console.log({ removedIndex, addedIndex });
      setColumns((items) =>
        arrayMoveImmutable(items, removedIndex, addedIndex)
      );
    }
  };

  return (
    <div>
      {isLoading || !data ? (
        <span>No data...</span>
      ) : (
        <>
          <FilterSelector
            menuItems={data}
            addFilterColumn={addFilterColumn}
          ></FilterSelector>
          {columns ? (
            <FilterList
              filterCols={columns}
              deleteItem={deleteFilterColum}
              onDrop={onDrop}
              handleOpen={handleOpen}
              handleClose={handleClose}
              changeFilterType={changeFilterType}
            ></FilterList>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Filter;
