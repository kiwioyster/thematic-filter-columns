import { Tooltip, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useState } from 'react';
import { IData } from '../definitions/Data';
import FilterTooltip from './FilterTooltip';

interface Props {
  menuItems: IData[];
  addFilterColumn: (item: IData) => void;
}

const FilterSelector: React.FC<Props> = ({ menuItems, addFilterColumn }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id='select-label'>Add Filter</InputLabel>
        <Select
          labelId='select-label'
          id='open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {menuItems.map((item, index) => (
            // there seems to be a bug in the tooltip mui component when combined with selector. when you open the selector dropdown it opens the tooltip of the item that was on your cursor's location and it does not disappear until you mouse over that item again.
            // further investigation is needed to understand why. a hack to get around this is to add a small delay on displaying the tooltip.
            <Tooltip
              key={index}
              title={<FilterTooltip sample={item.sample}></FilterTooltip>}
              placement='right'
            >
              <MenuItem
                key={index}
                value={item.sampleHeader}
                onClick={() => addFilterColumn(item)}
              >
                {item.sampleHeader}
              </MenuItem>
            </Tooltip>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelector;
