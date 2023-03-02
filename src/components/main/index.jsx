import React, { useReducer } from 'react'
import { cars, works } from './data.js';
import { reducer, initData } from './datareduse.js';

import Select from '../ui/select/index.jsx';
import Works from '../ui/works/index.jsx';
import Answer from '../ui/answer/index.jsx';



import './main.css';
import ShowNotification from '../ui/showNotification/index.jsx';

const Main = () => {
  const [ state, dispatch ] = useReducer(reducer, initData);

  return (
    <div className="main_wrapper">
      <div className="container">
        <form className="form" onSubmit = {(event) => dispatch({ type: 'formListener', event })}>
          <div className="select_block">
            <Select
              label={"Выберите марку авто"}
              onChange = {(value) => {
                dispatch({ type: 'toggleSelects', name: 'isAutoDropped' })
                dispatch({ type: 'autoListener', brand: value })
              }}
              defaultValue = {'Auto'}
              options = {cars}
              isDropped={state.isDropped.isAutoDropped}
            />

            <Select
              label={"Выберите модель авто"}
              onChange = {(value) => {
                dispatch({ type: 'toggleSelects', name: 'isModelDropped' })
                dispatch({ type: 'modelListener', model: value })
              }}
              defaultValue = {'model'}
              options = {state.autoModels}
              isDropped={state.isDropped.isModelDropped}
            />
          </div>

          <Works worksArr={works} />

          <div className="button_submit_container">
            <button
            type="submit" className="button_submit">запросить</button>
          </div>
        </form>

        { state.services.length > 0
          ? <Answer services={state.services}/>
          : state.showNotification && <ShowNotification state={state}/>
        }
      </div>
    </div>
  )
}

export default Main;