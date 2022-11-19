import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    return input.filter((list) => fields.every((key) => list.includes(key))).length;
};


const partTwo = (input) => {
    const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const criteria= input.filter((list) => fields.every((key) => list.includes(key)));
    const result=criteria.map((passeport)=>{
        let criter=0;
        if((passeport[1+passeport.indexOf('byr')]>=1920)&&(passeport[1+passeport.indexOf('byr')]<=2002)){
            criter+=1;
        }
        if((passeport[1+passeport.indexOf('iyr')]>=2010)&&(passeport[1+passeport.indexOf('iyr')]<=2020)){
            criter+=1;
        }
        if((passeport[1+passeport.indexOf('eyr')]>=2020)&&(passeport[1+passeport.indexOf('eyr')]<=2030)){
            criter+=1;
        }
        if(passeport[1+passeport.indexOf('hgt')][passeport[1+passeport.indexOf('hgt')].length-1]=='m'){
            const taille=Number(passeport[1+passeport.indexOf('hgt')].replace('cm',''))
            if((taille>=150)&&(taille<=193)){
                criter+=1;
            }
        }
        if(passeport[1+passeport.indexOf('hgt')][passeport[1+passeport.indexOf('hgt')].length-1]=='n'){
            const taille=Number(passeport[1+passeport.indexOf('hgt')].replace('in',''))
            if((taille>=59)&&(taille<=76)){
                criter+=1;
            }
        }
        if(passeport[1+passeport.indexOf('hcl')].match(/^[#][a-f0-9]{6}$/)){
            criter+=1;
        }
        const ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        if(ecl.includes(passeport[1+passeport.indexOf('ecl')])){
            criter+=1;
        }
        const regex=/^[0-9]{9}$/
        if(passeport[1+passeport.indexOf('pid')].match(regex)){
            criter+=1;
        }
        return criter;
    });
    //
    return result.filter((x)=>x==7).length;
};

['example.in', 'puzzle.in'].forEach((file) => {
    const regularExp = /\r\n\r\n/;
    const separator = /\s|\:/;
    const input = fs
        .readFileSync(`day4/${file}`, 'utf-8')
        .trim()
        .split(regularExp)
        .map((list) => list.split(separator));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
