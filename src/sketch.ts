import { Environemnt } from "./environment/environment";
import { WeatherProvider } from "./weather/weatherProvider";
import { Hero } from "./hero/hero";
import p5 from "p5";
import { Vector2D } from "./utils/vector";

const hero = new Hero(Environemnt.worldSizeX / 2, Environemnt.worldSizeY - 10);
let environment = new Environemnt(hero);
let textX = 0;
let isGameOver = false;
export function onGameOver() {
  isGameOver = true;
  environment = new Environemnt(hero);
  textX = 0;
}

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
  hero.draw();
  if (isGameOver) {
    let textSpeed = -heroSpeed.x;
    textX = textX + textSpeed;
    text('Game over', textX, 30);
  }
}


// It will be explained later.
export { setup, draw };
