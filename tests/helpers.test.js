import React, { useState } from 'react'
import { render, fireEvent } from 'react-testing-library'
import { types, dataTypes } from '@test-mocks/dataset'
import {
  getData,
  TestHookPropElement,
  TestHookComponent,
  renderHook
} from '@test-helpers'

describe('getData([object])', () => {
  test('when type is string parses the value as expected', () => {
    const { value } = getData(dataTypes.string)
    expect(value).toBe(types.string.value)
  })

  test('when type is boolean parses the value as expected', () => {
    const { value } = getData(dataTypes.boolean)
    expect(value).toBe(types.boolean.value)
  })

  test('when type is array parses the value as expected', () => {
    const { value } = getData(dataTypes.array)
    expect(value).toEqual(types.array.value)
  })

  test('when type is object parses the value as expected', () => {
    const { value } = getData(dataTypes.object)
    expect(value).toEqual(types.object.value)
  })

  test('when type is function parses the value as expected', () => {
    const { value } = getData(dataTypes.function)
    expect(value()).toBe(types.function.value())
  })

  test('when type is number parses the value as expected', () => {
    const { value } = getData(dataTypes.number)
    expect(value).toBe(types.number.value)
  })

  test('when type is undefined parses the value as expected', () => {
    const { value } = getData(dataTypes.undefined)
    expect(value).toBe(types.undefined.value)
  })
})

