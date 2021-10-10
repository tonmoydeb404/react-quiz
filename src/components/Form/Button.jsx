/* eslint-disable react/button-has-type */
import React from 'react';
import Classes from '../../styles/Button.module.css';

const Button = ({ children, icon, className, ...restProps }) => (
    <button className={`${Classes.button} ${className}`} {...restProps}>
        <span>{children}</span>
        {icon && <span className="material-icons-outlined"> {icon} </span>}
    </button>
);

export default Button;
