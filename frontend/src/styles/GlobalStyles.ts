import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box; /* Ensures padding and borders are included in the element's total width and height */
  }

  body {
    font-family: 'Montserrat', sans-serif; /* Set Montserrat as the default font */
    margin: 0; /* Reset default margin */
    padding: 0; /* Reset default padding */
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0; /* Reset margins for headings and paragraphs */
  }

  html {
    scroll-behavior: smooth; /* Enables smooth scrolling */
  }

  /* Custom Scrollbar Styles for WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
    background: black; /* Background color of the scrollbar */
    border-radius: 6px; /* Rounded edges for the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: black; /* Background of the scrollbar track */
    border-radius: 6px; /* Rounded edges for the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background: #555; /* Dark grey color for the scrollbar thumb */
    border-radius: 6px; /* Rounded corners for the scrollbar thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #333; /* Darker grey when hovered */
  }

  /* Custom Scrollbar Styles for Firefox */
  html {
    scrollbar-width: thin; /* Can be thin, auto, or none */
    scrollbar-color: #555 black; /* thumb color and track color */
  }
`;

export default GlobalStyles;
