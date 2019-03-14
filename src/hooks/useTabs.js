import { useState } from "react"

const defaultConfig = {
  initialTab: 0,
  initialDisabledTabs: []
}

/**
 * @typedef  {object}             HookResponse
 * @property {number}             activeTab - The index of the current active tab.
 * @property {function()}         selectTab - Change the current active tab index.
 * @property {array}              disabledTabs - Includes indexes of all disabled tabs.
 * @property {function(number)}   isEnabled - Returns true for enabled indexes.
 * @property {function(number)}   isDisabled - Returns true for disabled indexes.          
 * @property {function(number)}   enableTab - For enabling a tab.
 * @property {function(number)}   disableTab - For disabling a tab.

/**
 * @function
 * @name useTabs
 * @description React hook to help create a tabs component. The hook will 
 * keep track of tab indexes that can be enabled or disabled.
 * @author João Pedro R. D. Saldanha <jprasys@gmail.com>
 * @license https://tldrlegal.com/license/mit-license MIT
 *
 * @param  {object}  config - A configuration object
 * @param  {number}  [config.initialTab=0] - The initially selected tab index.
 * @param  {array} [config.initialDisabledTabs=[]] - An array with initially disabled tab indexes.
 *
 * @return {HookResponse} Hook response to be used within your component like props.
 */
export default function useTabs(config = {}) {
  const settings = { ...defaultConfig, ...config }
  const { initialTab, initialDisabledTabs } = settings

  const [activeTab, setActiveTab] = useState(initialTab)
  const [disabledTabs, setDisabledTabs] = useState(initialDisabledTabs)

  const isEnabled = index => !disabledTabs.includes(index)
  const isDisabled = index => !isEnabled(index)

  const selectTab = index => {
    if (index !== activeTab && isEnabled(index)) {
      setActiveTab(index)
    }
  }

  const disableTab = index => {
    if (index !== activeTab && isEnabled(index)) {
      setDisabledTabs(previousDisabledTabs => {
        return [...previousDisabledTabs, index]
      })
    }
  }

  const enableTab = index => {
    if (isDisabled(index)) {
      setDisabledTabs(previousDisabledTabs => (
        previousDisabledTabs.filter(tab => tab !== index)
      ))
    }
  }

  return {
    activeTab,
    selectTab,
    disabledTabs,
    isEnabled,
    isDisabled,
    enableTab,
    disableTab
  }
}
