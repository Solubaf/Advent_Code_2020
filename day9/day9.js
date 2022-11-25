import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const newlist=[];
    let result=input[0];
    const reach=25;
    for (var i=0;i<reach;i++){
        newlist.push(input[i]);
    }  
    for (var j=reach;j<input.length;j++){
        if(newlist.filter((x)=>{return newlist.includes(String(input[j]-Number(x)))}).length>=2){
            newlist.shift();
            newlist.push(input[j]);
        }else{
            result=input[j];
            j=input.length;
        }
    }
    return result;
};

const partTwo = (input) => {
    const reach=25;
    const target=1212510616;
    let contiguous=[];
    let result=[]; 
    for (var j=0;j<input.length;j++){
        let sum=0;
        let index=j;
        while(sum<target&&index<input.length){
            sum+=input[index];
            contiguous.push(input[index])
            index++;
        }
        if(sum==target&&contiguous.length>=2){
            result=contiguous.slice();
            j=input.length;
        }else{
            sum=0;
            contiguous=[];
        }
    }
    console.log(result.reduce((acc,cur)=>{return Math.max(acc,cur)},result[0]));
    return result.reduce((acc,cur)=>{return Math.max(acc,cur)},result[0])+result.reduce((acc,cur)=>{return Math.min(acc,cur)},result[0]);
};

//
['example.in', 'puzzle.in'].forEach((file) => {
    const input = fs.readFileSync(`day9/${file}`, 'utf-8').trim().split('\r\n').map(Number);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
