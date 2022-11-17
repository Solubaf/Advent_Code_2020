import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    let result = 0;
    Array.from(input,(v) =>{
        const clean=v.split(' ');
        const letter=clean[1][0];
        const inf=clean[0].split('-').map(Number)[0];
        const sup=clean[0].split('-').map(Number)[1];
        let total=0;
        Array.from(clean[2],(y)=>{
            if(y==letter){
                total+=1;
        }});
        if(inf<=total&&total<=sup){
            result+=1;
        }
    });
    return result;
};

const partTwo = (input) => {
    let result = 0;
    Array.from(input,(v) =>{
        const clean=v.split(' ');
        const letter=clean[1][0];
        const inf=clean[0].split('-').map(Number)[0];
        const sup=clean[0].split('-').map(Number)[1];
        if(sup<=clean[2].length&&(((clean[2].charAt(inf-1)==letter)^(clean[2].charAt(sup-1)==letter)))){ 
            result+=1;
        }
    });
    return result;
};

['example2.in', 'puzzle2.in'].forEach((file) => {
    const input = fs.readFileSync(`day2/${file}`, 'utf-8').trim().split('\n').map(String);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});