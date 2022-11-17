import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const taille = input[0].length - 1;
    const lines = (acc, curr, ind) => {
        let isTree = 0;
        if (curr[(3 * ind) % taille] == '#') {
            isTree = 1;
        }
        return acc + isTree;
    };
    return input.reduce(lines,0);
};

const partTwo = (input) => {
    const taille = input[0].length-1;
    const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
    
    const slope_line = (p)=>{
        let deplacement=0;
        const i=p[0];
        const j=p[1];
        const lines = (acc, curr, ind) => {
            let isTree = 0;
            if ((ind%j==0)&&(curr[(i * deplacement) % taille] == '#')) {
                isTree = 1;
            }
            if(ind%j==0){
                deplacement++;
            }
            return acc + isTree;
        };
        return input.reduce(lines,0);
    }
    const result=slopes.map(slope_line);
    console.log(result);
    return result.reduce((acc, cur) => acc * cur, 1);
};

['example.in', 'puzzle.in'].forEach((file) => {
    const input = fs.readFileSync(`day3/${file}`, 'utf-8').trim().split('\n').map(String);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
