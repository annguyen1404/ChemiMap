import { styled } from "styled-components";
import colours from "./Colours";

export const Title = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

export const SubTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

export const Subtext = styled.p`
  font-size: 0.75rem;
  margin: 10px;
  max-width: 600px;
  line-height: 1rem;
`;

export
const Highlight = styled.span<{
  color: string;
  isKeyLabel?: boolean;
  highlighted?: boolean;
}>`
  font-size: 0.75rem;
  background-color: ${({ highlighted, color }) =>
    highlighted ? colours.greyDark : color};
  border-radius: 6px;
  padding: ${({ isKeyLabel }) => (isKeyLabel ? "2px 5px" : "0 3px")};
  margin-left: ${({ isKeyLabel }) => (isKeyLabel ? "2px" : "1px")};
  margin-right: ${({ isKeyLabel }) => (isKeyLabel ? "0" : "1px")};
  margin-bottom: ${({ isKeyLabel }) => (isKeyLabel ? "5px" : "0")};
  text-align: ${({ isKeyLabel }) => (isKeyLabel ? "center" : "justify")};
  cursor: pointer;
`;