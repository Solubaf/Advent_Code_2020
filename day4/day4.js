import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const fields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"];
    let keys=input.map(x=>{
            return x.split('\r\n');
    });
    console.log(keys);
    console.log(keys[0]);
    const parser=keys.forEach((key)=>{key.forEach((k)=>{k.map((x)=>x.split(':'))})});
    console.log(parser);
    const count=(id)=>{Object.entries(id).reduce((acc2,key)=>{if(key in fields){return acc2+1;}},0)};
    const result=input.reduce((acc,id)=>{if(count(id)===7){return acc+1}},0);

    return result;
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
//, 'puzzle.in'
['example.in'].forEach((file) => {
    const input = fs.readFileSync(`day4/${file}`, 'utf-8').trim().split('\n\r').map(String);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    //console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
