# How to Create a Hook

The purpose of this guide is to help you to create your own UI Hooks. 

------------

### Prerequisites

- Node: any 10.x version.
- `npm` installed.
- Fork [react-ui-hooks repo](https://github.com/devthiago/react-ui-hooks) (for any contributions).
- Get the project on your local machine, following the example: `git clone https://github.com/YOUR-GITHUB-USERNAME/react-ui-hooks.git`.

------------

#### Creating a Hook

- First things first, if you want to create a new hook, you have to give it a name that starts with `use` and then the name of the hook, such as useModal, useSlider, etc.
- If you try to create a hook without this pattern, you'll get an error.

------------

#### Create a Hook file

The `npm run generate:hook` command create 3 files:

- A hook file ***useExample.js***
- The tests file ***useExample.test.js*** 
- The documentation file ***useExample.md***

The hook and its tests files must be updated manually, the documentation file can be updated all at once by using the `npm run generate:docs` command.

------------

### How to create a .js Hook file:

- Open your shell and run the command:

```bash
npm run generate:hook useExample
```

- #####  **After you run the command, you'll get:**

***useExample.js*** on `src/hooks/`

***useExample.test.js*** on `src/tests/hooks`

***useExample.md*** on `docs/`

------------

### Create a new react hook unit test

If you've created your hook manually you can generate its unit test file with the command:

```bash
npm run generate:test useExample.js
```

------------

### Create a new react hook doc:

You can get the doc file of your hook created automaticaly as well!

```bash
npm run generate:docs useExample.js
```

------------

### Generate docs for all react hooks:

As you update the hooks and tests frequently there's a need to update the documentation, so you can do it for all of the hooks with:

```bash
npm run generate:docs
```

This command scans your hooks and its tests to generate the documentation.
