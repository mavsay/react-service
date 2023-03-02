import React, { useEffect, useState } from 'react';

function useSelect(handler, initialState, options) {
  const [value, setValue] = useState(initialState);

  const handlerValue = (val) => {
    if (val) setValue(val);
    handler(val);
  }

  useEffect(() => {
    if (initialState === 'model') {
      setValue(initialState);
    }

    return;
  }, [options[0]?.name]);

  return [ value, handlerValue ];
}

const Select = ({options, defaultValue, onChange, label, isDropped }) => {
  const [ value, handlerValue ] = useSelect(onChange, defaultValue, options);

  return (
    <div className="cars">
      <div className='cars_label'>{label}</div>
      {options.length > 0
        && <div className="cars_select_block">
        <div className="select">
          <button type='button' className="select_header" onClick={() => handlerValue()}>
            <span className="select_current cars_select_current">{value}</span>
            {/* <img className="select_icon" /> */}
          </button>
          <div className={`select_body ${isDropped ? 'select_body__open' : ''}`}>
            {options.map(item => (
              <div
                onClick={() => handlerValue(item.name)}
                className="select_item"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    }
    </div>
  )
}

export default Select;