import React, { ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import colours from "../styles/Colours";
import { IconButton } from "../styles/Layout";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px; 
  margin: 20px auto; 
  border-radius: 25px;
  background-color: rgba(240, 240, 240, 0.15);
  padding: 0px 5px;
  &:hover {
    outline: 3px solid white;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 25px; /* Rounded edges */
  outline: none;
  background-color: transparent; /* Make background transparent to show container */
  color: white;
`;

const ClearButton = styled.button`
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

interface SearchBarProps {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange, onSearch, onKeyDown }) => {
  const handleClear = () => {
    onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>); 
  };

  return (
    <SearchContainer>
      <ClearButton onClick={handleClear}>
        <FaTimes />
      </ClearButton>
      <Input
        type="text"
        placeholder="Search biomedical research papers..."
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <IconButton onClick={onSearch}>
        <FaSearch />
      </IconButton>
    </SearchContainer>
  );
};

export default SearchBar;
