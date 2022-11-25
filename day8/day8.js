import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const index_list = [];
    let acc = 0;
    const next_index = (index) => {
        const line = input[index].split(' ');
        const sign = line[1].slice(0, 1);
        const number = Number(line[1].slice(1));
        if (line[0] === 'nop') {
            return index + 1;
        } else {
            if (line[0] === 'acc') {
                if (sign === '-') {
                    acc -= number;
                } else {
                    acc += number;
                }
                return index + 1;
            } else {
                if (line[0] === 'jmp') {
                    if (sign === '-') {
                        return index - number;
                    } else {
                        return index + number;
                    }
                }
            }
        }
    };
    let index = 0;
    while (!index_list.includes(index)) {
        index_list.push(index);
        index = next_index(index);
    }
    return acc;
};

const partTwo = (input) => {
    const next_index = (index, bool) => {
        if (input.length == index) {
            end = true;
            return index;
        }
        const line = input[index].split(' ');
        let instr = line[0];
        const sign = line[1].slice(0, 1);
        const number = Number(line[1].slice(1));
        if (bool) {
            if (instr === 'nop') {
                instr = 'jmp';
                stock = index;
                global_bool = false;
            } else {
                if (instr === 'jmp') {
                    instr = 'nop';
                    stock = index;
                    global_bool = false;
                }
            }
        } else {
        }
        if (instr === 'nop') {
            return index + 1;
        } else {
            if (instr === 'acc') {
                if(!index_list.includes(index+1)){
                    if (sign === '-') {
                    acc -= number;
                } else {
                    acc += number;
                }
                }
                return index + 1;
            } else {
                if (instr === 'jmp') {
                    if (sign === '-') {
                        return index - number;
                    } else {
                        return index + number;
                    }
                }
            }
        }
        if(bool){
            stock_acc=acc;
        }
    };
    let acc = 0;
    let index = 0;
    let length = input.lenght;
    let global_bool = true;
    let stock = 0;
    let stock_acc=0;
    let stock_list = [0];
    let index_list = [0];
    let end = false;
    while (end === false) {
        index = next_index(index, global_bool);
        if (index_list.includes(index) && end == false) {
            index_list = stock_list.slice();
            index = next_index(stock, false);
            index_list.push(index);
            stock = index;
            stock_list.push(index);
            global_bool = true;
            acc=stock_acc;
        } else {
            index_list.push(index);
            if (global_bool) {
                stock_acc=acc;
                stock_list.push(index);
            }
        }
    }

    return acc;
};

//
['example.in', 'puzzle.in'].forEach((file) => {
    const input = fs.readFileSync(`day8/${file}`, 'utf-8').trim().split('\r\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
