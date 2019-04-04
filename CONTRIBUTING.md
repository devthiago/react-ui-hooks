# CONTRIBUTING

Contributions are always welcome and we appreciate.

### Prerequisites

- Git.
- Node: any 8.x version.
- `yarn`: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/) or `npm`: See [Npm web site for installation instructions](https://www.npmjs.com/get-npm).
- A fork of the repo (for any contributions).
- A clone of the [react-ui-hooks repo](https://github.com/devthiago/react-ui-hooks) on your local machine, following the example:
`git clone https://github.com/your-username/react-ui-hooks.git`.

#### Create a branch

- `cd react-ui-hooks`
- `git checkout master` from any folder in your local `react-ui-hooks` repository.
- `git pull origin master` to ensure you have the latest main code.
- `git checkout -b name-of-my-branch` to create a branch.

### Create new approaches or make changes

- Make the changes or create a new Hook (Detailed explanation can be found at [How to Create a Hook](HOW-CREATE-A-HOOK.md)).
- Save the files and check in the browser.
- Make the tests.
- Check if the tests are all passing `yarn test`.

### Push it

- `git add .`
- `git commit -m "My message"` (replacing `My message` with a commit message, such as `It Creates a new plugin`) to stage and commit your changes
- `git push my-fork-name name-of-my-branch`
- Go to the [react-ui-hooks repo](https://github.com/devthiago/react-ui-hooks) and you should see recently pushed branches.
- Follow GitHub's instructions.
- If possible, include screenshots of visual changes.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
