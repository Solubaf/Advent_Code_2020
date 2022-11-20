import { assert } from 'console';
import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const target = ['bag', 'bags', 'bags.', 'bag.', 'bags,', 'bag,'];
    const word_list = input.map((list) => list.split(' '));
    const color_list = word_list.map((line) => {
        const colors = [];
        line.map((cur, indice) => {
            if (target.includes(cur)) {
                colors.push(line[indice - 2] + ' ' + line[indice - 1]);
                return cur;
            }
        });
        return colors;
    });
    const target_colors = ['shiny gold'];
    let remaining_colors = color_list.map((x) => x[0]).filter((x) => !target_colors.includes(x));
    let size = 0;
    while (target_colors.length !== size) {
        size = target_colors.length;
        const new_targets = [];
        for (var i = 0; i < size; i++) {
            const list = color_list.filter((x) => remaining_colors.includes(x[0]) && x.includes(target_colors[i]));
            if (list.length > 0) {
                const list_targets = list.map((x) => x[0]);
                remaining_colors = remaining_colors.filter((x) => !list_targets.includes(x));
                new_targets.push(...list_targets);
            }
        }
        target_colors.push(...new_targets);
    }
    //console.log(target_colors);

    return target_colors.length - 1;
};

const partTwo = (input) => {
    
    return result;
};
//
['example.in', 'puzzle.in'].forEach((file) => {
    const input = fs.readFileSync(`day7/${file}`, 'utf-8').trim().split('\r\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    //console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
