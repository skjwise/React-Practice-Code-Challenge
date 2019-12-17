import React, { Fragment } from 'react'

const Sushi = props => {
  return (
    <Fragment>
      <div className="sushi">
        <div className="plate" 
            onClick={() => props.eat(props.sushi)}>
          { 
            /* Tell me if this sushi has been eaten! */ 
            props.taken ? null : (<img src={props.sushi.img_url} width="100%" alt={props.name} /> 
            )}
        </div>
        <h4 className="sushi-details">
          {props.sushi.name} - ${props.sushi.price}
        </h4>
      </div>
    </Fragment>
  )
}

export default Sushi;