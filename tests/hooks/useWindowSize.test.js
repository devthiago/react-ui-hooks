import { act, renderHook } from 'react-hooks-testing-library';

import useWindowSize from '@hooks/useWindowSize';

const resize = (width, height) => {
  window.innerWidth = width || window.innerWidth;
  window.innerHeight = height || window.innerHeight;
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowSize()', () => {
  let wrapper;

  beforeEach(() => {
    resize(800, 600);
    wrapper = renderHook(() => useWindowSize());
  });

  describe('When component is mounted', () => {
    test('returns the current window size', () => {
      const { result } = wrapper;
      expect(result.current).toEqual({ width: 800, height: 600 });
    });
  });

  describe('When window size changes', () => {
    beforeEach(() => {
      act(() => {
        resize(1024, 768);
      });
    });

    test('returns the new window size', () => {
      const { result } = wrapper;
      expect(result.current).toEqual({ width: 1024, height: 768 });
    });
  });
});
