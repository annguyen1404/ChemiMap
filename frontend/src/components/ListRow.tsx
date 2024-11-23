// ListRow.js
import React from 'react';
import { Article } from './DataModels';
import { styled } from 'styled-components';
import colours from '../styles/Colours';
import { useNavigate } from 'react-router-dom';

const ItemContainer = styled.div`
  text-align: left;
  width: 85vw;
  outline: 2px solid white;
  padding: 20px;
  margin: 20px;
  border-radius: 6px;
  outline: 2px solid ${colours.greyDark};
  &:hover {
    background-color: ${colours.hoverGreyDark};
  }
`;

export const ItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  margin: 3px 0px;
`;

export const ItemText = styled.p`
  font-size: 0.75rem;
`;

export const ItemId = styled.p`
  font-size: 0.75rem;
  margin-bottom: 10px;
`;

interface ListRowProps {
    article: Article;
}

const ListRow = ({ article }: ListRowProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/read/${article.id}`);
  };
  return (
    <ItemContainer onClick={handleClick} style={{ cursor: "pointer" }}>
      <ItemId>PMID: {article.id}</ItemId>
      <ItemTitle>{article.title}</ItemTitle>
      <ItemText>{article.abstract}</ItemText>
    </ItemContainer>
  );
};

export default ListRow;
