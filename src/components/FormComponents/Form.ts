import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;

  p {
    color: #ffa3a3;
    font-weight: 700;
  }

  @media (max-width: 326px) {
    gap: 5px;
  }
`;

export default Form;
