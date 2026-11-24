
/*
   RICART-AGRAWALA MUTUAL EXCLUSION ALGORITHM

   Three Processes: P1, P2, P3

   Messages:
   1. REQUEST
   2. REPLY
*/

// Create processes
let processes = {};

let names = ["P1", "P2", "P3"];

names.forEach((name, index) => {

    processes[name] = {
        id: index,
        clock: index + 1,
        requestTime: index + 1,
        requesting: true,
        inCS: false,
        replies: 0,
        deferred: []
    };
});

console.log("========================================");
console.log(" RICART-AGRAWALA MUTUAL EXCLUSION");
console.log("========================================");

// Compare request priorities
function hasPriority(processA, processB) {

    let a = processes[processA];
    let b = processes[processB];

    if (a.requestTime < b.requestTime) {
        return true;
    }

    if (a.requestTime === b.requestTime) {
        return a.id < b.id;
    }

    return false;
}

// Receive REQUEST message
function receiveRequest(receiver, sender) {

    let current = processes[receiver];

    let incomingTime = processes[sender].requestTime;

    // Update Lamport clock
    current.clock = Math.max(
        current.clock,
        incomingTime
    ) + 1;

    console.log(
        "\n" + receiver + " receives REQUEST from " + sender
    );

    // If receiver has priority, defer the reply
    if (
        current.requesting &&
        hasPriority(receiver, sender)
    ) {

        current.deferred.push(sender);

        console.log(
            receiver + " defers REPLY to " + sender
        );

    } else {

        console.log(
            receiver + " sends REPLY to " + sender
        );

        receiveReply(sender, receiver);
    }
}

// Receive REPLY message
function receiveReply(receiver, sender) {

    let current = processes[receiver];

    current.clock++;

    current.replies++;

    console.log(
        receiver + " receives REPLY from " + sender
    );

    console.log(
        receiver + " total replies = " + current.replies
    );
}

// Broadcast REQUEST
function broadcastRequest(sender) {

    console.log("\n" + sender + " broadcasts REQUEST");

    for (let receiver of names) {

        if (receiver !== sender) {
            receiveRequest(receiver, sender);
        }
    }
}

// Check permission to enter Critical Section
function enterCriticalSection(process) {

    let current = processes[process];

    if (current.replies === names.length - 1) {

        current.inCS = true;

        console.log("\n================================");
        console.log(process + " ENTERS CRITICAL SECTION");
        console.log("================================");

        console.log(process + " accesses shared resource");

        return true;
    }

    console.log(process + " is waiting for REPLY");

    return false;
}

// Exit Critical Section
function exitCriticalSection(process) {

    let current = processes[process];

    console.log("\n" + process + " exits Critical Section");

    current.inCS = false;
    current.requesting = false;

    // Send deferred replies
    console.log("\n" + process + " sends deferred REPLIES");

    let waitingProcesses = [...current.deferred];

    current.deferred = [];

    for (let receiver of waitingProcesses) {

        console.log(
            process + " sends REPLY to " + receiver
        );

        receiveReply(receiver, process);
    }
}

// ========================================
// MAIN PROGRAM
// ========================================

// All processes broadcast their requests
broadcastRequest("P1");
broadcastRequest("P2");
broadcastRequest("P3");

// P1 has the highest priority
console.log("\n========== EXECUTION PHASE ==========");

if (enterCriticalSection("P1")) {
    exitCriticalSection("P1");
}

// P2 enters after receiving P1's deferred reply
if (enterCriticalSection("P2")) {
    exitCriticalSection("P2");
}

// P3 enters after receiving P2's deferred reply
if (enterCriticalSection("P3")) {
    exitCriticalSection("P3");
}

// Final status
console.log("\n========================================");
console.log("          FINAL STATUS");
console.log("========================================");

names.forEach(name => {

    console.log(
        name,
        "Clock =", processes[name].clock,
        "| Deferred Replies =", processes[name].deferred.length
    );
});

console.log("\nALL PROCESSES COMPLETED");
