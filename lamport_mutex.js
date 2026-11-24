
/*
   LAMPORT'S MESSAGE-BASED MUTUAL EXCLUSION
   Three Processes: P1, P2, P3

   Messages:
   1. REQUEST
   2. REPLY
   3. RELEASE
*/

// Create processes
let processes = {};

let processNames = ["P1", "P2", "P3"];

for (let name of processNames) {
    processes[name] = {
        clock: 0,
        queue: [],
        replies: 0
    };
}

// Sort requests using timestamp and process ID
function sortQueue(queue) {

    queue.sort((a, b) => {

        if (a.timestamp === b.timestamp) {
            return a.process.localeCompare(b.process);
        }

        return a.timestamp - b.timestamp;
    });
}

// Display request queue
function displayQueue(process) {

    console.log(
        process + " Queue:",
        processes[process].queue.map(
            r => r.process + "(" + r.timestamp + ")"
        )
    );
}

// Receive REQUEST message
function receiveRequest(receiver, sender, request) {

    let node = processes[receiver];

    // Update Lamport clock
    node.clock = Math.max(
        node.clock,
        request.timestamp
    ) + 1;

    console.log(
        receiver + " receives REQUEST from " + sender
    );

    // Add request to local queue
    node.queue.push(request);

    sortQueue(node.queue);

    displayQueue(receiver);

    // Send REPLY message
    node.clock++;

    console.log(
        receiver + " sends REPLY to " + sender
    );

    receiveReply(sender, receiver);
}

// Receive REPLY message
function receiveReply(receiver, sender) {

    let node = processes[receiver];

    node.clock++;

    node.replies++;

    console.log(
        receiver + " receives REPLY from " + sender
    );
}

// Broadcast REQUEST message
function requestCriticalSection(sender) {

    let node = processes[sender];

    console.log("\n================================");
    console.log(sender + " REQUESTS CRITICAL SECTION");
    console.log("================================");

    // Increment clock before sending
    node.clock++;

    let request = {
        process: sender,
        timestamp: node.clock
    };

    // Add own request to local queue
    node.queue.push(request);

    sortQueue(node.queue);

    console.log(
        sender + " broadcasts REQUEST, Timestamp =",
        request.timestamp
    );

    // Broadcast REQUEST to all other processes
    for (let receiver of processNames) {

        if (receiver !== sender) {

            receiveRequest(receiver, sender, request);
        }
    }
}

// Check permission and enter Critical Section
function enterCriticalSection(process) {

    let node = processes[process];

    let isFirst =
        node.queue.length > 0 &&
        node.queue[0].process === process;

    let allRepliesReceived =
        node.replies === processNames.length - 1;

    if (isFirst && allRepliesReceived) {

        console.log("\n================================");
        console.log(process + " ENTERS CRITICAL SECTION");
        console.log("================================");

        console.log(process + " is accessing shared resource");

        return true;
    }

    return false;
}

// Broadcast RELEASE message
function releaseCriticalSection(sender) {

    let node = processes[sender];

    console.log("\n" + sender + " exits Critical Section");

    // Increment clock before sending RELEASE
    node.clock++;

    let releaseMessage = {
        process: sender,
        timestamp: node.clock
    };

    console.log(sender + " broadcasts RELEASE");

    // Remove own request
    node.queue = node.queue.filter(
        r => r.process !== sender
    );

    // Broadcast RELEASE to all other processes
    for (let receiver of processNames) {

        if (receiver !== sender) {

            let other = processes[receiver];

            // Update receiver's clock
            other.clock = Math.max(
                other.clock,
                releaseMessage.timestamp
            ) + 1;

            // Remove sender's request
            other.queue = other.queue.filter(
                r => r.process !== sender
            );

            console.log(
                receiver + " receives RELEASE from " + sender
            );

            displayQueue(receiver);
        }
    }

    // Reset reply counter
    node.replies = 0;
}

// ========================================
// MAIN PROGRAM
// ========================================

console.log("========================================");
console.log(" LAMPORT MESSAGE-BASED MUTUAL EXCLUSION");
console.log("========================================");

// All three processes request the resource
requestCriticalSection("P1");

requestCriticalSection("P2");

requestCriticalSection("P3");

// Processes enter in request queue order
console.log("\n========== CRITICAL SECTION EXECUTION ==========");

while (true) {

    let selected = null;

    for (let process of processNames) {

        let node = processes[process];

        let isFirst =
            node.queue.length > 0 &&
            node.queue[0].process === process;

        let allReplies =
            node.replies === processNames.length - 1;

        if (isFirst && allReplies) {
            selected = process;
            break;
        }
    }

    if (selected === null) {
        break;
    }

    if (enterCriticalSection(selected)) {
        releaseCriticalSection(selected);
    }
}

console.log("\n========================================");
console.log(" ALL PROCESSES COMPLETED");
console.log("========================================");

for (let process of processNames) {
    console.log(process + " Final Clock =", processes[process].clock);
    console.log(process + " Final Queue =", processes[process].queue.length);
}
