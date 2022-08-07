import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { getWinners } from '../../store/slices/winnner/slice';
import useWinners from '../../hooks/useWinners';
import { IWinner } from '../../global/models';
import { WINNERS_PER_PAGE } from './constants';
import WinnersTable from '../../components/WinnersComponents/WinnersTable';
import WinnersPagination from '../../components/WinnersComponents/WinnersPagination';
import WinnersTitle from '../../components/WinnersComponents/WinnersTitle';

const Winners = () => {
  const dispatch = useTypedDispatch();
  const { currentPageWinnersPagination } = useTypedSelector(
    ({ winnersPaginationReducer }) => winnersPaginationReducer
  );
  const [pageCountWinnersPagination, setPageCountWinnersPagination] = useState<number>(1);
  const [currentPageWinners, setCurrentPageWinners] = useState<IWinner[]>([]);

  useEffect(() => {
    (async () => {
      await dispatch(getWinners());
    })().catch(() => {});
  }, [dispatch]);

  const sortedWinners = useWinners();

  useEffect(() => {
    const setPageCountValue = () => {
      const result = Math.ceil(sortedWinners.length / WINNERS_PER_PAGE);
      setPageCountWinnersPagination(result);
    };

    const winnersForCurrentPage = sortedWinners.slice(
      (currentPageWinnersPagination - 1) * WINNERS_PER_PAGE,
      (currentPageWinnersPagination - 1) * WINNERS_PER_PAGE + WINNERS_PER_PAGE
    );

    setCurrentPageWinners(winnersForCurrentPage);
    setPageCountValue();
  }, [currentPageWinnersPagination, sortedWinners]);

  return (
    <div className="winners">
      <div className="winners__wrapper">
        <WinnersTitle amountWinners={sortedWinners.length} />
        <WinnersTable winners={currentPageWinners} />
        <WinnersPagination pageCount={pageCountWinnersPagination} />
      </div>
    </div>
  );
};

export default Winners;
