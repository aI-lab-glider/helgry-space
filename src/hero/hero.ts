import { Vector2D } from "../utils/vector";
import { Weather } from "../weather/weather";
import "p5";
import { Environemnt } from "../environment/environment";
import { Obstacle } from "../obstacle/obstacle";

export class Hero {
  //private sprite;
  jumpspeed: Vector2D = new Vector2D(0, 0);
  public position: Vector2D;
  public isCollision: boolean;
  public sizeX = 5;
  public sizeY = 10
  constructor(x: number, y: number) {
    // this.sprite = createSprite(x, y);
    // const animation = loadAnimation(
    //   "data/hero1.jpg",
    //   "data/hero2.jpg",
    //   "data/hero3.jpg",
    //   "data/hero4.jpg"
    // );
    // this.sprite.addAnimation("hero", animation);

    this.position = new Vector2D(x, y);
  }

  public obstacle: Obstacle

  public move(speed: Vector2D) {
    this.position = this.position.add(speed);
    if (this.position.x > Environemnt.worldSizeX) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = Environemnt.worldSizeX;
    }
  }


  public jump() {
    this.position = this.position.add(this.jumpspeed)
    this.jumpspeed = new Vector2D(0, 0);
    const space = 32
    if (keyIsDown(space) && this.position.y > 250 && this.position.y <= 400) {
      this.jumpspeed = new Vector2D(0, -20);
    }
    else if (this.position.y === 350) {
      this.jumpspeed = new Vector2D(0, 0);
    }
    else if (this.position.y <= 350) {
      this.jumpspeed = new Vector2D(0, 20);
    }
  }


  public pickUp() { }

  public update(weather: Weather) {
    const speed = this.handleKeyDown();
    // this.move(speed);
    return speed;
  }

  public handleKeyDown() {
    if (keyIsDown(LEFT_ARROW)) {
      return new Vector2D(-5, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      return new Vector2D(5, 0);
    }
    return new Vector2D(0, 0);
  }

  // animate() {
  //   this.sprite.animation.play();
  // }

  public draw() {
    fill("blue");
    rect(this.position.x, this.position.y, this.sizeX, this.sizeY);
  }

  public doCollision(obstacle: Obstacle) {
    if (this.position.x < obstacle.position.x + obstacle.sizeX &&
      this.position.x + this.sizeX > obstacle.position.x &&
      this.position.y < obstacle.position.y + obstacle.sizeY &&
      this.position.y + this.sizeY > obstacle.position.y) {
      if (this.position.x > obstacle.position.x && this.position.x < obstacle.position.x + obstacle.sizeX) {
        this.position.y = obstacle.position.y - this.sizeY
      }
      else {
        console.log("game over")
      }
    }
    else { }
  }
}

