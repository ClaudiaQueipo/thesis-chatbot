import * as Yup from 'yup';

export const qaValidation = Yup.object().shape({
 questions: Yup.string()
   .required('Las preguntas son requeridas'),
 answers: Yup.string()
   .required('Las respuestas son requeridas'),
});
