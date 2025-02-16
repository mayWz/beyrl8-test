export class BinaryTree {
  private _left: BinaryTree | null;
  private _right: BinaryTree | null;
  private _data: string;

  constructor(data: string) {
    this._left = null;
    this._right = null;
    this._data = data;
  }

  get left(): BinaryTree | null {
    return this._left;
  }

  set left(data: string) {
    this._left = new BinaryTree(data);
  }

  get right(): BinaryTree | null {
    return this._right;
  }

  set right(data: string) {
    this._right = new BinaryTree(data);
  }

  get data(): string {
    return this._data;
  }
}
