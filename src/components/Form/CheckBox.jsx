import React from 'react';

const CheckBox = ({ text, className, id, ...props }) => (
    <label htmlFor={id} className={className}>
        <input id={id} name={id} type="checkbox" {...props} />
        <span>{text}</span>
    </label>
);

export default CheckBox;
