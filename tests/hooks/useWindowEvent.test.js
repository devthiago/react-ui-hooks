import { renderHook } from 'react-hooks-testing-library';
import useWindowEvent from '@hooks/useWindowEvent';

describe('useWindowEvent()', () => {
  const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  const eventName = 'resize';
  const callback = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = renderHook(() => useWindowEvent(eventName, callback));
  });

  describe('When component is mounted', () => {
    test('subscribes event in window', () => {
      expect(addEventListenerSpy).toBeCalledWith(eventName, callback);
    });
  });

  describe('When component is unmounted', () => {
    beforeEach(() => {
      wrapper.unmount();
    })

    test('unsubscribes event in window', () => {
      expect(removeEventListenerSpy).toBeCalledWith(eventName, callback);
    });
  });

  describe('When event is triggered', () => {
    beforeEach(() => {
      callback.mockClear();
      window.dispatchEvent(new Event(eventName));
    })

    test('calls callback function', () => {
      expect(callback).toBeCalled();
    });
  });
})
