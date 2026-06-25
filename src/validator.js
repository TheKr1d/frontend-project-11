import * as yup from 'yup';

export const validatorURL = (urls) => {
    return yup
        .string()
        .required('Не должно быть пустым')
        .url('Ссылка должна быть валидным URL')
        .notOneOf(urls, 'Эта ссылка уже используется')
}