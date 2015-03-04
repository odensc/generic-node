import chai from "chai";
import Node from "../src/node";
var should = chai.should();

describe("Node", function()
{
	describe("#constructor()", function()
	{
		describe("instance values", function()
		{
			it("should set this._isNode to true", function()
			{
				var node = new Node();
				node._isNode.should.be.true;
			});

			it("should set this.parent to null", function()
			{
				var node = new Node();
				should.equal(node.parent, null);
			});

			it("should set this.children to empty array", function()
			{
				var node = new Node();
				node.children.should.have.length(0);
			});
		});
	});

	describe("#add(Node)", function()
	{
		it("should add node to children array", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.add(node);
			parentNode.children.should.contain(node);
		});

		it("should set node's parent value", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.add(node);
			node.parent.should.equal(parentNode);
		});

		it("should emit added event", function(cb)
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.on("added", function(addedNode)
			{
				addedNode.should.equal(node);
				cb();
			});
			parentNode.add(node);
		});

		it("should return false if it isn't a Node", function()
		{
			var parentNode = new Node();
			parentNode.add({dummy: "object"}).should.be.false;
		});

		it("should return false if it already has a parent", function()
		{
			var parentNode = new Node();
			var otherParentNode = new Node();
			var node = new Node();
			parentNode.add(node);
			otherParentNode.add(node).should.be.false;
		});

		it("should return true if everything's fine", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.add(node).should.be.true;
		});
	});

	describe("#remove(Node)", function()
	{
		it("should remove node from children array", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.add(node);
			parentNode.remove(node);
			parentNode.children.should.not.contain(node);
		});

		it("should set node's parent value to null", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.remove(node);
			should.equal(node.parent, null);
		});

		it("should emit removed event", function(cb)
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.on("removed", function(removedNode)
			{
				removedNode.should.equal(node);
				cb();
			});
			parentNode.remove(node);
		});

		it("should return false if it isn't a Node", function()
		{
			var parentNode = new Node();
			parentNode.remove({dummy: "object"}).should.be.false;
		});

		it("should return true if everything's fine", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.remove(node).should.be.true;
		});
	});

	describe("#isChild()", function()
	{
		it("should return true if child", function()
		{
			var parentNode = new Node();
			var node = new Node();
			parentNode.add(node);
			node.isChild().should.be.true;
		});

		it("should return false if not child", function()
		{
			var node = new Node();
			node.isChild().should.be.false;
		});
	});
});
