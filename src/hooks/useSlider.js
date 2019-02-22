import { useState, useEffect } from 'react'

const defaultConfig = {
  initialSlide: 0,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1
}

/**
 * @typedef  {object}           HookResponse
 * @property {number}           activeSlide - Array index referred to the current active slide.
 * @property {(number|null)}    nextSlide - Array index referred to the next slide. If it's null, the active slide is the last. If it's smaller than the active slide, the Slider component is an infinite one.
 * @property {(number|null)}    prevSlide - Array index referred to the previous slide. If it's null, the active slide is the first. If it's bigger than the active slide, the Slider component is an infinite one.
 * @property {function(number)} goToSlide - Function responsible for changing the slider state, moving to the desired slide. This function waits for the slide index number as argument.
 * @property {function()}       goToNextSlide - Function to change the slider state, moving to the next slide.
 * @property {function()}       goToPrevSlide - Function to change the slider state, moving to the previous slide.
 */

/**
 * @function
 * @name useSlider
 * @description React hook to help on creation of slider/carousel components.
 * @author Thiago Alves <me@thiagoalv.es>
 * @license https://tldrlegal.com/license/mit-license MIT
 * 
 * @param  {number}  length - Slides/slider items amount.
 * @param  {object}  config - Slider configuration object.
 * @param  {number}  [config.initialSlide=0] - Which slide will be the first one.
 * @param  {boolean} [config.infinite=true] - If it's true the slider will reach the first slide when try move forward after has been arrived to the last one. Same will happen if it's on the first slide and try move backward, it will reach the last one.
 * @param  {boolean} [config.autoplay=false] - If it's true the slider will start swapping slides automatically.
 * @param  {number}  [config.autoplaySpeed=200] - Defines how fast (ms) the slides will be swapped when the autoplay is true.
 * @param  {number}  [config.slidesToShow=1] - How many slides will be shown at the same moment.
 * @param  {number}  [config.slidesToScroll=1] - How many slides will be swapped when the change action (go forward or backward) is triggered.
 * 
 * @return {HookResponse} Hook response to be used within your component like props
 */
export default function useSlider(length = 0, config = {}) {
  const settings = { ...defaultConfig, ...config }
  const {
    initialSlide,
    infinite,
    slidesToScroll,
    autoplay,
    autoplaySpeed
  } = settings
  
  const [activeSlide, setActiveSlide] = useState(initialSlide)

  const lastSlide = length - 1
  const isRightLimit = activeSlide === lastSlide
  const isLeftLimit = activeSlide === 0

  let nextSlide = isRightLimit ? activeSlide : activeSlide + slidesToScroll
  let prevSlide = isLeftLimit ? activeSlide : activeSlide - slidesToScroll

  if (infinite && isRightLimit) {
    nextSlide = 0
  } else if (infinite && isLeftLimit) {
    prevSlide = lastSlide
  }

  const goToSlide = index => setActiveSlide(index)
  const goToNextSlide = () => setActiveSlide(nextSlide)
  const goToPrevSlide = () => setActiveSlide(prevSlide)

  let timeoutID = null

  useEffect(() => {
    if (autoplay && (infinite || !isRightLimit)) {
      timeoutID = setTimeout(goToNextSlide, autoplaySpeed)
    }
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
    }
  })

  return {
    activeSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    goToNextSlide,
    goToPrevSlide
  }
}
