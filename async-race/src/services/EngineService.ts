import { patch } from '../global/helpers';
import { EngineDriveModeReturnType, EngineReturnType, IEngineParams, URL } from '../global/models';

export default class EngineService {
  public static engineStart = async (idCar: number): Promise<EngineReturnType> => {
    const request = `${URL.engine}?id=${idCar}&status=started`;

    const { data } = await patch<IEngineParams>({ request }).catch(() => {
      throw new Error('Engine is not started!');
    });

    return data;
  };

  public static engineStop = async (idCar: number): Promise<EngineReturnType> => {
    const request = `${URL.engine}?id=${idCar}&status=stopped`;

    const { data } = await patch<IEngineParams>({ request }).catch(() => {
      throw new Error('Engine is not stopped!');
    });

    return data;
  };

  public static engineDriveMode = async (idCar: number): Promise<EngineDriveModeReturnType> => {
    const request = `${URL.engine}?id=${idCar}&status=drive`;
    const { data } = await patch<EngineDriveModeReturnType>({ request }).catch(() => {
      throw new Error('Engine is broken!');
    });

    return data;
  };
}
