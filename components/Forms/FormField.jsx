import { useState } from 'react';
import '../styles/FormField.css';

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  options = null,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;
  const showLabel = isFocused || hasValue;

  return (
    <div className={`form-field ${error ? 'form-field-error' : ''}`}>
      {type === 'select' ? (
        <>
          <label htmlFor={name} className={`form-field-label ${showLabel ? 'form-field-label-float' : ''}`}>
            {label}
            {required && <span className="form-field-required">*</span>}
          </label>
          <select
            id={name}
            name={name}
            className="form-field-select"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            {...props}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <input
            id={name}
            name={name}
            type={type}
            className="form-field-input"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={showLabel ? placeholder : ''}
            required={required}
            {...props}
          />
          <label htmlFor={name} className={`form-field-label ${showLabel ? 'form-field-label-float' : ''}`}>
            {label}
            {required && <span className="form-field-required">*</span>}
          </label>
        </>
      )}
      {error && <span className="form-field-error-message">{error}</span>}
    </div>
  );
}
