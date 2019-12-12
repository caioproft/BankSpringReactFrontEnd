import React from "react";

const Field = ({ label, name, value, errors, onChange }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} />
    <p>{errors}</p>
  </div>
);
export default Field;
