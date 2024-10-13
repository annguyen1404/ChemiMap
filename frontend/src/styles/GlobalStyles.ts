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
`;

export default GlobalStyles;
