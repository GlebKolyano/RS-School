import { API_KEY, BASE_LINK } from '../../modules/constants';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(BASE_LINK, {
            apiKey: API_KEY,
        });
    }
}

export default AppLoader;
