import { Vector2D } from "../utils/vector";
import { Sky } from "./sky";
import { Ground } from "./ground";
import { Weather } from "../weather/weather";
import { Hero } from "../hero/hero";
import { Obstacle } from "../obstacle/obstacle";

export class Environemnt {
  public static gravity: Vector2D = new Vector2D(0, 1);
  public static worldSize: [number, number] = [400, 400];
  private sky: Sky;
  private ground: Ground;

  public obstacles: Obstacle[] = [];

  constructor(private hero: Hero) {
    this.sky = new Sky(Environemnt.worldSizeY * 0.8);
    this.ground = new Ground(Environemnt.worldSizeY - this.sky.height);
  }
  public static get worldSizeX() {
    return this.worldSize[0];
  }
  public static get worldSizeY() {
    return this.worldSize[1];
  }

  public update(currentWeather: Weather) {
    this.sky.update(currentWeather);
    this.ground.update(currentWeather);
    const speed = this.hero.update(currentWeather);
    this.obstacles.forEach((obstacle) => obstacle.update(speed));
    if (!(frameCount % 50)) {
      this.addObstacles()
    }
    this.obstacles.find((obstacle) => this.hero.doCollision(obstacle))
  }

  private addObstacles() {
    let sizeY = random(30, 50);
    let sizeX = random(50, 300);
    // let offset = 100;
    // for (let i = 0; i < 50; i ++){
    this.obstacles.push(
      new Obstacle(
        Environemnt.worldSizeX,
        Environemnt.worldSizeY - sizeY,
        sizeX,
        sizeY
      )
    );
    //offset = offset + sizeX + Environemnt.worldSizeX
    //}
  }

  public draw() {
    this.sky.draw();
    this.ground.draw();
    this.obstacles.forEach((obstacle) => obstacle.draw());
    this.hero.draw();
  }

  public reset() {
    /**
     * change hero coordinates
     * object on the scene should move to the start of location
     * add some text on the screen
     */
  }
}
