<div align="center">
  <h1 style="color: #f9ad05;">React UI Hooks</h1>
</div>

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/devthiago/react-ui-hooks.svg?branch=master)](https://travis-ci.org/devthiago/react-ui-hooks)
[![Coverage Status](https://coveralls.io/repos/github/devthiago/react-ui-hooks/badge.svg?branch=master)](https://coveralls.io/github/devthiago/react-ui-hooks?branch=master)

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

## Documentation

- [How to Create a Hook](HOW-CREATE-A-HOOK.md)
- [Contributing](CONTRIBUTING.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://thiagoalv.es"><img src="https://avatars0.githubusercontent.com/u/5190217?v=4" width="100px;" alt="Thiago Alves Luiz"/><br /><sub><b>Thiago Alves Luiz</b></sub></a><br /><a href="#infra-devthiago" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/devthiago/react-ui-hooks/commits?author=devthiago" title="Code">💻</a></td>
    <td align="center"><a href="http://lattes.cnpq.br/4287615973321905"><img src="https://avatars3.githubusercontent.com/u/28638133?v=4" width="100px;" alt="João Pedro Raskopf"/><br /><sub><b>João Pedro Raskopf</b></sub></a><br /><a href="#infra-jprask" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/devthiago/react-ui-hooks/commits?author=jprask" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/tauan-tathiell/"><img src="https://avatars0.githubusercontent.com/u/16005211?v=4" width="100px;" alt="Tauan Tathiell"/><br /><sub><b>Tauan Tathiell</b></sub></a><br /><a href="https://github.com/devthiago/react-ui-hooks/commits?author=Lukyhenson" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/elainemattos"><img src="https://avatars1.githubusercontent.com/u/10763483?v=4" width="100px;" alt="Elaine Mattos"/><br /><sub><b>Elaine Mattos</b></sub></a><br /><a href="https://github.com/devthiago/react-ui-hooks/commits?author=elainemattos" title="Documentation">📖</a></td>
    <td align="center"><a href="http://about.me/gutofoletto"><img src="https://avatars2.githubusercontent.com/u/1004681?v=4" width="100px;" alt="Guto Foletto"/><br /><sub><b>Guto Foletto</b></sub></a><br /><a href="#review-gutofoletto" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
