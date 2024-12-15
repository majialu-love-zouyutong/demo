const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdX = parseFloat(birdStyles.left);
const birdY = parseFloat(birdStyles.top);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdX, birdY, 0, 0, birdDom);
    this.g = 800;   // 向下的加速度，单位像素/s^2
    this.maxY = gameHeight - landHeight - birdHeight;
  }
  move(duration) {
    super.move(duration);   // 调用父类方法
    // 根据加速度改变速度
    this.vy = this.vy + this.g * duration;
  }
  onMove() {
    if(this.y < 0) {
      this.y = 0;
    }else if (this.y > this.maxY) {
      this.y = this.maxY;
    }
  }
  jump() {
    this.vy = -300;
  }
}


