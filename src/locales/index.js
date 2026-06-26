import ru from './ru.js'
import i18n from 'i18next';

const i18nextInstance = i18n.createInstance()
i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
        ru
    }
})

export default i18nextInstance;