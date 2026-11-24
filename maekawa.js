
const votingSets = {
    P1: ["P1", "P2", "P3"],
    P2: ["P1", "P2", "P4"],
    P3: ["P1", "P3", "P5"],
    P4: ["P2", "P4", "P5"],
    P5: ["P3", "P4", "P5"]
};

const processes = ["P1", "P2", "P3", "P4", "P5"];

// Each voter can grant only one vote at a time
const votedFor = {};

processes.forEach(p => {
    votedFor[p] = null;
});

// Requests waiting at each voter
const waitingQueue = {};

processes.forEach(p => {
    waitingQueue[p] = [];
});

function requestCriticalSection(process) {
    console.log(`\n${process} REQUESTS Critical Section`);

    const voters = votingSets[process];
    let granted = 0;

    for (const voter of voters) {
        console.log(`${process} sends REQUEST to ${voter}`);

        if (votedFor[voter] === null) {
            votedFor[voter] = process;
            granted++;

            console.log(`${voter} sends GRANT to ${process}`);
        } else {
            waitingQueue[voter].push(process);
            console.log(
                `${voter} is already voting for ${votedFor[voter]}`
            );
            console.log(`${process} waits for vote from ${voter}`);
        }
    }

    if (granted === voters.length) {
        console.log(`\n${process} received all votes.`);
        console.log(`${process} ENTERS Critical Section`);

        releaseCriticalSection(process);
    } else {
        console.log(
            `\n${process} cannot enter CS. Waiting for remaining votes.`
        );
    }
}

function releaseCriticalSection(process) {
    console.log(`\n${process} EXITING Critical Section`);

    const voters = votingSets[process];

    for (const voter of voters) {
        console.log(`${process} sends RELEASE to ${voter}`);

        votedFor[voter] = null;

        if (waitingQueue[voter].length > 0) {
            const nextProcess = waitingQueue[voter].shift();

            votedFor[voter] = nextProcess;

            console.log(
                `${voter} now sends GRANT to ${nextProcess}`
            );
        }
    }
}

// Demonstration: processes request one after another
requestCriticalSection("P1");
requestCriticalSection("P2");
requestCriticalSection("P3");
