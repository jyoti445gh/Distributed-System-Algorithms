
const processes = ["P1", "P2", "P3", "P4", "P5"];

let tokenHolder = 0;

// Processes that want to enter Critical Section
const wantsCS = {
    P1: true,
    P2: false,
    P3: true,
    P4: true,
    P5: false
};

function enterCriticalSection(process) {
    console.log(`${process} ENTERS Critical Section`);
    console.log(`${process} is performing its task...`);
    console.log(`${process} EXITS Critical Section`);
}

function passToken() {
    console.log("========== TOKEN RING ALGORITHM ==========");

    // One complete round of the ring
    for (let i = 0; i < processes.length; i++) {

        const currentProcess = processes[tokenHolder];

        console.log(`\nToken received by ${currentProcess}`);

        if (wantsCS[currentProcess]) {
            console.log(`${currentProcess} wants to enter CS`);

            enterCriticalSection(currentProcess);
        } else {
            console.log(`${currentProcess} does not want CS`);
        }

        // Pass token to the next process
        const nextIndex = (tokenHolder + 1) % processes.length;

        console.log(
            `${currentProcess} passes TOKEN to ${processes[nextIndex]}`
        );

        tokenHolder = nextIndex;
    }

    console.log("\n========== ONE ROUND COMPLETED ==========");
}

passToken();
