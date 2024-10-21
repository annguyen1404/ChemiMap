import styled from "styled-components";
import colours from "./Colours";
import { navBarHeight } from "./GlobalStyles";

export const Container = styled.main`
  height: calc(100% - ${navBarHeight});
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  background-color: black;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - ${navBarHeight});
  width: 100vw;
  color: white;
  text-align: center;
  scroll-snap-align: start;
  background-color: black;
`;

export const IconButton = styled.button`
  display: flex;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: white;
  cursor: pointer;
  &:hover {
    color: ${colours.hoverGreyLight};
  }
`;
