import React from 'react'

const ShowNotification = (state) => {

  return (
    <div className='showNotification'>
      {
        !state.state.showNotificationBrand
          ? 'Выберите пожалуйста: брэнд, модель и услуги'
          : !state.state.showNotificationModel
            ? 'Выберите пожалуйста: модель и услуги'
            : !state.state.showNotificationWorks
              ?'Выберите пожалуйста: услуги':''
      }
    </div>
  )
};

export default ShowNotification;