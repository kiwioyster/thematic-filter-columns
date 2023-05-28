import { Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  sample: string[];
}

const FilterTooltip: React.FC<Props> = ({ sample }) => {
  return (
    <>
      {sample.map((s) => (
        <Typography key={s}>
          <li>{s}</li>
        </Typography>
      ))}
    </>
  );
};

export default FilterTooltip;
