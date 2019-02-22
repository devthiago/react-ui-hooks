import React from 'react'
import { renderHook } from '@test-helpers'
import useSlider from '@hooks/useSlider'

describe('useSlider()', () => {
  test('Describe what you are testing', () => {
    const { getHookPropValue } = renderHook(useSlider)
    const prop = getHookPropValue('prop')
    expect(prop).toBeTruthy()
  })
})