import { styled } from "styled-components";
import colours from "./Colours";

export const Title = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  margin: 0;
`;

export const SubTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  margin: 0;
`;

export const Subtext = styled.p`
  font-size: 0.75rem;
  margin: 10px;
  max-width: 600px;
  line-height: 1rem;
`;

export const Subpoint = styled(Subtext)`
  margin-top: 0;
  margin-bottom: 10px;
  margin-left: 18px;
`;

export const Highlight = styled.span<{
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

export const Button = styled.a`
  width: 250px;
  margin-top: 10px;
  font-size: 0.75rem;
  padding: 10px 20px;
  color: ${colours.white};
  background-color: ${colours.hoverGreyDark};
  text-decoration: none;
  border-radius: 6px;
  text-align: center;

  &:hover {
    background-color: ${colours.greyDark};
  }
`;