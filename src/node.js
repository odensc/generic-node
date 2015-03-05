import {EventEmitter} from "events";

/**
* Represents a node.
*
* @class
* @implements {EventEmitter}
*/
export default class Node extends EventEmitter
{
	/**
	* The constructor. Takes no parameters.
	*
	* @public
	* @constructor
	*/
	constructor()
	{
		// set instance values
		this._isNode = true;
		this.parent = null;
		this.children = [];
	}

	/**
	* Adds a child node to this node.
	* If the specified node is already a child of a node it will not be added.
	*
	* @public
	* @param node {Node} the node to be added
	* @fires Node#added
	* @returns {boolean} true if the node was added; otherwise false
	*/
	add(node)
	{
		// make sure the node doesn't already have a parent and is an instance of Node
		if (!node._isNode || node.isChild()) return false;
		// set its parent
		node.parent = this;
		// add it to our children
		this.children.push(node);
		/**
		* Added event.
		* Emitted when a node is added to this node.
		*
		* @event Node#added
		* @type {Node}
		* @property {Node} the node that was added
		*/
		this.emit("added", node);
		return true;
	}

	/**
	* Removes a child node from this node.
	*
	* @public
	* @param node {Node} the node to be removed
	* @fires Node#removed
	* @returns {boolean} true if the node was removed; otherwise false
	*/
	remove(node)
	{
		// make sure the node is a Node and we are the parent of the node
		if (!node._isNode || this.children.indexOf(node) === -1) return false;
		// unset its parent
		node.parent = null;
		// remove the node from our children
		this.children.splice(this.children.indexOf(node), 1);
		/**
		* Removed event.
		* Emitted when a node is removed from this node.
		*
		* @event Node#removed
		* @type {Node}
		* @property {Node} the node that was removed
		*/
		this.emit("removed", node);
		return true;
	}

	/**
	* Checks if this node is a child of another node.
	*
	* @public
	* @returns {boolean} true if this node is a child of another node; otherwise false
	*/
	isChild()
	{
		// check if we have a parent
		return this.parent !== null;
	}
};
