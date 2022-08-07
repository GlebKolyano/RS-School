import React from 'react';
import { useTypedSelector } from '../../../hooks/reduxHooks';
import { TWinnersTitleProps } from './models';

const WinnersTitle = ({ amountWinners }: TWinnersTitleProps) => {
  const { currentPageWinnersPagination } = useTypedSelector(
    ({ winnersPaginationReducer }) => winnersPaginationReducer
  );
  return (
    <h1 className="winners__title">
      Winners ({amountWinners}) Page ({currentPageWinnersPagination})
    </h1>
  );
};

export default WinnersTitle;
