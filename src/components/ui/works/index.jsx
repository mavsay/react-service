import React from "react";

const Works = ({worksArr}) => {

  return (
    <div className="works">
      <p>выберите услуги:</p>
      {worksArr.map(work =>
        <div
          key = {work.id}
          className = "input_items"
        >
          <input
            id = {work.id}
            value = {work.operation}
            type="checkbox"
            className = "input_work"
          />
          <label
            htmlFor = {work.id}
            className = "label_work"
          >
            {work.operation}
          </label>
        </div>
      )}
    </div>
  )
}

export default Works;
