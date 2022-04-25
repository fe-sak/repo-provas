import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  color: #4673cacc;
  text-decoration: none;
  font: 500 12px 'Roboto';

  :hover {
    font-weight: 700;
    text-decoration-line: underline;
  }
`;
