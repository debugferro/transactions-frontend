import styled from "@emotion/styled";

export const PageContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const PageCard = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  width: 90%;
  align-self: center;
  height: 80%;
`;

export const Title = styled.h1`
  text-transform: capitalize;
`;

export const SubTitle = styled.h3`
  color: var(--medium-gray);
  text-transform: uppercase;
`;

export const ColorfulPill = styled.span`
  border-radius: 5px;
  background-color: ${(props) => `#${props.color || "7e7878"}`};
  padding: 0.6rem;
`;
