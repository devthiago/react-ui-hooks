# React UI Hooks

Simple repository of React hooks for building UI components

## The Problem

Before we have React Hooks we had to separate components into logic and view ones, if we would like to share IU logic like a component for tabs. Another way to do that is using components built over CSS frameworks like Bootstrap or Materialize, but we have to change a bunch of style if we want to create our own style. What it means is that style should be unique, your product/application should have an unique design. However, the logic for creating UI components is basically the same.

## This Solution

The `react-ui-hooks` is a repository of React Hooks for UI logic. The main idea on this approach is to share and collaborate hooks to became building UI components easier and to try not "reinventing the wheel" one more time (although be doing this 🧐). As well as writing less of the same logic as always, this project also aims to help teams write less CSS, since we can avoid too much use of unnecessary CSS that comes with components/UI third part  libraries.

## Example

```javascript
import React from 'react'
import { useSlider } from 'react-ui-hooks'
import './style.scss'

const setSlideClassname = (isActive, type = 'slide') => {
  const className = `carousel__${type}`
  if (isActive) {
    return `${className} ${className}--active`
  }
  return className
}

const createSlides = activeSlide => (slide, index) => (
  <li
    className={setSlideClassname(index === activeSlide)}
    key={`slide-item-${index}`}
    children={slide}
  />
)

const createSlideIndicators = (activeSlide, goToSlide = () => null) => (
  (slide, index) => (
    <li key={`slide-indicator-${index}`}>
      <a
        href='!#'
        className={setSlideClassname(index === activeSlide, 'indicator')}
        onClick={() => goToSlide(index)}
      />
    </li>
  )
)

const Carousel = ({ children, ...config }) => {
  const {
    activeSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    goToNextSlide,
    goToPrevSlide
  } = useSlider(children.length, config)

  return (
    <div className='carousel-container'>
      <div className='carousel'>
        <a
          href='!#'
          className='carousel__arrow carousel__arrow--left'
          onClick={goToPrevSlide}
          children={'<'}
        />

        <ul
          className='carousel__slides'
          children={children.map(createSlides(activeSlide))}
        />

        <a
          href='!#'
          className='carousel__arrow carousel__arrow--right'
          onClick={goToNextSlide}
          children={'>'}
        />

        <ul className='carousel__indicators'>
          {children.map(createSlideIndicators(activeSlide, goToSlide))}
        </ul>
      </div>
    </div>
  )
}

export default Carousel
```
