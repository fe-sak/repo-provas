import { Link, styled } from '@mui/material';

export const StyledLink = styled(Link)(
  ({ theme }) => `
  color: ${theme.palette.secondary.main};
  
  :hover {
    font-weight: 700;
    cursor: pointer;
  }
`
);
