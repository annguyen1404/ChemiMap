import React from "react";
import styled from "styled-components";
import { FaHome, FaQuestionCircle, FaCopyright } from "react-icons/fa";
import colours from "../styles/Colours";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: black;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Icon = styled.div`
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${colours.hoverGrey};
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (section: string) => {
    navigate(`/#${section}`);
    setTimeout(() => {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  };
  return (
    <NavbarContainer>
      <Logo>ChemiMap</Logo>
      <IconContainer>
      <Icon onClick={() => handleNavigation("main")}>
          <FaHome />
        </Icon>
        <Icon onClick={() => handleNavigation("about")}>
          <FaQuestionCircle />
        </Icon>
        <Icon onClick={() => handleNavigation("footer")}>
          <FaCopyright />
        </Icon>
      </IconContainer>
    </NavbarContainer>
  );
};

export default Navbar;
