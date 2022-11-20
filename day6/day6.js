import { assert } from 'console';
import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const yes = (list) => {
        const letters = [];
        const answers = list.split('\r\n');
        //console.log(answers);
        return answers.reduce((acc, answer) => {
            return (
                acc +
                answer.split('').reduce((acc, curr) => {
                    if (!letters.includes(curr)) {
                        letters.push(curr);
                        return acc + 1;
                    } else {
                        return acc;
                    }
                }, 0)
            );
        }, 0);
    };

    const result = input.reduce((acc, curr) => acc + yes(curr), 0);
    return result;
};

const partTwo = (input) => {
    const yes = (list) => {
        let letters = [];
        const answers = list.split('\r\n');
        answers[0].split('').map((curr) => {
            if (!letters.includes(curr)) {
                letters.push(curr);
            }
            return curr;
        });
        if (answers.length > 1) {
            answers.slice(1).map((answer) => {
                letters=letters.filter((curr) =>(answer.includes(curr)));
            });
        }
        return letters.length;
    };

    const result = input.reduce((acc, curr) => acc + yes(curr), 0);
    return result;
};
//
['example.in', 'puzzle.in'].forEach((file) => {
    const input = fs.readFileSync(`day6/${file}`, 'utf-8').trim().split('\r\n\r\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
