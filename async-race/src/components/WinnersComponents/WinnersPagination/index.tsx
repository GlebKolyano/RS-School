import React, { useEffect, useState } from 'react';
import { useTypedDispatch } from '../../../hooks/reduxHooks';
import { useWinnerPaginationSelector } from '../../../store/selectors';
import { changeWinnersPaginationPage } from '../../../store/slices/pagination/winnersPagination/slice';
import Button from '../../UI/Button';
import { TWinnersPaginationProps } from './models';

const WinnersPagination = ({ pageCount }: TWinnersPaginationProps) => {
  const dispatch = useTypedDispatch();
  const { currentPageWinnersPagination } = useWinnerPaginationSelector();

  const [currentPage, setCurrentPage] = useState(currentPageWinnersPagination || 1);
  const changePageTestPrev = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const changePageTestNext = () => {
    setCurrentPage(currentPage < pageCount ? currentPage + 1 : currentPage);
  };

  useEffect(() => {
    dispatch(changeWinnersPaginationPage(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="winners__pagination">
      <Button onClick={changePageTestPrev} text="prev" />
      <Button onClick={changePageTestNext} text="next" />
    </div>
  );
};

export default WinnersPagination;
