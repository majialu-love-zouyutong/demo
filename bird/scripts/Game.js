class Game {
  constructor() {
    this.sky = new Sky();
    this.land = new Land(-100);
    this.bird = new Bird();
    // 柱子对生成器
    this.pipeProducer = new PipePairProducer(-100);
    this.timer = null;
    this.tick = 16;
    this.gameOver = false;
  }
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload();
    }
    this.pipeProducer.startProduce(); // 开始生成柱子
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.pipeProducer.pairs.forEach((pair) => {
        pair.move(duration);
      });
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
      }
    }, this.tick);
  }
  isHit(rec1, rec2) {
    // 横向：看两个矩形的中心点的距离，是否小于矩形宽度之和的一半
    // 纵向：看两个矩形的中心点的距离，是否小于矩形高度之和的一半
    var centerX1 = rec1.x + rec1.width / 2;
    var centerY1 = rec1.y + rec1.height / 2;
    var centerX2 = rec2.x + rec2.width / 2;
    var centerY2 = rec2.y + rec2.height / 2;
    if (
      Math.abs(centerX1 - centerX2) < (rec1.width + rec2.width) / 2 &&
      Math.abs(centerY1 - centerY2) < (rec1.height + rec2.height) / 2
    ) {
      return true;
    }
    return false;
  }
  isGameOver() {
    if (this.bird.y === this.bird.maxY) {
      return true;
    }
    for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
      const pair = this.pipeProducer.pairs[i];
      if (
        this.isHit(this.bird, pair.upPipe) ||
        this.isHit(this.bird, pair.downPipe)
      ) {
        return true;
      }
    }
    return false;
  }
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.pipeProducer.stopProduce();
    alert('Game Over');
    window.location.reload();
  }

  /**
   * 关联键盘事件
   */
  regEvent() {
    document.onkeydown = (e) => {
      if (e.key === 'Enter') {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === ' ') {
        this.bird.jump();
      }
    };
  }
}

var game = new Game();
game.regEvent();
