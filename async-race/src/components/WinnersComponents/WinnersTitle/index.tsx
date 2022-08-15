import React from 'react';
import { useWinnerPaginationSelector } from '../../../store/selectors';
import { TWinnersTitleProps } from './models';

const WinnersTitle = ({ amountWinners }: TWinnersTitleProps) => {
  const { currentPageWinnersPagination } = useWinnerPaginationSelector();
  return (
    <h2 className="winners__title">
      Winners ({amountWinners}) / Page ({currentPageWinnersPagination})
    </h2>
  );
};

export default WinnersTitle;
