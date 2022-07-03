import { Environemnt } from "./environment/environment";
import { WeatherProvider } from "./weather/weatherProvider";
import { Hero } from "./hero/hero";
import p5 from "p5";

const hero = new Hero(Environemnt.worldSizeX / 2, Environemnt.worldSizeY * 0.9);
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
  environment.update(currentWeather);
  environment.draw();
}

// It will be explained later.
export { setup, draw };
