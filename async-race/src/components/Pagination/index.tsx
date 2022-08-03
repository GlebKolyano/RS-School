import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({
  pageCount,
  onPageChange
}: {
  pageCount: number;
  onPageChange: (page: number) => void;
}) => {
  const pageChangeHandler = ({ selected }: { selected: number }) => {
    console.log('selected', selected);
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={(e) => pageChangeHandler(e)}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< prev"
      containerClassName="pagination"
      pageClassName="pagination__page"
      previousClassName="pagination__prev"
      nextClassName="pagination__next"
    />
  );
};

export default Pagination;
