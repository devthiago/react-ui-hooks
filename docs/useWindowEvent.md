---
id: use-windowevent
title: useWindowEvent
sidebar_label: useWindowEvent
---

## HookResponse

None

### Properties

None

## useWindowEvent

React hook that will subscribe an event in the `window` when the component
is mounted and will unsubscribe the event when the component unmount.

### Parameters

-   `eventName` **[string][1]** Window event name.
-   `func` **[function][2]** Function that will be fire when the event is triggered.
-   `funcDeps` **[array][3]** Function dependecies since we are using `useCallback` in `func`.

Returns nothing.

**Meta**

-   **author**: Felipe Nolleto Nascimento &lt;felipenolletonascimento@gmail.com>
-   **license**: https&#x3A;//tldrlegal.com/license/mit-license MIT

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
