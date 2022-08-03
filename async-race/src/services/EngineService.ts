import { EngineDriveModeReturnType, EngineReturnType, IEngineParams, URL } from '../global/models';

export default class EngineService {
  public static engineStart = async (idCar: number): Promise<EngineReturnType> => {
    const response = await fetch(`${URL.engine}?id=${idCar}&status=started`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Engine is not started!');
    }

    const engineParams = (await response.json()) as IEngineParams;
    return engineParams;
  };

  public static engineStop = async (idCar: number): Promise<EngineReturnType> => {
    const response = await fetch(`${URL.engine}?id=${idCar}&status=stopped`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Engine is not stopped!');
    }

    const engineParams = (await response.json()) as IEngineParams;
    return engineParams;
  };

  public static engineDriveMode = async (idCar: number): Promise<EngineDriveModeReturnType> => {
    const response = await fetch(`${URL.engine}?id=${idCar}&status=drive`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Engine is broken!');
    }

    const { success } = (await response.json()) as { success: boolean };
    return success;
  };
}
