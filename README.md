# generic-node
An implementation of a node in JavaScript.

## API
### new Node()
The constructor. Takes no parameters.

**Example:**
```js
var node = new Node();
```

### #add(Node)
Adds a child node to this node.

If the specified node is already a child of a node it will not be added.

Returns true if the node was added; otherwise false.

**Example:**
```js
var parentNode = new Node();
var node = new Node();
parentNode.add(node); // -> true
parentNode.add({dummy: "object"}); // -> false!
```

#### Event: "added"
Emitted when a node is added to this node.
Provides the node that was added as a property in the callback.

**Example:**
```js
parentNode.on("added", function(addedNode)
{
	console.log("a node was added to parentNode: ", addedNode);
});
```

### #remove(Node)
Removes a child node from this node.
Returns true if the node was removed; otherwise false.

**Example:**
```js
var parentNode = new Node();
var node = new Node();
parentNode.remove(node); // -> true
parentNode.remove({dummy: "object"}); // -> false!

function removeNode()
{
	parentNode.remove(node);
}
setTimeout(removeNode, 1000);
```

#### Event: "removed"
Emitted when a node is removed from this node.
Provides the node that was removed as a property in the callback.

**Example:**
```js
parentNode.on("removed", function(removedNode)
{
	console.log("a node was removed from parentNode: ", removedNode);
});
```

### #isChild()
Checks if this node is a child of another node.

Returns true if this node is a child of another node; otherwise false.

**Example:**
```js
var parentNode = new Node();
var node = new Node();
parentNode.add(node);
node.isChild(); // -> true
parentNode.isChild() // -> false, this node has no parent
```
