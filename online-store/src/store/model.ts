import { rootReducer, setupStore } from './store';

export type TRootState = ReturnType<typeof rootReducer>;

export type TAppStore = ReturnType<typeof setupStore>;

export type TAppDispatch = TAppStore['dispatch'];
