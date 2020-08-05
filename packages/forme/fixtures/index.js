import React from 'react'


//-----------------------------------------------------------------------------

export const Card = (props) => (
  <div className="card" {...props} />
)

// Card.renderHandle = "card"

//-----------------------------------------------------------------------------

export const CardImg = (props) => (
  <img className="cardImg" {...props} />
)

// CardImg.renderHandle = "img"

//-----------------------------------------------------------------------------

export const CardText = (props) => (
  <p className="CardText" {...props} />
)

// CardText.renderHandle = "text"

//-----------------------------------------------------------------------------

export const CardBody = (props) => (
  <div className="CardBody" {...props} />
)

// CardBody.renderHandle = "body"

//-----------------------------------------------------------------------------

export const CardTitle = (props) => (
  <h1 className="CardTitle" {...props} />
)

// CardTitle.renderHandle = "title"

//-----------------------------------------------------------------------------

export const CardSubtitle = (props) => (
  <h2 className="CardSubtitle" {...props} />
)

// CardSubtitle.renderHandle = "subtitle"

//-----------------------------------------------------------------------------

export const Button = ({ text }) => (
  <button className="Button">{text}</button>
)

// Button.renderHandle = "button"

//-----------------------------------------------------------------------------

export default {
  card: Card,
  img: CardImg,
  text: CardText,
  body: CardBody,
  title: CardTitle,
  subtitle: CardSubtitle,
  button: Button
}