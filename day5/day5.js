import { assert } from 'console';
import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const seat = (list) => {
        let bot = 0;
        let top = 2 ** list.length - 1;
        Array.from(list, (letter, indice) => {
            if (letter === 'B' || letter === 'R') {
                bot += 2 ** (list.length - 1 - indice);
            } else {
                top -= 2 ** (list.length - 1 - indice);
            }
        });
        assert(top == bot);
        return top;
    };
    const ID = (list) => {
        return seat(list.slice(0, 7)) * 8 + seat(list.slice(-3));
    };
    const result= input
        .map((list) => {
            return ID(list);
        });
    return result.filter((x) => (!result.includes(x+1))&&result.includes(x+2));
        //reduce((acc, curr) => Math.max(acc, curr));

};

const partTwo = (input) => {
    const seat = (list) => {
        let bot = 0;
        let top = 2 ** list.length - 1;
        Array.from(list, (letter, indice) => {
            if (letter === 'B' || letter === 'R') {
                bot += 2 ** (list.length - 1 - indice);
            } else {
                top -= 2 ** (list.length - 1 - indice);
            }
        });
        assert(top == bot);
        return top;
    };
    const ID = (list) => {
        return seat(list.slice(0, 7)) * 8 + seat(list.slice(-3));
    };
    const taille=128*8;
    const liste=[];
    for (var i = 8; i < taille-8; i++) {
    liste.push(i);
    }
    //console.log(liste);
    const list_ID= (liste).map((x)=>8*Math.floor(x/8)+(x)%8);
    //console.log(list_ID);
    const result=list_ID.filter((x) => (list_ID.includes(x+1))&&list_ID.includes(x+2));
    //console.log(result);
    return result[0]+1;
    };
    
['example.in', 'puzzle.in'].forEach((file) => {
    const input = fs.readFileSync(`day5/${file}`, 'utf-8').trim().split('\r\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
