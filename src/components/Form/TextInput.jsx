import React from 'react';
import Classes from '../../styles/TextInput.module.css';

const TextInput = ({ icon, ...props }) => (
    <div className={Classes.textInput}>
        <input {...props} />
        <span className="material-icons-outlined"> {icon} </span>
    </div>
);

export default TextInput;
