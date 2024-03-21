# React Intro

- [React Intro](#react-intro)
  - [Homework](#homework)
  - [Suggested Reading](#suggested-reading)
  - [Create React App](#create-react-app)
    - [Examining the Project Structure](#examining-the-project-structure)
    - [JSX](#jsx)
  - [JSX requirements and features](#jsx-requirements-and-features)
    - [Project Prep](#project-prep)
  - [The React Developer Tool](#the-react-developer-tool)
  - [Components](#components)
  - [Props](#props)
  - [DEMO Children](#demo-children)
  - [Calling a Function](#calling-a-function)
  - [Importing and Exporting Components](#importing-and-exporting-components)
    - [Array.map Quick Review](#arraymap-quick-review)
  - [Convert the Pirate component to a standalone component](#convert-the-pirate-component-to-a-standalone-component)
  - [Aside: Class Components](#aside-class-components)
  - [Rendering Multiple Components](#rendering-multiple-components)
  - [State](#state)
  - [React Forms](#react-forms)
  - [React Forms](#react-forms-1)
  - [Pirates State](#pirates-state)
    - [Passing a Function as a Prop](#passing-a-function-as-a-prop)
  - [Resetting the Form](#resetting-the-form)
  - [Removing Pirates](#removing-pirates)
  - [Additional Form Fields](#additional-form-fields)
  - [Persisting the data](#persisting-the-data)
  - [JSON Server](#json-server)
  - [Deploying](#deploying)


Today we will build this [minimal React site](http://react-pirates.netlify.app).

<!-- with realtime database storage from Google's Firebase. -->

## Homework

Provide buttons that filter (i.e. by date), sort (i.e. by name) and reduce (i.e. total years lived of all) the pirates and show the results in the UI.

## Suggested Reading

- [The Main Concepts of React](https://reactjs.org/docs/hello-world.html)
- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Create React App

Creating a React project requires a lot of tooling and setup. Fortunately Facebook has created a "bootstrapping" system called [Create React App](https://facebook.github.io/create-react-app/) which creates a new React project with a single command and includes a development server, a build process, and testing facilities. It will also initialize git and create a `.gitignore` file. _For this reason you may wish to avoid creating a new project in a folder that is already a git repository._

To create a new project, ensure that you are cd'ed in today's (non-repository) project folder and run:

<!-- --use-npm -->

```sh
$ npx create-react-app pirates
```

Note: `npm` _manages_ packages while `npx` _executes_ Node packages. 

The first argument `create-react-app` is the name of the npm package you are executing, the second `pirates` is the name of the project.

Be aware the CRA is not the only [option](https://hackernoon.com/create-react-app-is-dead-here-are-some-alternatives) available for creating a React project. You can also use [Vite](https://vitejs.dev/) or [Snowpack](https://www.snowpack.dev/). It just happens to be the easiest for beginners.

Change directories and open the project:

```sh
$ cd pirates
$ code .
```

Open VS Code's terminal and type `$ npm run start`.

### Examining the Project Structure

Open `index.html` from the `pirates/public` folder.

- Everything is inserted into this div:`<div id="root"></div>`

Open `index.js` from `src`.

- This is the only place where `ReactDOM.render()` will occur:

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`index.js` is the entry to the entire project. It imports `App` and renders it to the DOM.

Open `App.js` (note the capital "A") from `src`.

This is a React component, the only one in this starter project.

`import` and `export` are part of the ES6 Module system that allows us to break down code into smaller pieces. When we are in development a "bundler" is working to manage JavaScript files in memory for speed. This feature is being provided to us via [Webpack](https://webpack.js.org/) which has been installed by Create React App and is working under the hood in our project.

Webpack includes the development server that allows us to work with our site while developing. It also allows us to build or compile our site for production.

DEMO: Run a test build and examine the contents.

The main body of the component is a function that _returns_ JSX, despite appearances JSX is _not_ HTML.

### JSX

Note this sample code:

```js
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Ahoy!</h1>
    </div>
  );
}

export default App;
```

You cannot use HTML in JavaScript as shown above. The portion that looks like HTML is [JSX](https://react.dev/learn/writing-markup-with-jsx) and is transformed into regular JavaScript:

```js
import React from "react";

function App() {
  return React.createElement(
    "div",
    {
      className: "App",
    },
    React.createElement("h1", null, "Ahoy!")
  );
}
```

The library responsible for this is called [Babel](https://babeljs.io/). It was installed by Create React App. An alternative to Babel is TypeScript.

## JSX requirements and features

Examining `App.js` we note:

1. `src={logo}` - JSX curly braces allow the use of JavaScript expressions
2. `className="App-header"` - `class` is a reserved word in JavaScript so we use the JS alternative className
3. `<Component />` xhtml style closing tags - every element in JSX needs to be closed

Be aware that everything returned by a component must be nested in a single tag - i.e. this is not allowed:

```js
function App() {
  return (
  <h1>Ahoy!</h1>
  <p>Hello there</p>
  )
}
```

Instead you would need to write something like:

```js
function App() {
  return (
    <div>
     <h1>Ahoy!</h1>
     <p>Hello there</p>
   </div>
  )
}
```


Commenting code in JSX is different than JavaScript comments and is supported in VS Code. Try commenting the following line using the `cmd-/` shortcut:

`{/* <h1>Ahoy!</h1> */}`

Save and note the hot reloading.

### Project Prep

## The React Developer Tool

Install the [React Developer Tool](https://chrome.google.com/webstore/search/react) for Chrome or Firefox and inspect the component to make sure it is working.

Use the [React Developer Tool](https://chrome.google.com/webstore/search/react) to inspect:

- https://www.netflix.com/ - inspect a button
- https://www.codecademy.com/ - inspect a form field, - note the key property on repeated or 'mapped' UI elements.
- https://www.nytimes.com/ - inspect an image

Note: Emmet [may become confused](https://stackoverflow.com/questions/51617570/emmet-autocomplete-is-not-functioning-in-jsx) when not using `.jsx` extensions. Add this to your VS Code preferences:

```js
"emmet.includeLanguages": {
    "javascript": "javascriptreact"
}
```

IMPORTANT - Copy the `data` and `assets` folders from `reference` to the `src` directory in `pirates`.

Import our fonts and clean up the default html template.

Copy the material below and overwrite `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Pirata+One"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Trade+Winds"
      rel="stylesheet"
    />

    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />

    <title>Pirates!</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Components

All modern front end systems employ a component architecture.

Create and use a Pirate component in `App.js`:

```js
import React from "react";

function App() {
  return <Pirate />;
}

function Pirate() {
  return <p>Ahoy there!</p>;
}

export default App;
```

## Props

Add a property (`prop`) to the Pirate component instance in `App.js`:

```js
function App() {
  return <Pirate tagline="Ahoy from the Pirate Component" />;
}
```

And render it:

```js
function Pirate(props) {
  return <p>{props.tagline}</p>;
}
```

We can [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the tagline variable from props:

```js
function Pirate({ tagline }) {
  return <p>{tagline}</p>;
}
```

See `destructuring` and `rest-spread` in the reference directory of this repo.

The fact that you can pass props to a reusable component makes them very powerful.

DEMO:

```js
function App() {
  return (
    <div>
      <Pirate tagline="Ahoy from the Pirate Component" />
      <Pirate tagline="Pirate Component" />
      <Pirate tagline="Ahoy" />
    </div>
  );
}
```

---

## DEMO Children

React includes children as a property. I.e:

```js
// Note: this structure is simplified
function App() {
  return React.createElement(
    (type: "h1"),
    (props: {
      id: "wrapper",
      children: "Hello World",
    })
  );
}
```

DEMO:

Note how below we are _not_ using `<Pirate />` as a self-closing tag:

```js
import React from "react";

function App() {
  return <Pirate name="John">Avast</Pirate>;
}

function Pirate(props) {
  return (
    <p>
      {props.children} {props.name}
    </p>
  );
}

export default App;
```

If we use destructuring our components would look a little better:

```js
import React from "react";

function App() {
  return <Pirate name="John">Avast</Pirate>;
}

function Pirate({ name, children }) {
  return (
    <p>
      {children} {name}
    </p>
  );
}

export default App;
```

A term you will hear a lot is "composition" or "compose." A key feature of React is the composition of reusable components.

---

1. Create a `components` folder in `src/components/` to hold our components
1. Move the `App.js` component into the new directory and correct any import errors
1. Create a new component `Header.js` in the components directory:

```js
import React from "react";

function Header() {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>FooBar</h1>
    </div>
  );
}

export default Header;
```

Note any errors.

Import the logo and some css for it at the top:

```js
import "../assets/css/Header.css";
import logo from "../assets/img/anchor.svg";
```

Import Header and render it to the DOM via App.js while passing it a title prop:

```js
import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header title="Pirate Database!" />
      <Pirate tagline="Ahoy from the Pirate Component" />
    </div>
  );
}

function Pirate({ tagline }) {
  return <p>{tagline}</p>;
}

export default App;
```

Use the title prop:

```js
function Header(props) {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>{props.title}</h1>
    </div>
  );
}
```

Destructure it:

```js
function Header({ title }) {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>{title}</h1>
    </div>
  );
}
```

Inspect the output using the React Developer Tool.

## Calling a Function

In `App.js` create an array of pirate quotes and a randomize function that selects a random pirateCall:

```js
const pirateCalls = [
  "Aaarg, belay that!",
  "Avast me hearties!",
  "Shiver me timbers!",
];

function randomize() {
  return pirateCalls[Math.floor(Math.random() * pirateCalls.length)];
}
```

Since these are plain JavaScript and do not require React we can create them _outside_ the App component.

Call the `randomize` function and pass the results to the Header as a `title` prop:

```js
function App() {
  return (
    <div>
      <Header title={randomize()} />
      <Pirate tagline="Ahoy from the Pirate Component" />
    </div>
  );
}
```

Note: it would be more common to see an arrow function being employed.

Change the randomize function:

```js
const randomize = () =>
  pirateCalls[Math.floor(Math.random() * pirateCalls.length)];
```

Note: by declaring the function as a variable we are creating a [function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#function_declaration_hoisting).

## Importing and Exporting Components

### Array.map Quick Review

1. [.map()](https://www.freecodecamp.org/news/the-ultimate-guide-to-javascript-array-methods-map/)

```js
var arr = [1, 2, 3];

var multiplyByTwo = arr.map(function (num) {
  return (num *= 2);
});

console.log(multiplyByTwo);
```

2. [.filter()](https://www.freecodecamp.org/news/javascript-map-reduce-and-filter-explained-with-examples/)

```js
var arr = [1, 2, 3];

var filterLessThanThree = arr.filter(function (num) {
  return num < 3;
});

console.log(filterLessThanThree);
```

3. [.reduce](https://www.freecodecamp.org/news/reduce-f47a7da511a9/)

```js
var arr = [1, 2, 3];

var arrayTotal = arr.reduce(function (total, amount) {
  return total + amount;
}, 0);

console.log(arrayTotal);
```

The above refactored:

```js
var arr = [1, 2, 3];

var multiplyByTwo = arr.map((num) => (num *= 2));
var filterLessThanThree = arr.filter((num) => num < 3);
var arrayTotal = arr.reduce((total, amount) => total + amount);

console.log(multiplyByTwo);
console.log(filterLessThanThree);
console.log(arrayTotal);
```

---

## Convert the Pirate component to a standalone component

- Delete the Pirate component from `App.js`
- Create `Pirate.js` in the new `components` folder

In `src/components/Pirate.js`:

```js
import React from "react";
import "../assets/css/Pirate.css";

function Pirate(props) {
  return (
    <section>
      <p>Favorite saying: {props.tagline}</p>
    </section>
  );
}

export default Pirate;
```

Use the component in `App.js` by first importing it and then returning it:

```js
import React from "react";
import Header from "./components/Header";
import Pirate from "./components/Pirate";

const pirateCalls = [
  "Aaarg, belay that!",
  "Avast me hearties!",
  "Shiver me timbers!",
];

const randomize = () =>
  pirateCalls[Math.floor(Math.random() * pirateCalls.length)];

function App() {
  return (
    <div>
      <Header title={randomize()} />
      <Pirate tagline="Ahoy from the Pirate Component" />
    </div>
  );
}

export default App;
```

## Aside: Class Components

There is an older component type called a class component. We will focus on functional components in this class, but you should have a passing familiarity with class components if only to ignore solutions and older articles that use them.

Here is a comparison between and functional component and a class component:

```js
function PirateFunc(props) {
  return (
    <section>
      <p>Favorite saying: {props.tagline}</p>
    </section>
  );
}

class PirateClass extends React.Component {
  render() {
    return (
      <section>
        <p>Favorite saying: {this.props.tagline}</p>
      </section>
    );
  }
}
```

Note the render method and `this` in the paragraph. The JavaScript `this` keyword refers to the object it belongs to. Confusion around 'this' and the class-flavored syntax is a major reason the React team moved away from class to function components.

A functional component is just a plain JavaScript function which accepts props as an argument and returns a React element. A class component requires you to extend from `React.Component` and create a render function which returns a React element.

You should be familiar with class components - they have been the primary method of working in React for many years. Many older posts, articles, and even the current React documentation use the class syntax.

## Rendering Multiple Components

Import an array of sample pirates into `App.js` and open the file in the editor to examine it:

```js
import piratesFile from "./data/sample-pirates-array";
```

In `App.js` create multiple pirates using `.map()`:

```js
function App() {
  return (
    <div>
      <Header title={randomize()} />
      <div className="pirate">
        {piratesFile.map((pirate) => (
          <Pirate tagline={randomize()} />
        ))}
      </div>
    </div>
  );
}
```

Pass some data from the piratesFile as an additional property:

```js
function App() {
  return (
    <div>
      <Header title={randomize()} />
      <div className="pirate">
        {piratesFile.map((pirate) => (
          <Pirate tagline={randomize()} name={pirate.name} />
        ))}
      </div>
    </div>
  );
}
```

In `Pirate.js` we access the data via props:

```js
function Pirate(props) {
  return (
    <section>
      <h2>{props.name}</h2>
      <p>Favorite saying: {props.tagline}</p>
    </section>
  );
}
```

Note the browser console warning: "Each child in a list should have a unique "key" prop."

Review keys in the [React](https://reactjs.org/docs/lists-and-keys.html#keys) documentation.

Use the pirates name as a unique id in `App.js`:

```js
<Pirate key={pirate.name} tagline={randomize()} name={pirate.name} />
```

In App.js, instead of passing just the name (`name={pirate.name}`) we will pass the entire pirate object (`pirate={pirate}`):

```js
function App() {
  return (
    <div>
      <Header title={randomize()} />
      <div className="pirate">
        {piratesFile.map((pirate) => (
          <Pirate key={pirate.name} tagline={randomize()} pirate={pirate} />
        ))}
      </div>
    </div>
  );
}
```

Note that the name disappears in the UI but we do not get an error.

Correct it with:

```js
function Pirate(props) {
  return (
    <section>
      <h3>{props.pirate.name}</h3>
      <p>Favorite saying: {props.tagline}</p>
    </section>
  );
}
```

---

## State

State is data at a particular moment in time. It’s the current “state” of your data.

JavaScript frameworks, including React, Angular and Vue, use state _and_ components to make managing UI easier.

In an ideal world your data, or state, is the single source of truth for your application and your UI is an expression of that state.

When you update your data/state, your framework renders a new copy of the UI based on the new data. You never have to think about which element in the DOM to target or how it needs to change.

Under the hood React uses a virtual DOM to invisibly render components. Then it compares the actual DOM to the virtual DOM and performs a "diff" - an analyses of the differences between the two. Afterwards it surgically updates only those portions of the actual DOM that need to be updated. The entire page is never refereshed.

- state is internal and controlled by the component itself
- props are external and controlled by whatever component renders the component
- props always flow down the document tree, never up

We will be using React hooks to manage state in our app.

`ussState` returns an array with two elements which we destructure into two variables. The first being the data and the second a function to update the data.

Create a the following as `State.jsx` in the components directory:

```js
import React from "react";

export default function Test() {
  // HERE
  const [steps, setSteps] = React.useState(0);

  // unlike our randomize function this needs to be inside the component definition
  function increment() {
    setSteps((steps) => steps + 1);
  }

  return (
    <div>
      Today you've taken {steps} steps!
      <br />
      {/* Note: not increment() */}
      <button onClick={increment}>I took another step</button>
    </div>
  );
}
```

Import it into App and compose it.

---

```js
function App() {
  // we initialize our state with the piratesFile
  const [pirates, setPirates] = React.useState(piratesFile);
  return (
    <div>
      <Header title={randomize()} />
      <div className="pirate">
        {/* we map over the pirates state, not the piratesFile */}
        {pirates.map((pirate) => (
          <Pirate key={pirate.name} tagline={randomize()} pirate={pirate} />
        ))}
      </div>
    </div>
  );
}
```

Note: `{pirates.map((pirate) => (` - we are now initializing the pirates state with piratesFile in state.

Import an avatar in Pirate.js:

`import avatar from '../assets/img/avatar.png';`

and use the new pirate prop:

```js
function Pirate(props) {
  return (
    <section>
      <summary>
        <img src={avatar} alt="pirate" />
        <h3>{props.pirate.name}</h3>
        <ul>
          <li>Died: {props.pirate.year}</li>
          <li>Weapon: {props.pirate.weapon}</li>
          <li>Vessel: {props.pirate.vessel}</li>
        </ul>
      </summary>
      <article>
        <h2>{props.tagline}</h2>
        <p>{props.pirate.desc}</p>
      </article>
    </section>
  );
}
```

Destructure the variables from this.props:

```js
function Pirate(props) {
  const { name, year, weapon, vessel, desc } = props.pirate;
  const { tagline } = props;

  return (
    <section>
      <summary>
        <img src={avatar} alt="pirate" />
        <h3>{name}</h3>
        <ul>
          <li>Died: {year}</li>
          <li>Weapon: {weapon}</li>
          <li>Vessel: {vessel}</li>
        </ul>
      </summary>
      <article>
        <h2>{tagline}</h2>
        <p>{desc}</p>
      </article>
    </section>
  );
}
```

Edit Pirate.css:

```css
.pirate {
  max-width: 80vw;
  margin: 2rem auto;
}

h2 {
  font-family: "Trade Winds", cursive;
}

section {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted black;
  margin-bottom: 1rem;
}

article {
  flex: 1;
}
```

Refine the destructuring:

```js
function Pirate({ pirate, tagline }) {
  const { name, year, weapon, vessel, desc } = pirate;
  ...
}
```

Another possible refinement:

```js
function Pirate({
  pirate: { name, year, weapon, vessel, desc },
  tagline,
}) {
...
}
```

Note: Images can be problematic for new React devs. `avatar.png` is included in the sample-pirates-array data:

```js
const pirates = [
  {
    name: "John Rackham",
    image: "avatar.png", // HERE
    desc:
      "Rackham deposed Charles Vane from his position as captain of the sloop Ranger, then cruised the Leeward Islands, Jamaica Channel and Windward Passage. He accepted a pardon in 1719 and moved to New Providence, where he met Anne Bonny. He returned to piracy in 1720 by stealing a British sloop and Anne joined him.",
    year: 1720,
    weapon: "Sword",
    vessel: "Bounty",
  },
```

We can try to destructure it in the Pirate component and use it in the JSX:

```js
function Pirate({
  pirate: { name, year, weapon, vessel, desc, image },
  tagline,
}) {
  return (
    <section>
      <summary>
        <img src={`../assets/img/${image}`} alt="pirate" />
        <h3>{name}</h3>
```

But we would need to copy the asset into public in order for the link to function as the path is relative to index.html.

## React Forms

Create a new component `AddPirate.js` in the components folder:

```js
import React from "react";
import "../assets/css/AddPirateForm.css";

const AddPirate = () => {
  return (
    <form>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
    </form>
  );
};

export default AddPirate;
```

Import AddPirate and compose it in `App.js`:

```js
import AddPirate from "./components/AddPirate";
...
function App() {
   const [pirates, setPirates] = React.useState(piratesFile);
  return (
    <div>
      <Header title={randomize()} />
      <div className="pirate">
        <AddPirate />
        {pirates.map((pirate) => (
          <Pirate key={pirate.name} tagline={randomize()} pirate={pirate} />
        ))}
      </div>
    </div>
  );
}
```

Click on the Add Pirate submit button. The entire page reloads.

Try:

```html
<form onSubmit={(event) => event.preventDefault()}>
```

Create a function in `AddPirate`:

```js
function createPirate(event) {
  event.preventDefault();
  console.log("making a pirate");
}
```

Add an onSubmit handler to the AddPirate component:

```js
const AddPirate = () => {
  return (
    <form onSubmit={createPirate}>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
    </form>
  );
};
```

Click on the Add Pirate button to test.

---

## React Forms

Using the first input field as an exemplar, Add:

- state to store the pirate name,
- a label with `htmlFor`,
- an input id that matches the value of htmlFor,
- a value attribute that displays the pirate name
- an onChange property that runs a function when the user enters information

```js
const [pirateName, setPirateName] = React.useState("");
...
<label htmlFor="pirateName">Name</label>
<input
  id="pirateName"
  type="text"
  placeholder="Pirate name"
  value={pirateName}
  onChange={(event) => setPirateName(event.target.value)}
/>
```

Try entering a pirate name while examining the state in React devtools.

Create a pirate object in `AddPirate`'s `createPirate` function.

`AddPirate.js`:

```js
const createPirate = (event) => {
  event.preventDefault();
  const pirate = {
    name: pirateName,
  };
  console.log(pirate);
};
```

Test by entering a pirate name in the form and examining the browser console.

Add vessel and weapon to the form

```js
  const [vessel, setVessel] = React.useState("");
  const [weapon, setWeapon] = React.useState("");
  ...
<form onSubmit={createPirate}>
  <label htmlFor="pirateName">Name</label>
  <input
    id="pirateName"
    type="text"
    placeholder="Pirate name"
    value={pirateName}
    onChange={(event) => setPirateName(event.target.value)}
  />
  <label htmlFor="vessel">Vessel</label>
  <input
    id="vessel"
    type="text"
    placeholder="Pirate vessel"
    value={vessel}
    onChange={(event) => setVessel(event.target.value)}
  />
  <label htmlFor="weapon">Weapon</label>
  <input
    id="weapon"
    type="text"
    placeholder="Pirate weapon"
    value={weapon}
    onChange={(event) => setWeapon(event.target.value)}
  />
  <button type="submit">Add Pirate</button>
</form>
```

Add them to the createPirate function:

```js
const createPirate = (event) => {
  event.preventDefault();
  const pirate = {
    name: pirateName,
    vessel: vessel,
    weapon: weapon,
  };
  console.log(pirate);
};
```

Examine the AddPirate component in the React dev tools.

---

## Pirates State

Currently the pirates data/state is located in `App.js`:

```js
const [pirates, setPirates] = React.useState(piratesFile);
```

Add a method to `App.js` that will eventually accept the new pirate created by the form:

```js
const addPirate = (pirate) => {
  console.log(" from the App component ::: ", pirate);
};
```

### Passing a Function as a Prop

We need to make the `addPirate` function available to `AddPirate` by passing it down the component chain:

```js
<AddPirate addPirate={addPirate} />
```

Examine the props in React tool. We have passed the function in App.js down to the component as a property.

We will use `createPirate` to develop a pirate object and then pass the object to addPirate.

In `AddPirate` - destructure the prop:

```js
const AddPirate = ({ addPirate }) => {
```

and call the function:

```js
const createPirate = (event) => {
  event.preventDefault();
  const pirate = {
    name: pirateName,
    vessel: vessel,
    weapon: weapon,
  };
  addPirate(pirate);
};
```

Note the console.

In `App.js`, expand on the addPirate function.

We have two variables:

1. `pirate` - the newly created pirate created via the form
2. `pirates` - the existing collection of pirates

Spread a copy of the current state into a new newPirates variable:

```js
const addPirate = (pirate) => {
  const newPirates = [...pirates];
  newPirates.unshift(pirate);
  setPirates(newPirates);
};
```

And test by adding a new pirate.

The `Array.unshift()` method adds an element to the beginning of an array.

Whenever you change state it triggers a re-rendering of the content without refreshing the entire page - just those elements that need to change.

Use a better way of accomplishing the same state change:

```js
const addPirate = (pirate) => {
  const newPirates = [...pirates, pirate];
  setPirates(newPirates);
};
```

if we want our new pirate to appear first:

```js
const addPirate = (pirate) => {
  const newPirates = [pirate, ...pirates];
  setPirates(newPirates);
};
```

Another, even more concise function, uses a variable `prev` - setPirates has access to previous state.

```js
const addPirate = (pirate) => {
  pirate.image = "avatar.png";
  setPirates((prev) => [pirate, ...prev]);
};
```

The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) `...` creates a new array using an existing array. (See the spreads examples in the reference folder.)

Test it. We should now be able to create a pirate using the form and see it in the browser.

## Resetting the Form

When we click "Add Pirate" the form still holds the data so we need to reset it.

In `AddPirate`:

```js
const createPirate = (event) => {
  event.preventDefault();

  const pirate = {
    name: pirateName,
    vessel: vessel,
    weapon: weapon,
  };

  addPirate(pirate);

  setPirateName("");
  setVessel("");
  setWeapon("");
};
```

The form fields should now be empty after submitting.

Note: there will be a warning related to `keys` at this point if you submit a priate with the same name.

## Removing Pirates

We want a remove pirate function to be associated with each Pirate entry but our pirates' state is located in the top level App component.

Add a stub function to `App`:

```js
const removePirate = () => {
  console.log("removing a pirate");
};
```

Since we are going to create a delete button in each Pirate instance, we'll pass the function down to the Pirate component:

```js
<div className="pirate">
  <AddPirate addPirate={addPirate} />
  {pirates.map((pirate) => (
    <Pirate
      key={pirate.name}
      tagline={randomize()}
      pirate={pirate}
      removePirate={removePirate}
    />
  ))}
</div>
```

Add a button to the `Pirate` component after the description and destructure the new prop:

```js
function Pirate({
  pirate: { name, year, weapon, vessel, desc },
  tagline,
  removePirate,
}) {
  return (
    <section>
      <summary>
        <img src={avatar} alt="pirate" />
        <h3>{name}</h3>
        <ul>
          <li>Died: {year}</li>
          <li>Weapon: {weapon}</li>
          <li>Vessel: {vessel}</li>
        </ul>
      </summary>
      <article>
        <h2>{tagline}</h2>
        <p>{desc}</p>
        <button onClick={removePirate}>Remove Pirate</button>
      </article>
    </section>
  );
}
```

Test the button to ensure everything is wired correctly.

In `Pirate.js`:

```js
<button onClick={() => removePirate(name)}>Remove Pirate</button>
```

Note that we are now passing a parameter to the function: `removePirate(name)` and we are using an arrow function: `() => removePirate(name)`. What would happen if we didn't use the function form and just used `removePirate(name)`?

Add a filter to the function in App.js:

```js
const removePirate = (pirateName) => {
  const newPirates = pirates.filter((pirate) => pirate.name !== pirateName);
  setPirates(newPirates);
  // setPirates([...newPirates]);
};
```

---

## Additional Form Fields

Our form is still missing fields for the year of death and description.

In AddPirateForm.js:

```js
// add two pieces of state
  const [death, setDeath] = React.useState("");
  const [desc, setDesc] = React.useState("");
  ...
// add the new state to the create pirate function
  const createPirate = (event) => {
  event.preventDefault();

  const pirate = {
    name: pirateName,
    vessel: vessel,
    weapon: weapon,
    death: death,
    desc: desc
  };
  addPirate(pirate);
  setPirateName("");
  setVessel("");
  setWeapon("");
  setDeath("");
  setDesc("");
};
...
// add two labels and input fields for the data
  <label htmlFor="died">Died</label>
  <input
    id="died"
    type="text"
    placeholder="Date of death"
    value={death}
    onChange={(event) => setDeath(event.target.value)}
  />
  <label htmlFor="desc">Description</label>
  <textarea
    id="desc"
    placeholder="Pirate description"
    value={desc}
    onChange={(event) => setDesc(event.target.value)}
  />
```

## Persisting the data

## JSON Server

Add a new package to the project:

```sh
$ npm install json-server
```

Add a script in `package.json`:

```json
"json": "json-server pirates.json --port 3001"
```

Add the pirates.json file from the reference directory to the root of the project and run the server in a second terminal.

```js
  React.useEffect(() => {
    fetch("http://localhost:3001/pirates")
      .then((res) => res.json())
      .then((data) => {
        setPirates(data);
      });
  }, []);
  ```

## Deploying

There are many good options for deploying this project. At its simplest, we can use any web server.

Add the following to `package.json`:

```js
"homepage": ".",
```

Run `$ npm run build` on the command line and upload the build folder to the server of your choice.

