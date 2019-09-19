import { useCallback, useEffect } from 'react'

/**
 * @typedef  {object}           HookResponse
 */

/**
 * @function
 * @name useWindowEvent
 * @description React hook that will subscribe an event in the `window` when the component
 * is mounted and will unsubscribe the event when the component unmount.
 * @author Felipe Nolleto Nascimento <felipenolletonascimento@gmail.com>
 * @license https://tldrlegal.com/license/mit-license MIT
 *
 * @param  {string}  eventName - Window event name.
 * @param  {function}  func - Function that will be fire when the event is triggered.
 * @param  {array}  funcDeps - Function dependecies since we are using `useCallback` in `func`.
 *
 * @return {HookResponse} Nothing.
 */
export default function useWindowEvent(eventName, func, funcDeps = []) {
  const newFunc = useCallback(func, funcDeps);

  useEffect(() => {
    window.addEventListener(eventName, newFunc);
    return () => window.removeEventListener(eventName, newFunc);
  }, []);
};
