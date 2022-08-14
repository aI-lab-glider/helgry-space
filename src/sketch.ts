import { Environemnt } from "./environment/environment";
import { WeatherProvider } from "./weather/weatherProvider";
import { Hero } from "./hero/hero";
import p5 from "p5";

const hero = new Hero(Environemnt.worldSizeX / 2, Environemnt.worldSizeY - 10);
const environment = new Environemnt(hero);
const weatherProvider = new WeatherProvider();
let heroSprite: p5.Image;

function setup() {
  frameRate(10);
  createCanvas(Environemnt.worldSizeX, Environemnt.worldSizeY);
  heroSprite = loadImage('assets/demo.png');
}

function draw() {
  background(200);
  const currentWeather = weatherProvider.getCurrentWeather();
  image(heroSprite, 0, 0, Environemnt.worldSizeX, Environemnt.worldSizeY);
  const heroSpeed = hero.update(currentWeather);
  const jumpspeed = hero.jump();
  environment.update(currentWeather);
  environment.draw();
<<<<<<< HEAD
<<<<<<< HEAD
  hero.draw();
=======
  const jumpspeed = hero.jump();
>>>>>>> 73929266859170a1692f34d14e5ed9573a8fbadd
=======
  const jumpspeed = hero.jump();
>>>>>>> 73929266859170a1692f34d14e5ed9573a8fbadd
}

// It will be explained later.
export { setup, draw };
