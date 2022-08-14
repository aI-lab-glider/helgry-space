import { Vector2D } from "../utils/vector";
import { Weather } from "../weather/weather";
import "p5";
import { Environemnt } from "../environment/environment";
import { Obstacle } from "../obstacle/obstacle";


export class Hero {
  //private sprite;
  jumpspeed: Vector2D = new Vector2D(0, 0);
  speed: Vector2D = new Vector2D(0, 0);
  public position: Vector2D;
  public isCollision = false;
  public sizeX = 30;
  public sizeY = 30
  constructor(x: number, y: number) {
    this.position = new Vector2D(x, y);
  }
  public obstacle: Obstacle
  update(currentWeather: Weather) {
    /**
     * 1 -  update speed based on weather
     * correct speed based on pressed key
     * add speed to position
     */
    this.calculateSpeedBasedOnWeather(currentWeather);
    this.calculateSpeedBasedOnKeyPressed();
    //this.position = this.position.add(this.speed);
    return this.speed;
  }

  calculateSpeedBasedOnWeather(currentWeather: Weather) {
    if (currentWeather.precipitation.isPresent() && this.speed.x !== 0) {
      this.speed = this.speed.add(new Vector2D(0, 0));
    } else {
      this.speed = this.speed.add(new Vector2D(0, 0));
    }
  }

  calculateSpeedBasedOnKeyPressed() {
    this.speed = new Vector2D(0, 0);
    if (keyIsDown(RIGHT_ARROW)) {
      this.speed = this.speed.add(new Vector2D(5, 0));
    } else if (keyIsDown(LEFT_ARROW)) {
      this.speed = this.speed.add(new Vector2D(-5, 0));
    }
  }
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
    frameRate(35)
    const space = 32
    if (keyIsDown(space) && this.position.y === 350) {
      this.jumpspeed = new Vector2D(0, -10);
    }
    else if (this.position.y < 250) {
      this.jumpspeed = new Vector2D(0, 10);
    }
    else if (this.position.y > 350) {
      this.jumpspeed = new Vector2D(0, 0);
      this.position.y = 350
    }
  }


  public pickUp() { }


  public handleKeyDown() {
    if (keyIsDown(LEFT_ARROW)) {
      return new Vector2D(-5, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.speed = this.speed.add(new Vector2D(5, 0));
    } else if (keyIsDown(LEFT_ARROW)) {
      this.speed = this.speed.add(new Vector2D(-5, 0));
    }
  }

  draw() {
    fill("blue");
    rect(this.position.x, this.position.y, 30, 30);
  }

  public collisionDetect(obstacle: Obstacle) {
    if (this.position.x <= obstacle.position.x + obstacle.sizeX &&
      this.position.x + this.sizeX >= obstacle.position.x &&
      this.position.y <= obstacle.position.y + obstacle.sizeY &&
      this.position.y + this.sizeY >= obstacle.position.y) {
      this.isCollision = true
    }
    else {
      this.isCollision = false
    }
  }

  public doCollision(obstacle: Obstacle) {

    if (this.isCollision = true &&
      this.position.x + this.sizeX > obstacle.position.x &&
      this.position.x < obstacle.position.x + obstacle.sizeX) {
      this.position.y = obstacle.position.y - this.sizeY
    }
    else if (this.isCollision = true &&
      this.position.x == obstacle.position.x - this.sizeX &&
      this.position.y > obstacle.position.y - this.sizeY) {
      console.log('game over')
    }
  }
}

