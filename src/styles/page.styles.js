import styled from "@emotion/styled";
export const ColorfulPill = styled.span`
  border-radius: 5px;
  background-color: ${(props) => `#${props.color || "7e7878"}`};
  padding: 0.6rem;
`;
