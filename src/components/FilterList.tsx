import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
import { Container, Draggable, OnDropCallback } from 'react-smooth-dnd';
import { IColumn } from '../definitions/Column';
import { getFilterTypes } from '../utils/getFilterTypes';

interface Props {
  filterCols: IColumn[];
  deleteItem: (id: number) => void;
  onDrop: OnDropCallback;
  handleOpen: (id: number) => void;
  handleClose: (id: number) => void;
  changeFilterType: (id: number, newType: string) => void;
}

const FilterList: React.FC<Props> = ({
  filterCols,
  deleteItem,
  handleClose,
  handleOpen,
  onDrop,
  changeFilterType,
}) => {
  return (
    <List>
      <Container dragHandleSelector='.drag-handle' lockAxis='y' onDrop={onDrop}>
        {filterCols.map(({ uid, sampleHeader, filterType, selectOpen }) => (
          <Draggable key={uid}>
            <ListItem style={{ paddingRight: '10rem' }}>
              <ListItemText primary={sampleHeader} />
              Type:
              <Select
                labelId='select-label'
                id='open-select'
                open={selectOpen}
                onClose={() => handleClose(uid)}
                onOpen={() => handleOpen(uid)}
                value={filterType}
              >
                {getFilterTypes().map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                    onClick={() => changeFilterType(uid, item)}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <span
                style={{ cursor: 'pointer', marginLeft: '2rem' }}
                onClick={() => deleteItem(uid)}
              >
                Delete
              </span>
              <ListItemSecondaryAction>
                <ListItemIcon
                  style={{ cursor: 'grab' }}
                  className='drag-handle'
                >
                  Drag ↕
                </ListItemIcon>
              </ListItemSecondaryAction>
            </ListItem>
          </Draggable>
        ))}
      </Container>
    </List>
  );
};

export default FilterList;
