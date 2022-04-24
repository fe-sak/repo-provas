import { styled } from '@mui/material/styles';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
import { FC } from 'react';

const Style = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const StyledToggleButton: FC<{
  value: string;
}> = ({ value }) => {
  return <Style value={value}>{value}</Style>;
};
