import React from 'react';

interface EditableNumberProps {
  value: number;
  onChange: (value: number) => void;
}

const EditableNumber: React.FC<EditableNumberProps> = ({ value, onChange }) => {
  return (
    <input
      type="number"
      className="border p-1 rounded"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
    />
  );
};

export default EditableNumber;
