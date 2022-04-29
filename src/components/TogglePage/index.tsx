import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FC, MouseEvent } from 'react';

import { toggles } from '../../pages/Home';

interface IProps {
  toggle: toggles;
  handleChange: (event: MouseEvent<HTMLElement>, toggle: toggles) => void;
}
export const ToggleView: FC<IProps> = ({ toggle, handleChange }) => {
  const buttonStyles = {
    borderTop: 'none',
    '&.Mui-selected': {
      color: 'primary',
      backgroundColor: 'secondary',
    },
  };

  return (
    <ToggleButtonGroup
      exclusive
      fullWidth
      defaultValue='DISCIPLINA'
      value={toggle}
      onChange={handleChange}
      color='secondary'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        border: 'none',
        marginBottom: '10px',
      }}
    >
      <ToggleButton value='DISCIPLINA' sx={buttonStyles}>
        DISCIPLINA
      </ToggleButton>
      <ToggleButton value='PESSOA INSTRUTORA' sx={buttonStyles}>
        PESSOA INSTRUTORA
      </ToggleButton>
      <ToggleButton value='ADICIONAR' sx={buttonStyles}>
        ADICIONAR
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
