import { PlayerInfo, PlayerStat, Region } from "../types/playerInfo";
import faker from 'faker';

const generatePlayerInfo = (playerToGenerate: PlayerInfo, region : Region) => {
  playerToGenerate.ign = faker.internet.userName();
  playerToGenerate.firstName = faker.name.firstName();
  playerToGenerate.lastName = faker.name.lastName();
  playerToGenerate.salary = calculateSalary(playerToGenerate);
  playerToGenerate.region = region;
  playerToGenerate.scoutable = true;

  return playerToGenerate;
};

const reducer = (accumulator : any, currentValue : any) => accumulator + currentValue;

const calculateOverall = (positiveValues : number[], negativeValues : number[], count : number) : number => {
  return Math.round((positiveValues.reduce(reducer, 0) + negativeValues.reduce(reducer, 0)) / count);
}

const baseSalary = 125000;
const salaryModifier = 50;

export const calculateSalary = (player : PlayerInfo) : number => {
  // Salary is the (overall / modifier) * baseSalary (125,000)
  return (player.overall / salaryModifier) * baseSalary;
}

// No trainable ability can start over 85
const maxSkillValue : number = 85;
// No trainable ability can be lower than 15
const minSkillValue : number = 15;
// We multiply the random number by this value (ensuring we don't go over)
const maxRandomStatMultiplyer = maxSkillValue - minSkillValue;

// Static abilities can be from 0-100
const maxStaticSkillValue : number = 100;
const minStaticSkillValue : number = 0;
// We multiply the random number by this value (ensuring we don't go over)
const maxRandomStaticStatMultiplyer : number = maxStaticSkillValue - minStaticSkillValue;

export const generateStatValue = (isTrainable : boolean) : number => {
  let number = Math.random();

  if (isTrainable) {
    // Trainable abilities are between 15-85
    number = number * maxRandomStatMultiplyer + minSkillValue;
  }
  else
    // Non trainable abilities can be from 0 - 100
    number = number * maxRandomStaticStatMultiplyer + minStaticSkillValue;

  return Math.round(number);
}

export const generatePlayerStats = (playerToGenerate: PlayerInfo) => {
  let positiveValues : number[] = [];
  let negativeValues : number[] = [];

  let valuesCount : number = 0;

  for (const stat in playerToGenerate.stats) {
    // @ts-ignore
    const playerStat : PlayerStat = playerToGenerate.stats[stat];

    const statValue = generateStatValue(playerStat.isTrainable);

    if (playerStat.isPositive)
      positiveValues.push(statValue);
    else
      negativeValues.push(statValue);

    // Assign the stat values
    playerStat.value = statValue;
  }

  // take all negative values and subtract them from 100
  let invertedValues = negativeValues.map((val) => 100 - val);

  // Overall scores are the average of all positive trainable skills AND (100 - negative skills)
  playerToGenerate.overall = calculateOverall(positiveValues, invertedValues, playerToGenerate.statsCount);

  return playerToGenerate;
}

export const generatePlayers = (numberOfPlayers: number): PlayerInfo[] => {
  let playerArray : PlayerInfo[] = [];

  for(let i = 0; i < numberOfPlayers; i++) {
    let player = new PlayerInfo();

    generatePlayerStats(player);
    generatePlayerInfo(player, Region.NA);

    playerArray.push(player);
  }

  return playerArray;
}