
import React from 'react';

interface EditableSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const EditableSelect: React.FC<EditableSelectProps> = ({ value, options, onChange }) => {
  return (
    <select
      className="border p-1 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default EditableSelect;
