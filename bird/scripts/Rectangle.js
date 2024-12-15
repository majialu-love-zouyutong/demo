/**
 * 矩形类，可以移动
 * 属性：宽度，高度，横坐标，纵坐标，横向速度(px/s)，纵向速度(px/s)，对应的dom对象
 * 方法：移动，重绘
 * 向右向下为正方向
 */
class Rectangle {
  constructor(width, height, x, y, vx, vy, dom) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.dom = dom;
    this.render();
  }
  onMove() {}

  // 重绘
  render() {
    this.dom.style.left = this.x + 'px';
    this.dom.style.top = this.y + 'px';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
  }

  /**
   * 按照矩形的速度和指定的时间，移动矩形
   * @param {number} duration 单位：秒
   */
  move(duration) {
    const dx = this.vx * duration;
    const dy = this.vy * duration;
    this.x += dx;
    this.y += dy;
    // 可能会发生一些事
    if (this.onMove) {
      this.onMove();
    }
    // 重绘
    this.render();
  }
}
