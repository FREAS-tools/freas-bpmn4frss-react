# FREAS BPMN4FRSS React integration

This project integrates the `freas-bpmn4frss-library` and offers a typed `Bpmn4FrssEditor` to use within any TypeScript-based React project (vanilla JS will be supported once both the library and this integration are finalised and released as NPM packages).

## Prerequisites

- Node 18 LTS with `npm` (tested with Node version 18.16.0 and `npm` version 9.6.6)
- Free port 5000 (can be changed by modifying the code)

## Running this integration locally

To run in conjuction with the React integration, install the dependencies for this project (`freas-bpmn4frss-react`):

```sh
cd path_to_the_library/freas-bpmn4frss-react
npm i
```

Then, head over to the `freas-bpmn4frss-library` and follow the instructions.

After linking the libraries, the last step is to start this application by running the start command in this project's folder:

```sh
npm start
```

This starts a web server listening on port 5000.


> Note: currently not transpiled to regular JavaScript, so it only works with React projects that use TypeScript and are able to transpile it themselves.