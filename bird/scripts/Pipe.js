const gameWidth = gameDom.clientWidth;
class Pipe extends Rectangle {
  constructor(height, y, speed, dom) {
    super(50, height, gameWidth, y, speed, 0, dom);
  }
  onMove() {
    if (this.x < -this.width) {
      // 移除dom
      this.dom.remove();
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
  constructor(speed) {
    this.spaceHeight = 200; // 空隙位置高度
    this.minHeight = 50;
    this.maxHeight = landTop - this.minHeight - this.spaceHeight;
    const upHeight = getRandom(this.minHeight, this.maxHeight);
    // 创建DOM对象
    const upDom = document.createElement('div');
    const downDom = document.createElement('div');
    upDom.className = 'pipe up';
    downDom.className = 'pipe down';
    this.upPipe = new Pipe(upHeight, 0, speed, upDom);
    const downHeight = landTop - upHeight - this.spaceHeight;
    const downTop = landTop - downHeight;
    this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

    gameDom.appendChild(upDom);
    gameDom.appendChild(downDom);
  }
  get useLess() {
    return this.upPipe.x < -this.upPipe.width;
  }
  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

class PipePairProducer {
  constructor(speed) {
    this.speed = speed;
    this.pairs = [];
    this.timer = null;
    this.tick = 2000;
  }
  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pairs.push(new PipePair(this.speed));
      // 移除用不到的柱子
      for (let i = 0; i < this.pairs.length; i++) {
        var pair = this.pairs[i];
        if (pair.useLess) {
          // 没用的柱子对
          this.pairs.splice(i, 1);
          i--;
        }
      }
    }, this.tick);
  }
  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}


