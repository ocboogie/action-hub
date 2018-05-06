# Action Hub

My vision for Action Hub is a main "hub" for everything you do on your computer: open apps, go to websites, run console commands and just about anything you're willing to make.

Note: This is in very early stages of development.

## How I'm going to do that

### Nodes

Nodes are what you interact with and see on Action Hub.
Examples of nodes:

* Buttons
* Text
* Layout options like a grid

Action Hub will supply a small amount of nodes out of the box, but you can get more through plugins.

Nodes are just React components, so if you can make it with React you can make into a node.
Nodes take attributes (or arguments) and children (nodes).

There will be a `layout.html` file which is how the user will customize the layout of Action Hub. Example of a `layout.html` file:

```html
<grid>
    <text>Top left</text>
    <text>Top right</text>
    <text>Bottom left</text>
    <text>Bottom right</text>
</grid>
```

Note: This is NOT html. You can't just put a `div`, `h1` or other html tags; every tag you use must be a node.
You could imagine it would render something like [this](https://i.imgur.com/g0AQI66.png)

Note that nodes can render other nodes, for example a button node might just be a wrapper around a text node.

### Actions

Actions are what nodes do. For example clicking on a button node runs an action that you defined in the `layout.html` file.
Users define actions and developers define action types.

Examples of action types:

* `url`
  opens a url in the browser
  takes 1 argument
  * the url to go to
* `app`
  opens an app
  takes 1 argument
  * the path to the app
* `cmd`
  runs a cmd command
  takes 1 argument
  * the cmd command to run

Examples of actions:

* `url www.google.com`: this will open google in the browser
* `cmd shutdown`: this will shutdown your computer (only on unix)

Example of the a `layout.html` file:

```html
<button onclick="url www.google.com">
Google
</button>
```

In this example the action is defined within the `onclick` attribute and the action type is `url`. This would render a button when clicked opens google.com.
Each argument is split up by spaces, similar to a command line console.

### Plugins

Plugins are a very essential part to Action Hub, they are what allow you to use someone else's nodes and actions.
Plugins consist of nodes and action types.
For example: a plugin named grid might define a grid node.

## Contributing

1. Install:

```bash
git clone https://github.com/ocboogie/action-hub.git action-hub
cd action-hub
npm install
# yarn (if you use yarn)
```

2. Create a feature branch
3. Make some changes
4. Follow linting rules
5. Successfully run tests
6. Create a pull request
