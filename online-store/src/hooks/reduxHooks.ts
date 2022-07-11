import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { TAppDispatch, TRootState } from '../store/model';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
