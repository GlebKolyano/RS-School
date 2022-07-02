import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '00b52516eda74d2a8a2b5baeb8170292',
        });
    }
}

export default AppLoader;
