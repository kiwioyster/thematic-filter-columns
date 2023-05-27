import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useState } from 'react';

interface Props {
  menuItems: string[];
}

const FilterSelector: React.FC<Props> = ({ menuItems }) => {
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id='demo-controlled-open-select-label'>
          Add Filter
        </InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          {menuItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelector;
