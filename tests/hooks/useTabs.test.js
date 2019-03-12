import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useTabs from '@hooks/useTabs'

/**
 * Contract
 *  - Track current actuive tab
 *    * Start at 0
 *    * or config value
 *    * Change with select tab
 *    * Not allowing disabled
 *  - Track disabled tabs
 *    * Start at []
 *    * or config value
 *    * Change with disableTab
 *    * and enableTab
 *    * not allowing to disable active
 */
describe('useTabs()', () => {
  beforeEach(cleanup)

  describe('tracks current active tab', () => {
    test('starts at 0', () => {
      const { result } = renderHook(() => useTabs())
      const { activeTab } = result.current
      expect(activeTab).toBe(0)
    })

    test('or with value in config', () => {
      const config = { initialTab: 5 } 
      const { result } = renderHook(() => useTabs(config))
      const { activeTab } = result.current
      expect(activeTab).toBe(5)
    })

    test('changing with selectTab', () => {
      const { result } = renderHook(() => useTabs())
      const { selectTab } = result.current
      act(() => selectTab(1))
      const { activeTab } = result.current
      expect(activeTab).toBe(1)
    })

    test('not allowing to use disabled', () => {
      const config = {initialDisabledTabs: [1]}
      const { result } = renderHook(() => useTabs(config))
      const { selectTab } = result.current
      act(() => selectTab(1))
      const { activeTab } = result.current
      expect(activeTab).toBe(0)
    })
  })

  describe('tracks current disabled tabs', () => {
    test('starting at []', () => {
      const { result } = renderHook(() => useTabs())
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([])
    })

    test('or with value in config', () => {
      const config = { initialDisabledTabs: [3, 4, 5] } 
      const { result } = renderHook(() => useTabs(config))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([3, 4, 5])
    })

    test('changing with disableTab', () => {
      const { result } = renderHook(() => useTabs())
      const { disableTab } = result.current
      act(() => disableTab(1))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([1])
    })

    test('allowing enableTab', () => {
      const config = {initialDisabledTabs: [1]}
      const { result } = renderHook(() => useTabs(config))
      const { enableTab } = result.current
      act(() => enableTab(1))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([])
    })

    test('when nescessary', () => {
      const config = {initialDisabledTabs: [2]}
      const { result } = renderHook(() => useTabs(config))
      const { enableTab } = result.current
      act(() => enableTab(1))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([2])
    })

    test('not allowing to disable active', () => {
      const { result } = renderHook(() => useTabs())
      const { disableTab } = result.current
      act(() => disableTab(0))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([])
    })

    test('offering an isEnabled function', () => {
      const config = {initialDisabledTabs: [1]}
      const { result } = renderHook(() => useTabs(config))
      const { isEnabled } = result.current
      expect(isEnabled(0)).toBe(true)
      expect(isEnabled(1)).toBe(false)
    })
  })

})
