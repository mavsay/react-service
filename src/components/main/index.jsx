import React, { useState } from 'react'
import { cars, works, brandModelService } from './data.js';

import Select from '../ui/select/index.jsx';
import Works from '../ui/works/index.jsx';
import Answer from '../ui/answer/index.jsx';

import './main.css';

const Main = () => {
  const [services, setServices] = useState([]);
  const [autoBrands, setAutoBrands] = useState([]);
  const [buttonDisable , setButtonDisable] = useState(true);

  const [carInfo, setCarInfo] = useState({
    brand: '',
    model: ''
  });
  const [isDropped, setDropped] = useState({
    isAutoDropped: false,
    isModelDropped: false,
  });

  const autoListener = (brand) => {
    toggleSelects('isAutoDropped');
    if (brand) {
      const carSelected = cars.find(car => car.name === brand);
      const models = carSelected.models;
      setCarInfo({ ...carInfo, brand })
      setAutoBrands([...models.map(item => ({ 'name' : item }))]);
    }
  };

  const modelListener = (model) => {
    toggleSelects('isModelDropped');
    if (model) {
      setCarInfo({ ...carInfo, model });
      setButtonDisable(false);
    }
  };

  const toggleSelects = (name) => {
    const obj = { ...isDropped };
    for (const key in isDropped) {
      if (key === name) obj[name] = !obj[name]
      else obj[key] = false
    }
    setDropped(obj);
  }

  const formListener = (event) => {
    event.preventDefault();

    const fields = Object.values(event.target)
    const works = fields
      .filter(item => item.name === 'work' && item.checked)
      .reduce((acc, work) => {
        acc[work.value] = work.value
        return acc;
      }, {});

    const matchModel = brandModelService.filter(item => (
      item.name === carInfo.brand && item.model === carInfo.model
    ));

    const services = matchModel.map(item => {
      const checkedWorks = item.works.filter(work => works[work.operation]);
      const totalPrice = checkedWorks.reduce((acc, work) => acc += work.price , 0);
      return { ...item, works: checkedWorks, totalPrice };
    })

    setServices(services);
  };

  return (
    <div className="main_wrapper">
      <div className="container">
        <div className="select_block">
          <Select
            label={"Выберите марку авто"}
            onChange = {autoListener}
            defaultValue = {'Auto'}
            options = {cars}
            isDropped={isDropped.isAutoDropped}
          />

          <Select
            label={"Выберите модель авто"}
            onChange = {modelListener}
            defaultValue = {'Model'}
            options = {autoBrands}
            isDropped={isDropped.isModelDropped}
          />
        </div>

        <form className="form" onSubmit = {e => formListener(e)} >
          <Works worksArr={works} />

          <div className="button_submit_container">
            <button disabled = {buttonDisable} type="submit" className="button_submit">запросить</button>
          </div>
        </form>

        { services.length > 0 && <Answer services={services} /> }
      </div>
    </div>
  )
}

export default Main;