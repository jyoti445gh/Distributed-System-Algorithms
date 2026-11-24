
const processes = ["P1", "P2", "P3", "P4"];
const N = processes.length;

// Request Number array at each process
const RN = {};

processes.forEach(p => {
    RN[p] = {};
    processes.forEach(q => {
        RN[p][q] = 0;
    });
});

// Initially P1 has the token
let tokenHolder = "P1";

// Token data
let LN = {
    P1: 0,
    P2: 0,
    P3: 0,
    P4: 0
};

let Q = [];

let inCS = false;

function broadcastRequest(process) {
    console.log(`\n${process} wants to enter Critical Section`);

    // Increase its request number
    RN[process][process]++;

    const requestNumber = RN[process][process];

    console.log(
        `${process} increments RN to ${requestNumber}`
    );

    console.log(`\n${process} broadcasts REQUEST`);

    // Broadcast REQUEST to all processes
    processes.forEach(receiver => {
        if (receiver !== process) {
            RN[receiver][process] = Math.max(
                RN[receiver][process],
                requestNumber
            );

            console.log(
                `${receiver} receives REQUEST(${process}, ${requestNumber})`
            );
        }
    });

    // Update the token holder's own request information
    if (tokenHolder === process) {
        RN[process][process] = requestNumber;
    }

    // If token holder is idle, transfer token
    if (
        tokenHolder !== process &&
        !inCS &&
        RN[tokenHolder][process] === LN[process] + 1
    ) {
        console.log(
            `\n${tokenHolder} sends TOKEN to ${process}`
        );

        tokenHolder = process;
    }

    // Enter CS if process has token
    if (tokenHolder === process) {
        enterCriticalSection(process);
    } else {
        console.log(`${process} is waiting for TOKEN`);
    }
}

function enterCriticalSection(process) {
    if (tokenHolder !== process || inCS) {
        return;
    }

    inCS = true;

    console.log(`\n${process} RECEIVED TOKEN`);
    console.log(`${process} ENTERS Critical Section`);
    console.log(`${process} is performing its task...`);

    releaseCriticalSection(process);
}

function releaseCriticalSection(process) {
    console.log(`\n${process} EXITING Critical Section`);

    // Mark this request as completed
    LN[process] = RN[process][process];

    console.log(`Updated LN:`, LN);

    inCS = false;

    // Find processes with outstanding requests
    processes.forEach(p => {
        const pending = RN[process][p] === LN[p] + 1;

        if (pending && !Q.includes(p)) {
            Q.push(p);
        }
    });

    console.log("Token Queue Q:", Q);

    // Send token to next waiting process
    if (Q.length > 0) {
        const nextProcess = Q.shift();

        console.log(
            `\n${process} transfers TOKEN to ${nextProcess}`
        );

        tokenHolder = nextProcess;

        console.log(`${nextProcess} now holds the TOKEN`);
    } else {
        console.log(`${process} keeps the TOKEN`);
    }
}

// Demonstration
console.log("==================================");
console.log(" SUZUKI-KASAMI BROADCAST ALGORITHM");
console.log("==================================");

console.log(`Initial Token Holder: ${tokenHolder}`);

broadcastRequest("P2");
broadcastRequest("P3");
broadcastRequest("P4");

console.log("\n==================================");
console.log("FINAL TOKEN HOLDER:", tokenHolder);
console.log("==================================");
