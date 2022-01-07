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
{
    id: 4,
    startTime: 100,
    endTime: 160,
},
{
    id: 5,
    startTime: 190,
    endTime: 200,
}
]

const handle = (blockingSlots, duration) => {
    let minTime = 0;
    const maxTime = 1440;


    //Sort on property endTime
    blockingSlots.sort((slot1, slot2) => slot1.endTime - slot2.endTime)
    console.log(blockingSlots)


    //Find early startTime and endTime non-blocking
    for (let i = 0; i < blockingSlots.length; i++) {
        if (blockingSlots[i].startTime - minTime >= duration) {
            return {
                startTime: minTime,
                endTime: minTime + duration
            }
        } else {
            minTime = blockingSlots[i].endTime;
        }
    }

    if (blockingSlots[blockingSlots.length - 1].endTime + duration <= maxTime) {
        return {
            startTime: blockingSlots[blockingSlots.length - 1].endTime,
            endTime: blockingSlots[blockingSlots.length - 1].endTime + duration
        }
    }

    // When can not find slot
    return { message: 'Slot full :>' }
}

console.log(handle(input, 20));