import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useTabs from '@hooks/useTabs'

describe('useTabs()', () => {
  beforeEach(cleanup)

  describe('activeTab integer response', () => {
    test('returns 0 when theres no default value', () => {
      const { result } = renderHook(() => useTabs())
      const { activeTab } = result.current
      expect(activeTab).toBe(0)
    })

    test('uses the initialTab config value if provided', () => {
      const config = { initialTab: 5 } 
      const { result } = renderHook(() => useTabs(config))
      const { activeTab } = result.current
      expect(activeTab).toBe(5)
    })
  })

  describe('when selectTab function response is called', () => {
    test('activeTab is equal to the selectTab passed parameter', () => {
      const { result } = renderHook(() => useTabs())
      const { selectTab } = result.current
      act(() => selectTab(1))
      const { activeTab } = result.current
      expect(activeTab).toBe(1)
    })
  
    test('does not change activeTab if called with a disabled index', () => {
      const config = {initialDisabledTabs: [1]}
      const { result } = renderHook(() => useTabs(config))
      const { selectTab } = result.current
      act(() => selectTab(1))
      const { activeTab } = result.current
      expect(activeTab).toBe(0)
    })
  })

  describe('disabledTabs array', () => {
    test('starts at [] by default', () => {
      const { result } = renderHook(() => useTabs())
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([])
    })

    test('uses the initialDisabledTabs config value if provided', () => {
      const config = { initialDisabledTabs: [3, 4, 5] } 
      const { result } = renderHook(() => useTabs(config))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([3, 4, 5])
    })
  })

  describe('disableTab function', () => {
    test('disables a tab if it is enabled', () => {
      const { result } = renderHook(() => useTabs())
      const { disableTab } = result.current
      act(() => disableTab(1))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([1])
    })
    
    test('does not disable the current activeTab', () => {
      const { result } = renderHook(() => useTabs())
      const { disableTab } = result.current
      act(() => disableTab(0))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([])
    })
  })

  describe('enableTab function', () => {
    test('enables a tab if its disabled', () => {
      const config = {initialDisabledTabs: [1]}
      const { result } = renderHook(() => useTabs(config))
      const { enableTab } = result.current
      act(() => enableTab(1))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([])
    })
  
    test('does nothing when called with an already enabled tab as parameter', () => {
      const config = {initialDisabledTabs: [2]}
      const { result } = renderHook(() => useTabs(config))
      const { enableTab } = result.current
      act(() => enableTab(1))
      const { disabledTabs } = result.current
      expect(disabledTabs).toEqual([2])
    })
  })

  describe('isEnabled function response', () => {
    let current = null
  
    beforeAll(() => {
      const config = {initialDisabledTabs: [1]}
      const { result } = renderHook(() => useTabs(config))
      current = result.current
    })
  
    test('returns true if tab index is enabled', () => {
      const { isEnabled } = current
      expect(isEnabled(0)).toBe(true)
    })
  
    test('returns false if tab index is not enabled', () => {
      const { isEnabled } = current
      expect(isEnabled(1)).toBe(false)
    })
  })
})
