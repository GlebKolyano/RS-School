import React from 'react';
import { useTypedSelector } from '../../../hooks/reduxHooks';
import { TWinnersTitleProps } from './models';

const WinnersTitle = ({ amountWinners }: TWinnersTitleProps) => {
  const { currentPageWinnersPagination } = useTypedSelector(
    ({ winnersPaginationReducer }) => winnersPaginationReducer
  );
  return (
    <h2 className="winners__title">
      Winners ({amountWinners}) / Page ({currentPageWinnersPagination})
    </h2>
  );
};

export default WinnersTitle;
