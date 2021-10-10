import React from 'react';
import Classes from '../../styles/Form.module.css';

const Form = ({ children, className, ...rest }) => (
    <form className={`${className} ${Classes.form}`} {...rest}>
        {children}
    </form>
);

export default Form;
