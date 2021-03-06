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
    let startTime = null;
    let endTime = null;

    

    //Sort on property endTime
    blockingSlots.sort((slot1, slot2) => slot1.endTime - slot2.endTime)
    console.log(blockingSlots)


    //Find early startTime and endTime non-blocking
    for (let i = 0; i < blockingSlots.length; i++) {
        // if endTime of non blocking slot at last > startTime of blockingslots now => fail  
        if (endTime != null && endTime > blockingSlots[i].startTime ) {
            startTime = null;
            endTime = null;
           
        }

        // if having non blocking slot for duration
        if (blockingSlots[i].startTime - minTime >= duration && startTime == null && endTime == null) {
            startTime = minTime;
            endTime = minTime + duration;
        
        }
            minTime = blockingSlots[i].endTime;
        
    }
    //check startTime ,endTime of non blocking slot
    if (startTime != null && endTime != null) {
        return { startTime, endTime }
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


console.log(handle(input, 0));
