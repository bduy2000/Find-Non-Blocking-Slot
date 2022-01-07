const input = [{
    id: 1,
    startTime: 180,
    endTime: 220
},
{
    id: 2,
    startTime: 0,
    endTime: 120
},
{
    id: 3,
    startTime: 110,
    endTime: 150
},
]

const handle = (input, num) => {
    let min = 0;
    const max = 1440;


    //Selection Sort on property startTime
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i].startTime > input[j].startTime) {
                let temp = input[j];
                input[j] = input[i];
                input[i] = temp;
            }
        }
    }

    //Find early startTime and endTime non-blocking
    for (let i = 0; i < input.length; i++) {
        if (input[i].startTime - min >= num) {
            return {
                startTime: min,
                endTime: min + num
            }
        } else {
            min = input[i].endTime;
        }
    }
    if (input[input.length - 1].endTime + num <= max) {
        return {
            startTime: input[input.length - 1].endTime,
            endTime: input[input.length - 1].endTime + num
        }
    }
    return { message: 'Slot full :>' }
}

console.log(handle(input, 30));