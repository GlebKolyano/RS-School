import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '70051855752f4291b17002057fbdeb36',
        });
    }
}

export default AppLoader;
