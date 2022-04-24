import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 360px) {
    padding: 0 2%;
  }
`;
