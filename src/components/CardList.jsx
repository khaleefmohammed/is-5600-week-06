import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {
  const limit = 10;

  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  const handlePagination = (direction) => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + direction;
      return newOffset >= 0 ? newOffset : 0;
    });
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (searchItem) => {
    if (!searchItem) {
      setProducts(data.slice(offset, offset + limit));
      setOffset(0);
    } else {
      const lowerCasesearchItem = searchItem.toLowerCase();
      const filter = data.filter(
        (product) =>
          (product.description && product.description.toLowerCase().includes(lowerCasesearchItem)) ||
          (product.alt_description && product.alt_description.toLowerCase().includes(lowerCasesearchItem))
      );
      setProducts(filter.slice(0, limit));
      setOffset(0);
    }
  };

  const isNextDisabled = offset + limit >= data.length;
  const isPreviousDisabled = offset === 0;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        {!isPreviousDisabled && (
          <Button
            text="Previous"
            handleClick={() => handlePagination(-limit)}
            disabled={isPreviousDisabled}
          />
        )}
        
        <Button
          text="Next"
          handleClick={() => handlePagination(limit)}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default CardList;