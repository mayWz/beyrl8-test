import { BinaryTree } from "./binaryTree";

export class BinaryTreeNodeCounter {
  public static countNodes(binaryTree: BinaryTree) {
    if (binaryTree === null) return 0;

    return (
      1 + this.countNodes(binaryTree.left) + this.countNodes(binaryTree.right)
    );
  }
}

const tree = new BinaryTree("root");
tree.left = "root-left";
tree.right = "root-right";
tree.left.left = "root-left-left";
tree.left.right = "root-left-right";

const result = BinaryTreeNodeCounter.countNodes(tree);
console.log(result);