describe('<TestHookPropElement />', () => {
  let el = null
  let attr = null

  beforeAll(() => {
    const { getByTestId } = render(<TestHookPropElement {...types.string} />)
    el = getByTestId(types.string.testid)
    attr = getData(el)
  })

  test('renders the expected data-testid attribute', () => {
    expect(attr.testid).toBe(types.string.testid)
  })

  test('renders the expected data-name attribute', () => {
    expect(attr.name).toBe(types.string.name)
  })

  describe('when receives a boolean value', () => {
    beforeAll(() => {
      const { getByTestId } = render(<TestHookPropElement {...types.boolean} />)
      el = getByTestId(types.boolean.testid)
      attr = getData(el)
    })

    test('renders the expected data-type attribute', () => {
      expect(attr.type).toBe(types.boolean.type)
    })

    test('renders the expected data-value attribute', () => {
      expect(attr.value).toBeTrue
    })
  })

  describe('when receives an array value', () => {
    beforeAll(() => {
      const { getByTestId } = render(<TestHookPropElement {...types.array} />)
      el = getByTestId(types.array.testid)
      attr = getData(el)
    })

    test('renders the expected data-type attribute', () => {
      expect(attr.type).toBe(types.array.type)
    })

    test('renders the expected data-value attribute', () => {
      expect(attr.value).toEqual(types.array.value)
    })
  })

  describe('when receives an object value', () => {
    beforeAll(() => {
      const { getByTestId } = render(<TestHookPropElement {...types.object} />)
      el = getByTestId(types.object.testid)
      attr = getData(el)
    })

    test('renders the expected data-type attribute', () => {
      expect(attr.type).toBe(types.object.type)
    })

    test('renders the expected data-value attribute', () => {
      expect(attr.value).toEqual(types.object.value)
    })
  })

  describe('when receives a number value', () => {
    beforeAll(() => {
      const { getByTestId } = render(<TestHookPropElement {...types.number} />)
      el = getByTestId(types.number.testid)
      attr = getData(el)
    })

    test('renders the expected data-type attribute', () => {
      expect(attr.type).toBe(types.number.type)
    })

    test('renders the expected data-value attribute', () => {
      expect(attr.value).toBe(types.number.value)
    })
  })

  describe('when receives an undefined value', () => {
    beforeAll(() => {
      const { getByTestId } = render(<TestHookPropElement {...types.undefined} />)
      el = getByTestId(types.undefined.testid)
      attr = getData(el)
    })

    test('renders the expected data-type attribute', () => {
      expect(attr.type).toBe(types.undefined.type)
    })

    test('renders the expected data-value attribute', () => {
      expect(attr.value).toBe(types.undefined.value)
    })
  })

  describe('when receives a function value', () => {
    beforeAll(() => {
      const { getByTestId } = render(<TestHookPropElement {...types.function} />)
      el = getByTestId(types.function.testid)
      attr = getData(el)
    })

    test('renders the expected data-type attribute', () => {
      expect(attr.type).toBe(types.function.type)
    })

    test('calls the expected onClick function', () => {
      const spy = jest.fn()
      const { getByTestId } = render(<TestHookPropElement {...types.function} value={spy} />)
      fireEvent.click(getByTestId(types.function.testid))
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})

describe('<TestHookComponent />', () => {
  const objResp = {
    count: 2,
    name: 'James',
    setName: () => null
  }
  const arrResp = [
    objResp.count,
    objResp.name,
    objResp.setName
  ]

  let props = null
  const getComponentProps = newProps => ({
    response: null,
    nameArrResponse: [],
    configProp: {},
    ...newProps
  })

  describe('when receives an object response', () => {
    beforeAll(() => {
      props = getComponentProps({ response: objResp })
    })

    test('renders the expected element with the count prop', () => {
      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('count')
      const { type, name, value } = getData(el)

      expect(type).toBe('number')
      expect(name).toBe('count')
      expect(value).toBe(2)
    })

    test('renders the expected element with the name prop', () => {
      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('name')
      const { type, name, value } = getData(el)
      
      expect(type).toBe('string')
      expect(name).toBe('name')
      expect(value).toBe('James')
    })

    test('calls the expected onClick function', () => {
      const setName = jest.fn()
      props = getComponentProps({
        response: {
          ...objResp,
          setName
        }
      })

      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('setName')
      const { type, name } = getData(el)
      
      expect(type).toBe('function')
      expect(name).toBe('setName')

      fireEvent.click(el)
      expect(setName).toHaveBeenCalledTimes(1)
    })
  })

  describe('when receives an array response', () => {
    beforeAll(() => {
      props = getComponentProps({ response: arrResp })
    })

    test('renders the expected element with the count prop', () => {
      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('0')
      const { type, name, value } = getData(el)

      expect(type).toBe('number')
      expect(name).toBe('0')
      expect(value).toBe(2)
    })

    test('renders the expected element with the name prop', () => {
      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('1')
      const { type, name, value } = getData(el)
      
      expect(type).toBe('string')
      expect(name).toBe('1')
      expect(value).toBe('James')
    })

    test('calls the expected onClick function', () => {
      const setName = jest.fn()
      const [ count, name ] = arrResp
      props = getComponentProps({
        response: [
          count,
          name,
          setName
        ]
      })

      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('2')
      const { type, name: dataName } = getData(el)
      
      expect(type).toBe('function')
      expect(dataName).toBe('2')

      fireEvent.click(el)
      expect(setName).toHaveBeenCalledTimes(1)
    })
  })

  describe('when receives an array response and rename its props', () => {
    beforeAll(() => {
      props = getComponentProps({
        response: arrResp,
        nameArrResponse: ['count', 'name', 'setName']
      })
    })

    test('renders the expected element with the count prop', () => {
      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('count')
      const { type, name, value } = getData(el)

      expect(type).toBe('number')
      expect(name).toBe('count')
      expect(value).toBe(2)
    })

    test('renders the expected element with the name prop', () => {
      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('name')
      const { type, name, value } = getData(el)
      
      expect(type).toBe('string')
      expect(name).toBe('name')
      expect(value).toBe('James')
    })

    test('calls the expected onClick function', () => {
      const setName = jest.fn()
      const [ count, name ] = arrResp
      props = getComponentProps({
        ...props,
        response: [
          count,
          name,
          setName
        ]
      })

      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('setName')
      const { type, name: dataName } = getData(el)
      
      expect(type).toBe('function')
      expect(dataName).toBe('setName')

      fireEvent.click(el)
      expect(setName).toHaveBeenCalledTimes(1)
    })
  })

  describe('when handle the functions response', () => {
    test('calls the expected onClick function', () => {
      const setName = jest.fn()
      props = getComponentProps({
        response: {
          ...objResp,
          setName
        },
        configProp: {
          setName: fn => () => fn('someProp')
        }
      })

      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('setName')
      const { type, name } = getData(el)
      
      expect(type).toBe('function')
      expect(name).toBe('setName')

      fireEvent.click(el)
      expect(setName).toHaveBeenCalledTimes(1)
    })

    test('calls the expected onClick function with the expected param', () => {
      const setName = jest.fn()
      props = getComponentProps({
        response: {
          ...objResp,
          setName
        },
        configProp: {
          setName: fn => () => fn('someProp')
        }
      })

      const { getByTestId } = render(<TestHookComponent {...props} />)
      const el = getByTestId('setName')
      const { type, name } = getData(el)
      
      expect(type).toBe('function')
      expect(name).toBe('setName')

      fireEvent.click(el)
      expect(setName).toHaveBeenCalledWith('someProp')
    })
  })
})

describe('renderHook([function, array[, object]])', () => {
  describe('when covers the React useState hook functionality', () => {
    test('returns the expected state value', () => {
      const { getHookPropValue } = renderHook(useState, [2], {
        nameArrResponse: ['count', 'setCount']
      })

      const count = getHookPropValue('count')
      expect(count).toBe(2)
    })

    test('returns the expected new state value', () => {
      const { getHookPropValue, simulateHookProp } = renderHook(useState, [2], {
        nameArrResponse: ['count', 'setCount'],
        configProp: {
          setCount: fn => () => fn(3)
        }
      })

      simulateHookProp('setCount')
      const count = getHookPropValue('count')
      expect(count).toBe(3)
    })
  })
})