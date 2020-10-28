import { useEffect, useState } from 'react';
import { validateInputFields } from './validation';

export default function useForm(receivedValues, validationRules) {
    const [values, setValues] = useState(receivedValues);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        setValues(receivedValues)
    },[receivedValues])

    function handleInputChange(e) {
        setValues({ ...values, [e.target.name] : e.target.value });
    }

    function handleImage(e) {
        setFile(e.target.files[0])
    }

    function isFormValid() {
        let isValid = true;
        const { hasErrors, errors } = validateInputFields(values, validationRules);

        if (hasErrors) {
            setErrors(errors);
            console.log(errors);
            isValid = false
            return;
        }
        console.log(isValid);
        return isValid;
    }

    return {
        values,
        errors,
        file,
        isFormValid,
        handleImage,
        inputProps: (inputName) => ({
            name: inputName,
            value: values?.[inputName] || '',
            onChange: handleInputChange
        })
    }
}