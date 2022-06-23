import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, ListItem, Typography } from '@mui/material';
import { FC, useContext, useState } from 'react';

import * as api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { StyledLink } from '../styled components/StyledLinkMUI';

interface Props {
  category: {
    name: string;
    tests: {
      id: number;
      name: string;
      pdfUrl: string;
      views: number;
      category: { name: string };
      disciplineTeacher: {
        teacher: { name: string };
        discipline: { name: string };
      };
    }[];
  };
  test: {
    id: number;
    name: string;
    pdfUrl: string;
    views: number;
    category: { name: string };
    disciplineTeacher: {
      teacher: { name: string };
      discipline: { name: string };
    };
  };
}

export const TestByTeacher: FC<Props> = ({ category, test }) => {
  const { auth } = useContext(AuthContext);
  const [renderedViews, setRenderedViews] = useState<number>(test.views);

  const addView = async (testId: number) => {
    setRenderedViews((current) => current + 1);
    await api.addView(testId, auth);
  };

  return (
    <ListItem key={`${category.name} ${test.name}`}>
      <StyledLink href={test.pdfUrl} key={test.name} target='_blank' onClick={() => addView(test.id)}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {test.name}
          <Typography variant='caption' color='gray' sx={{ marginRight: 1 }}>
            {`(${test.disciplineTeacher.discipline.name})`}
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
