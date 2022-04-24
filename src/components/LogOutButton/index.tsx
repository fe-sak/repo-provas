import LogoutIcon from '@mui/icons-material/Logout';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { StyledButton } from './styles';

export const LogOutButton: FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleOnClick = () => {
    logout();
    navigate('/');
  };
  return (
    <StyledButton type='button' onClick={handleOnClick}>
      <LogoutIcon sx={{ color: 'black', fontSize: 20 }} />
    </StyledButton>
  );
};
