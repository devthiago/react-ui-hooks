# How to Create a Hook

The purpose of this guide is to help you to create your own UI Hooks. 

------------

### Prerequisites

- Node: any 8.x version.
- `yarn` or `npm` installed.
- A clone of the [react-ui-hooks repo](https://github.com/devthiago/react-ui-hooks) on your local machine, following the example:
`git clone https://github.com/your-username/react-ui-hooks.git`.

------------

#### Creating a Hook

- First things first, if you want to create a new hook, you have to give it a name that starts with `use` and then the name of the hook, such as useModal, useSlider, etc.
- if you try create a hook without this pattern, you'll get an error.

------------

#### Create a Hook file

The `generate:hook` command create 3 files:

- A hook file ***useExample.js***
- The tests file ***useExample.test.js*** 
- The documentation file ***useExample.md***

The hook and tests files must to be updated manually, the documentation file can be updated by the `generate:docs` command all at once.

------------

### How to create a .js Hook file:

- Open your shell and run the command:

```bash
npm run generate:hook useExample
```
or
```bash
yarn generate:hook  useExample
```

- #####  **After you run the command, you'll get:**

***useExample.js*** on src/hooks/ 

***useExample.test.js*** on src/tests/hooks 

***useExample.md*** on docs/

------------

### Create a new react hook unit test

If you've created your hook manually you can generate the unit test file for it with the command:

```bash
npm run generate:test useExample.js
```
or
```bash
yarn generate:test useExample.js
```

------------

### Create a new react hook doc:

You can get the doc file of your hook created automaticaly as well!

```bash
npm run generate:docs useExample.js
```
or
```bash
yarn generate:docs useExample.js
```
------------

### Generate docs for all react hooks:

As you update the hooks and tests frequently there's a need to to update the documentation, so you can do it for all of the hooks with:

```bash
npm run generate:docs
```
or

```bash
yarn generate:docs
```

This command is going to check all of your hooks and hooks tests and generate the documentation!
