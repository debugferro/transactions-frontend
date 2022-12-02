import styled from "@emotion/styled";

export const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: space-between;
  border-bottom: 1px solid var(--light-gray);
  padding: 1rem 0;
`;

export const InformationTitle = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 700;
    margin-left: 1rem;
  }
`;

export const Footer = styled.div`
  align-self: center;
  margin-top: 1rem;
`;
