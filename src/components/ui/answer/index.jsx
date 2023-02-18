const Answer = ({services}) => {

  return (
    <div className="answer_container">
      {services.map(item => (
        <div className="answer_block" key={item.service}>
          <h2 className="service_name">сервис: {item.service}</h2>
          <h3 className="auto_name">{item.name}</h3>
          <h3 className="model_name">{item.model}</h3>
          <ul className="answer_works_block">
            {item.works.map(work => (
              <li key={work.operation}>
                {work.operation}: <span className="">{work.price}р.</span>
              </li>
            ))}
          </ul>
          <div className="total_price_block">
            <span className="total_price">общая стоимость:</span>
            <span className="total_price_sum">{item.totalPrice}р.</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Answer;