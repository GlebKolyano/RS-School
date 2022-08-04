import { IWinner, URL } from '../global/models';

export default class WinnerService {
  public static getWinner = async (id: number): Promise<IWinner | boolean> => {
    try {
      const response = await fetch(`${URL.winners}/${id}`);

      if (!response.ok) {
        throw new Error('There is no winner in the table!');
      }

      const scoreWinner = response.json() as unknown as IWinner;

      return scoreWinner;
    } catch (error) {
      return false;
    }
  };

  public static createWinner = async (winner: IWinner): Promise<boolean> => {
    const response = await fetch(`${URL.winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner)
    });

    if (!response.ok) {
      throw new Error('New winner is not created!');
    }

    return true;
  };

  public static updateWinner = async ({ id, time, wins }: IWinner): Promise<boolean> => {
    const response = await fetch(`${URL.winners}/${id as number}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins, time })
    });

    if (!response.ok) {
      throw new Error('There is no winner in the table!');
    }

    return true;
  };
}
