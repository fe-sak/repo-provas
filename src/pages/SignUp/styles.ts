import styled from 'styled-components';

export const Viewport = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  width: 300px;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 360px) {
    padding: 0 2%;
  }
`;

export const SignUpOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageName = styled.span`
  font: 500 24px Poppins;
  margin-bottom: 31px;
`;

export const Logo = styled.img`
  width: 100%;
  aspect-ratio: 4.59842519685;
  margin-top: 20px;
  background-color: white;
`;

export const Button = styled.button`
  width: 100%;
  height: 36px;
  color: white;
  background-color: #1976d2;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border: none;
  text-transform: uppercase;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
