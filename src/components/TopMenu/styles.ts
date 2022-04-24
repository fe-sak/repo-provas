import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #c4c4c4;

  @media (max-width: 400px) {
    padding-bottom: 15px;
  }
`;

export const TopBar = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;

  img {
    width: 100px;
    margin: 0;
  }
`;

export const Input = styled.input`
  width: 100px;
  height: 58px;
  border-radius: 5px;
  border: 1px solid gray;
  padding-left: 15px;
  font-size: 20px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: black;
    font-weight: 400;
  }
`;
