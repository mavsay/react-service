import { cars, brandModelService } from './data.js';

export const initData = {
  services: [],
  autoModels: [],
  carInfo: {
    brand: '',
    model: ''
  },
  isDropped: {
    isAutoDropped: false,
    isModelDropped: false,
  },
  showNotification: false,
  showNotificationBrand: false,
  showNotificationModel: false,
  showNotificationWorks: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'autoListener': {
      let autoModels = [...state.autoModels];
      const brand = action.brand || state.carInfo.brand;

      if (action.brand) {
        const carSelected = cars.find(car => car.name === brand);
        const models = carSelected.models;
        autoModels = models.map(item => ({ 'name' : item }));
      }

      return {
        ...state,
        carInfo: { ...state.carInfo, brand },
        autoModels
      };
    }

    case 'modelListener': {
      const model = action.model || state.carInfo.model;

      return {
        ...state,
        carInfo: { ...state.carInfo, model },
      };
    }

    case 'toggleSelects': {

      const obj = { ...state.isDropped };
      for (const key in state.isDropped) {
        if (key === action.name) obj[action.name] = !obj[action.name]
        else obj[key] = false
      }

      return {
        ...state,
        isDropped: obj
      };
    }

    case 'formListener': {

      action.event.preventDefault();

      const fields = Object.values(action.event.target)
      const works = fields
        .filter(item => item.name === 'work' && item.checked)
        .reduce((acc, work) => {
          acc[work.value] = work.value
          return acc;
        }, {});

      const matchModel = brandModelService.filter(item => (
        item.name === state.carInfo.brand && item.model === state.carInfo.model
      ));

      const services = matchModel
        .map(item => {
          const checkedWorks = item.works.filter(work => works[work.operation]);
          const totalPrice = checkedWorks.reduce((acc, work) => acc += work.price , 0);
          return { ...item, works: checkedWorks, totalPrice };
        })
        .filter(service => service.works.length > 0);

      const showNotification = services.length === 0;
      const showNotificationBrand = fields[0].innerText.toLowerCase() !== "auto";
      const showNotificationModel = fields[1].innerText.toLowerCase() !== "model";
      const showNotificationWorks = services.length !== 0;

      return {
        ...state,
        services,
        showNotification,
        showNotificationBrand,
        showNotificationModel,
        showNotificationWorks
      };
    }

    default: {
      try {
        throw Error('Unknown action: ' + action.type);
      } catch (error) {
        console.log(error);
      }

      return state;
    }
  }

};


