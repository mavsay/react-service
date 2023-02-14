import React, { useState } from 'react'
import { cars, works, brandModelService, services } from './data.js';


import './main.css';
import Select from '../ui/select/index.jsx';
import Works from '../ui/works/index.jsx';

const Main = () => {

  // const [autoBrands, setAutoBrands] = useState([{ name: 'Model' }]);
  const [autoBrands, setAutoBrands] = useState([]);

  const autoListener = (auto) => {
    const carSelected = cars.find(car => car.name === auto);
    const models = carSelected.models;
    setAutoBrands([...models.map(item => ({ 'name' : item }))]);
  };

  const modelListener = (model) => {};


  const answerContainer = document.querySelector('.answer_container');

  const createTeg = (teg, className) => {
    const element = document.createElement(teg);
    element.className = className;
    return element;
  };
  
  const createElement = (teg, className, innerText) => {
    const element = document.createElement(teg);
    element.className = className;
    element.innerText = innerText;
    return element;
  };

  const formListener = (event) => {
    event.preventDefault();
    answerContainer.innerHTML = '';

    const fields = Object.values(event.target)

    const workForm = {
      brand: '',
      model: '',
      works: [],
    }

    workForm.brand = fields[0].value;
    workForm.model = fields[1].value;
    const works = fields.slice(2,6);
    works.forEach(work => {
      if (work.checked) workForm.works.push(work.value);
    })

    const matchModel = brandModelService.filter(item => {
      if (item.name === workForm.brand && item.model === workForm.model) return item;
    });

    matchModel.forEach(element => {
      const answerBlock = createTeg('div', 'answer_block');

      const serviceName = createElement('h2', 'service_name', 'сервис: '+ element.service);
      const autoName = createElement('h3', 'auto_name', element.name);
      const modelName = createElement('h3', 'model_name', element.model);

      const answerWorksBlock = createTeg('ul', 'answer_works_block');

      let totalPriceSum = 0;
      workForm.works.forEach(item => {
        const WorkPrice = element.works.find(el => el.operation === item);
        const spanWorkPrice = createElement('span', '', WorkPrice.price + 'р.');
        const liWork = createElement('li', '', item + ': ');
        totalPriceSum += WorkPrice.price;
        liWork.appendChild(spanWorkPrice);
        answerWorksBlock.appendChild(liWork);
      });

      const totalPriceBlock = createTeg('div', 'total_price_block');

      const totalPriceText = createTeg('span', 'total_price');
      totalPriceText.innerText = 'общая стоимость:';
      totalPriceBlock.appendChild(totalPriceText);

      const totalPrice = createTeg('span', 'total_price_sum');
      totalPrice.innerText = totalPriceSum + 'р.';
      totalPriceBlock.appendChild(totalPrice);


      answerBlock.appendChild(serviceName);
      answerBlock.appendChild(autoName);
      answerBlock.appendChild(modelName);
      answerBlock.appendChild(answerWorksBlock);
      answerBlock.appendChild(totalPriceBlock);
      answerContainer.appendChild(answerBlock);
    })
  };

  return (
    <div className="main_wrapper">
      <div className="container">
        <form className="form"
          onSubmit = {event => formListener(event)}
        >

          <Select
            label={"Выберите марку авто"}
            onChange = {autoListener}
            defaultValue = 'Auto'
            options = {cars}
          />

          <Select
            label={"Выберите модель авто"}
            onChange = {modelListener}
            defaultValue = 'Model'
            options = {autoBrands}
          />

          <Works
            worksArr = {works}
          />

          <div className="button_submit_container">
            <button type="submit" className="button_submit">запросить</button>
          </div>
        </form>

        <div className="answer_container">

        </div>

      </div>
    </div>
  )
}

export default Main;