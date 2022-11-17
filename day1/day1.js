import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const result = input.filter((x) => {return input.includes(2020 - x)});
    return result[0] * result[1];
};

const partTwobis = (input) => {
     const result = input.filter((x) => (input.filter((y)=>{return input.includes(2020 - x - y)}))[0]);
return result[0] * result[1] * result[2];
};

['example1.in', 'puzzle1.in'].forEach((file) => {
    const input = fs.readFileSync(`day1/${file}`, 'utf-8').trim().split('\n').map(Number);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwobis(input) + ` (executed in ${timer(partTwobis, input)} ms)`);
});