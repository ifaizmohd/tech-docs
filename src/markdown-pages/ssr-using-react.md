---
title: "React Server Side Rendering"
date: "2023-01-07"
tags: "ReactJS, SSR"
---

# React Server Side Rendering(SSR).

In this post, we are going to talk about server-side rendering using react.

If you are wondering what Server-Side Rendering(SSR) means, here is a quick introduction.

There are two types of rendering mechanisms -

- Client Side Rendering.
- Server Side Rendering.

In client-side rendering, the user's browser is responsible for rendering the content, i.e., your react code will be compiled by the browser's javascript engine and then generate the Html out of that. On the other hand, in server-side rendering, your react components will be rendered on the server and sent to the client.

### Why is SSR getting popular these days?

SSR brings a lot of added functionalities to the web app. One of the key benefits is better search engine optimization. As Html is pre-generated on the server, it allows search engine crawlers to extract the metadata of the web page to provide better indexing. It also holds performance improvements like faster initial load time.

### How to achieve Server-Side Rendering with ReactJS.

There are many frameworks and libraries, which provide SSR functionality out of the box - Remix, NextJS, etc. But in this post, we will set up a project which allows us to do SSR.

We will be using ExpressJS. Express is a NodeJS web application framework that allows us to set up a backend server and handle HTTP requests.

### Setting up new project.

1. Create a new directory.
   `mkdir react-ssr`

2. Initialize new project by running `yarn init` or `npm init`.

3. Create server.js file in the root directory. This will be the entry point of our application.

_Here is an example server.js file -_

```javascript
import express from "express"
import renderer from "./helpers/renderer"

const app = express()
const port = 3000
app.use(express.static("public"))

app.get("*", (req, res) => {
  res.send(renderer())
})

app.listen(port, () => console.log(`app is running on ${port}`))
```

At this point, our server is ready to serve the requests. Now, lets create a simple react component which we are going to send through our server.

4. Create a src directory inside the root directory.

5. Create a client directory inside src.

6. Create a component folder inside client.

Your directory structure will looks like -

_Home component_

```javascript
import React from "react"

const Home = () => {
  return (
    <div>
      <div>I'm SSR Home component</div>
    </div>
  )
}

export default Home
```

Untill now, we have created a server and a Home component. As you have seen in the above code snippet, we are sending
`renderer(req)`. This is a custom function we've made to sent down react components.

_Code for `renderer()` function follows._

```javascript
import { renderToString } from "react-dom/server"
import Home from "../client/components/Home"

export default () => {
  const content = renderToString(<Home />)
  return `
    <html>
        <head></head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>
  `
}
```

If you noticed in the above code snippet, we've used `renderToString()` method from `ReactDOMServer`, React will return an Html string. You can use this method to generate Html on the server and serves on the initial request for faster page loads.

As of now, our react component is rendered on the browser, if we try to attach react synthetic events, it won't work, because we just shipped the Html template to the client.

To bind the events onto the template, we need to hydrate the Html DOM on the client.

_Hydration code follows as -_

```javascript
import React from "react"
import ReactDom from "react-dom"

ReactDom.hydrate(<Home />, document.querySelector("#root"))
```
