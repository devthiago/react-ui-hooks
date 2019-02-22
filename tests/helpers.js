import React, { Fragment } from 'react'
import { render, fireEvent } from 'react-testing-library'

export const getData = (element = { dataset: {} }) => {
  const { type, value, name, testid } = element.dataset
  let parsedValue = value

  switch (type) {
    case 'boolean':
    case 'array':
    case 'object':
    case 'number':
      parsedValue = JSON.parse(value);
      break
    case 'undefined':
      parsedValue = undefined
      break
    default:
      break
  }

  return {
    type,
    name,
    testid,
    value: parsedValue
  }
}

export const TestHookPropElement = ({ name, value }) => {
  const type = Array.isArray(value) ? 'array' : typeof value
  switch (type) {
    case 'boolean':
    case 'array':
    case 'object':
      return (
        <span
          data-testid={name}
          data-name={name}
          data-value={JSON.stringify(value)}
          data-type={type}
          children={name}
        />
      )
    case 'function':
      return (
        <button
          data-testid={name}
          data-name={name}
          data-type={type}
          type='button'
          onClick={value}
          children={name}
        /> 
      )
    default:
      return (
        <span
          data-testid={name}
          data-name={name}
          data-value={value}
          data-type={type}
          children={name}
        />
      )
  }
}

export const TestHookComponent = ({ response, nameArrResponse = [], configProp = {} }) => {
  if (Array.isArray(response)) {
    return (
      <Fragment>
        {response.map((prop, index) => {
          const name = nameArrResponse[index] || index
          return (
            <TestHookPropElement
              key={`test-hook-prop-element-${name}`}
              name={name}
              value={(configProp[name] && configProp[name](prop)) || prop}
            />
          )
        })}
      </Fragment>
    )
  }
  return (
    <Fragment>
      {Object.keys(response).map(key => {
        const prop = response[key]
        return (
          <TestHookPropElement
            key={`test-hook-prop-element-${key}`}
            name={key}
            value={(configProp[key] && configProp[key](prop)) || prop}
          />
        )
      })}
    </Fragment>
  )
}

export const renderHook = (useHook = null, hookParams = [], config = {}) => {
  const ComponentWithHook = () => {
    const response = useHook(...hookParams)
    const hookConfig = {
      nameArrResponse: [],
      configProp: {},
      ...config
    }
    return (
      <TestHookComponent
        response={response}
        nameArrResponse={hookConfig.nameArrResponse}
        configProp={hookConfig.configProp}
      />
    )
  }

  const tools = render(<ComponentWithHook />)
  const { getByTestId } = tools

  const getHookPropValue = propName => {
    const el = getByTestId(propName)
    const { value } = getData(el)
    return value
  }

  const simulateHookProp = (propName, params = {}, action = 'click') => {
    const el = getByTestId(propName)
    fireEvent[action](el, params)
  }

  return {
    ...tools,
    getHookPropValue,
    simulateHookProp
  }
}
