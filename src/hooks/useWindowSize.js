import { useState } from 'react';
import useWindowEvent from '@hooks/useWindowEvent';

const getWindowWidth = () => window.innerWidth;
const getWindowHeight = () => window.innerHeight;

/**
 * @typedef  {object}           HookResponse
 * @property {number}           width - Current window width.
 * @property {number}           height - Current window height.
 */

/**
 * @function
 * @name useWindowSize
 * @description React hook to get the current window size (width, height).
 * This hook will listen the resize window event to always keep the size up to date.
 * @author Felipe Nolleto Nascimento <felipenolletonascimento@gmail.com>
 * @license https://tldrlegal.com/license/mit-license MIT
 *
 * @return {HookResponse} Hook response to be used within your component like props
 */
export default function useWindowSize() {
  const [width, setWidth] = useState(getWindowWidth());
  const [height, setHeight] = useState(getWindowHeight());

  useWindowEvent('resize', () => {
    setWidth(getWindowWidth());
    setHeight(getWindowHeight());
  });

  return { width, height };
}
