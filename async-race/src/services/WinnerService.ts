import { get, patch, post } from '../global/helpers';
import { IWinner, TPatchRequestProps, TPostRequestProps, URL } from '../global/models';
import { TWinnerParamsForUpdate } from './models';

export default class WinnerService {
  public static getWinner = async (id: number): Promise<IWinner | boolean> => {
    try {
      const { data } = await get<IWinner>(`${URL.winners}/${id}`).catch(() => {
        throw new Error('There is no winner in the table!');
      });

      return await data;
    } catch (error) {
      return false;
    }
  };

  public static createWinner = async (winner: IWinner): Promise<number> => {
    const props: TPostRequestProps<IWinner> = {
      request: `${URL.winners}`,
      postedObj: winner
    };

    const total = await post<IWinner>(props).catch(() => {
      throw new Error('New winner is not created!');
    });

    return total;
  };

  public static updateWinner = async ({ id, time, wins }: IWinner): Promise<boolean> => {
    const props: TPatchRequestProps<TWinnerParamsForUpdate> = {
      request: `${URL.winners}/${id as number}`,
      patchedObj: { wins, time }
    };

    const isUpdated = await patch<boolean, TWinnerParamsForUpdate>(props).catch(() => {
      throw new Error('There is no winner in the table!');
    });

    return !!isUpdated;
  };
}
