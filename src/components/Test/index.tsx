import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

type Props = {
  test: {
    name: string;
    pdfUrl: string;
    teacher: string;
    category: string;
  };
};

const StyledLink = styled(Link)(
  ({ theme }) => `
  :hover {
    color: ${theme.palette.secondary.main};
  }
`
);
export const Test: FC<Props> = ({ test }) => {
  return (
    <Box>
      <StyledLink
        target='_blank'
        href={test.pdfUrl}
        color='black'
        underline='hover'
        variant='body2'
      >
        {test.name}
      </StyledLink>
    </Box>
  );
};
