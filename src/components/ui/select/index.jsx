import React, { useState, useEffect} from 'react'

const Select = ({options, defaultValue, onChange, label}) => {

  // const [defValue, setDefValue] = useState(defaultValue);
  // const [list, setList] = useState(options);

  // const isDefaultVal = (name) => name.toLowerCase() === defaultValue.toLowerCase();

  // useEffect(() => {
  //   setList([{'name': defaultValue}, ...options])
  // }, [defaultValue, options]);

  // const handleChange = (value) => {
  //   setDefValue(value);
  //   onChange(value);
  // }

  // console.log(defValue, 'defValue');

  return (
    <div className="cars">
      <label htmlFor="cars">{label}</label>
      <div>
        {/* <select
          onChange={event => handleChange(event.target.value)}
        >
          {list.map(option =>
            <option
              selected={isDefaultVal(option.name)}
              disabled={isDefaultVal(option.name)}
              value={option.name}
              key={option.name}
            >
              {option.name}
            </option>
          )}
        </select> */}
        <select
          onChange={event => onChange(event.target.value)}
        >
          <option
            value={defaultValue}
          >
            {defaultValue}
          </option>
          {options.map(option =>
            <option
              value={option.name}
              key={option.name}
            >
              {option.name}
            </option>
          )}
        </select>
      </div>
    </div>
  )
}

export default Select;