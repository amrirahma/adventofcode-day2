import { readFileSync } from "fs";
import path from "path";

const filePath = path.join(__dirname, "file.txt");

const commands = readFileSync(filePath, "utf-8")
  .split("\r\n")
  .map((a) =>
    a
      .split(/\;|\:/)
      .slice(1)
      .map((a) =>
        a.split(",").map((b) => {
          const c = b.trim().split(" ");
          return { [c[1]]: Number(c[0]) };
        })
      )
  );

function partOne() {
  const limits = { red: 12, green: 13, blue: 14 };
  function testCommand(command) {
    let valid = true;
    for (let subcommand of command) {
      subcommand.forEach((a) => {
        const key = Object.keys(a)[0];
        const relatedLimit = limits[key];
        if (a[key] > relatedLimit) {
          valid = false;
        }
      });
    }
    return valid;
  }

  let total = 0;
  let index = 1;
  for (let command of commands) {
    total += index * Number(testCommand(command));
    index++;
  }
  console.log(total);
}

function partTwo() {
  function getMinimumValuesForCommand(command) {
    const limits = { red: 0, green: 0, blue: 0 };
    for (let subcommand of command) {
      subcommand.forEach((a) => {
        const key = Object.keys(a)[0];
        const relatedLimit = limits[key];
        if (a[key] > relatedLimit) {
          limits[key] = a[key];
        }
      });
    }
    return limits.red * limits.green * limits.blue;
  }

  let total = 0;
  for (let command of commands) {
    total += getMinimumValuesForCommand(command);
  }
  console.log(total);
}

partOne();
partTwo();
