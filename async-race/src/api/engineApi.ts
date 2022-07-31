import { EngineDriveModeReturnType, EngineReturnType, IEngineParams, URL } from '../global/models';

export async function engineStart(carId: number): Promise<EngineReturnType> {
  try {
    const response = await fetch(`${URL.engine}?id=${carId}&status=started`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Engine is not started!');
    }

    const engineParams = (await response.json()) as IEngineParams;
    return engineParams;
  } catch (error) {
    return (error as Error).message;
  }
}

export async function engineDriveMode(carId: number): Promise<EngineDriveModeReturnType> {
  try {
    const response = await fetch(`${URL.engine}?id=${carId}&status=drive`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Drive mode is not started!');
    }

    const status = (await response.json()) as { success: boolean };
    return status;
  } catch (error) {
    return (error as Error).message;
  }
}

export async function engineStop(carId: number): Promise<EngineReturnType> {
  try {
    const response = await fetch(`${URL.engine}?id=${carId}&status=stopped`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Engine is not stopped!');
    }

    const engineParams = (await response.json()) as IEngineParams;
    return engineParams;
  } catch (error) {
    return (error as Error).message;
  }
}
