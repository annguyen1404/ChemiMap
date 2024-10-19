import styled from "styled-components";
import colours from "./Colours";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    color: ${colours.hoverGrey};
  }
`;