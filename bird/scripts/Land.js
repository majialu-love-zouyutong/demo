const landDom = document.querySelector('.land');
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle {
  constructor(speed) {
    super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
  }
  onMove() {
    if (this.x <= -landWidth/2) {
      this.x = 0;
    }
  }
}

