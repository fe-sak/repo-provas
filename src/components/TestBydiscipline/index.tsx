import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, ListItem, Typography } from '@mui/material';
import { FC, useContext, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import * as services from '../../services';
import { StyledLink } from '../styled components/StyledLinkMUI';

type Props = {
  test: {
    id: number;
    name: string;
    pdfUrl: string;
    teacher: string;
    views: number;
  };
};
export const TestByDiscipline: FC<Props> = ({
  test: { id, name, pdfUrl, teacher, views },
}) => {
  const { auth } = useContext(AuthContext);
  const [renderedViews, setRenderedViews] = useState<number>(views);

  const addView = async (testId: number) => {
    setRenderedViews((current) => current + 1);
    await services.addView(testId, auth);
  };

  return (
    <ListItem key={id}>
      <StyledLink
        href={pdfUrl}
        key={name}
        target='_blank'
        onClick={() => addView(id)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {name}
          <Typography variant='caption' color='gray'>
            {`  (${teacher})`}
          </Typography>
          <VisibilityIcon sx={{ color: 'gray' }} />
          <Typography variant='caption' color='gray'>
            {renderedViews}
          </Typography>
        </Box>
      </StyledLink>
    </ListItem>
  );
};
