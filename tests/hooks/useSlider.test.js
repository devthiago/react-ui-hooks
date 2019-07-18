import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useSlider from '@hooks/useSlider'

describe('useSlider()', () => {
  beforeEach(cleanup)

  describe('activeSlide integer response', () => {
    test('returns 0 when theres no default value', () => {
      const { result } = renderHook(() => useSlider())
      const { activeSlide } = result.current
      expect(activeSlide).toBe(0)
    })

    test('uses the activeSlide config value if provided', () => {
      const config = { initialSlide: 3 }
      const { result } = renderHook(() => useSlider(5, config))
      const { activeSlide } = result.current
      expect(activeSlide).toBe(3)
    })
  })

  describe('nextSlide integer response', () => {
    describe('when activeSlide is the last slide on the right', () => {
      test('returns activeSlide', () => {
        const config = { initialSlide: 1, infinite: false }
        const { result } = renderHook(() => useSlider(2, config))
        const { nextSlide } = result.current

        expect(nextSlide).toBe(config.initialSlide)
      })
    })

    describe("when activeSlide isn't the last slide on the right", () => {
      test('returns activeSlide plus one', () => {
        const config = { initialSlide: 1 }
        const { result } = renderHook(() => useSlider(3, config))
        const { nextSlide } = result.current

        expect(nextSlide).toBe(config.initialSlide + 1)
      })
    })
  })

  describe('prevSlide integer response', () => {
    describe('when activeSlide is the last slide on the left', () => {
      test('returns activeSlide', () => {
        const config = { initialSlide: 0, infinite: false }
        const { result } = renderHook(() => useSlider(2, config))
        const { prevSlide } = result.current

        expect(prevSlide).toBe(config.initialSlide)
      })
    })

    describe("when activeSlide isn't the last slide on the left", () => {
      test('returns activeSlide minus one', () => {
        const config = { initialSlide: 2 }
        const { result } = renderHook(() => useSlider(3, config))
        const { prevSlide } = result.current

        expect(prevSlide).toBe(config.initialSlide - 1)
      })
    })
  })

  describe('goToSlide()', () => {
    it('sets activeSlide to the passed index', () => {
      const config = { initialSlide: 0 }
      const { result, rerender } = renderHook(() => useSlider(2, config))
      const { goToSlide } = result.current

      act(() => goToSlide(1))

      expect(result.current.activeSlide).toBe(1)
    })
  })

  describe('goToNextSlide()', () => {
    it('sets activeSlide to the nextSlide', () => {
      const config = { initialSlide: 1 }
      const { result, rerender } = renderHook(() => useSlider(3, config))
      const { goToNextSlide } = result.current

      act(() => goToNextSlide())

      expect(result.current.activeSlide).toBe(2)
    })
  })

  describe('goToPrevSlide()', () => {
    it('sets activeSlide to the prevSlide', () => {
      const config = { initialSlide: 2 }
      const { result, rerender } = renderHook(() => useSlider(3, config))
      const { goToPrevSlide } = result.current

      act(() => goToPrevSlide())

      expect(result.current.activeSlide).toBe(1)
    })
  })
})
