import { renderHook } from 'react-hooks-testing-library'
import useSlider from '@hooks/useSlider'

describe('useSlider()', () => {
  test('Describe what you are testing', () => {
    const { result } = renderHook(() => useSlider())
    const { activeSlide } = result.current
    expect(activeSlide).toBe(50)
  })
})
