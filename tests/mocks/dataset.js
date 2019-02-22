export const types = {
  string: {
    name: 'foo',
    value: 'bar',
    type: 'string',
    testid: 'foo'
  },
  boolean: {
    name: 'isValid',
    value: true,
    type: 'boolean',
    testid: 'isValid'
  },
  array: {
    name: 'list',
    value: [1, 2, 3],
    type: 'array',
    testid: 'list'
  },
  object: {
    name: 'comp',
    value: { a: 1, b: 2, c: 3 },
    type: 'object',
    testid: 'comp'
  },
  function: {
    name: 'fn',
    value: () => 'working',
    type: 'function',
    testid: 'fn'
  },
  number: {
    name: 'integer',
    value: 276,
    type: 'number',
    testid: 'integer'
  },
  undefined: {
    name: 'undef',
    value: undefined,
    type: 'undefined',
    testid: 'undef'
  }
}

export const dataTypes = Object.keys(types).reduce((obj, key) => {
  const item = types[key]
  let parsedItem = { dataset: item }
  if (item.type !== 'function' && item.type !== 'string') {
    parsedItem =  {
      dataset: {
        ...item,
        value: JSON.stringify(item.value)
      }
    }
  }
  return { ...obj, [key]: parsedItem }
}, {})
