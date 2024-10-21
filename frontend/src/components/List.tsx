import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "./DataModels";
import ListRow from "./ListRow";
interface ListProps {
  fetchFunction: (page: number, query: string) => Promise<Article[]>;
  query: string;
}

const List: React.FC<ListProps> = ({ fetchFunction, query }) => {
  const [items, setItems] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  // Effect to reset items and page when the query changes
  useEffect(() => {
    fetchFunction(1, query).then((newItems: Article[]) => {
      setItems(newItems);
      setHasMore(newItems.length > 0);
      setPage(2);
    });
  }, [query]); // Run this effect whenever the query changes

  // Effect to fetch items when the page changes
  const fetchMoreItems = () => {
    fetchFunction(page, query).then((newItems: Article[]) => {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(newItems.length > 0);
      setPage((prevPage) => prevPage + 1);
    });
  };

  return (
    <InfiniteScroll
      key={`list-${query}`}
      dataLength={items.length}
      next={fetchMoreItems}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
      endMessage={<p>No more results</p>}
      height={"60vh"}
    >
      <div className="row">
        {items && items.map((item) => <ListRow article={item} />)}
      </div>
    </InfiniteScroll>
  );
};

export default List;
