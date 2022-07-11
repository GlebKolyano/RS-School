import { TAppDispatch } from '../model';
import DATA from '../../data/data';
import { bicycleSlice } from '../reducers/BicyclesSlice';

export const getBicycles = () => (dispatch: TAppDispatch) => {
  try {
    dispatch(bicycleSlice.actions.bicyclesFetching());
    const data = DATA;
    setTimeout(() => {
      dispatch(bicycleSlice.actions.bicyclesFetchingSuccess(data));
    }, 1000);
  } catch (err) {
    dispatch(bicycleSlice.actions.bicyclesFetchingError('Загрузка не удалась!'));
  }
};
