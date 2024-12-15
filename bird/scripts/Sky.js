const skyDom = document.querySelector('.sky');
const skyStyles = getComputedStyle(skyDom);
const width = parseFloat(skyStyles.width);
const height = parseFloat(skyStyles.height);

class Sky extends Rectangle {
  constructor() {
    super(width, height, 0, 0, -100, 0, skyDom);
  }
  onMove() {
    if(this.x <= -width/2) {
      this.x = 0;
    }
  }
}

