
/*
  BIRMAN-SCHIPER-STEPHENSON (BSS) PROTOCOL
  Causal Ordering of Messages
  Three Processes: P1, P2, P3
*/

// Create three processes
function createProcess(name, id) {
    return {
        name: name,
        id: id,
        clock: [0, 0, 0],
        pending: []
    };
}

let P1 = createProcess("P1", 0);
let P2 = createProcess("P2", 1);
let P3 = createProcess("P3", 2);

console.log("========================================");
console.log(" BIRMAN-SCHIPER-STEPHENSON PROTOCOL");
console.log("       CAUSAL MESSAGE ORDERING");
console.log("========================================");

// Function to multicast a message
function multicast(sender, message) {

    // Increment sender's own clock
    sender.clock[sender.id]++;

    // Attach vector timestamp
    let packet = {
        message: message,
        sender: sender.id,
        timestamp: [...sender.clock]
    };

    console.log("\n" + sender.name + " sends " + message);
    console.log("Timestamp:", packet.timestamp);

    return packet;
}

// Check whether a message can be delivered
function canDeliver(receiver, packet) {

    let sender = packet.sender;
    let timestamp = packet.timestamp;

    // Condition 1:
    // Message must be the next expected from sender
    if (timestamp[sender] !== receiver.clock[sender] + 1) {
        return false;
    }

    // Condition 2:
    // All causal dependencies must be delivered
    for (let i = 0; i < 3; i++) {

        if (i !== sender) {

            if (timestamp[i] > receiver.clock[i]) {
                return false;
            }
        }
    }

    return true;
}

// Function to deliver a message
function deliver(receiver, packet) {

    receiver.clock[packet.sender] =
        packet.timestamp[packet.sender];

    console.log(
        receiver.name + " DELIVERS " + packet.message
    );

    console.log(
        "Updated Vector Clock:",
        receiver.clock
    );
}

// Function to receive a message
function receive(receiver, packet) {

    console.log("\n" + receiver.name +
        " receives " + packet.message);

    console.log("Message Timestamp:", packet.timestamp);

    if (canDeliver(receiver, packet)) {

        deliver(receiver, packet);

        // Check pending messages again
        checkPending(receiver);

    } else {

        console.log(
            "Cannot deliver " + packet.message
        );

        console.log("Message stored in Pending Queue");

        receiver.pending.push(packet);
    }
}

// Function to check pending messages
function checkPending(receiver) {

    let delivered = true;

    while (delivered) {

        delivered = false;

        for (let i = 0; i < receiver.pending.length; i++) {

            let packet = receiver.pending[i];

            if (canDeliver(receiver, packet)) {

                console.log(
                    "\nChecking Pending Queue..."
                );

                receiver.pending.splice(i, 1);

                deliver(receiver, packet);

                delivered = true;

                break;
            }
        }
    }
}

// ========================================
// STEP 1: P1 SENDS M1
// ========================================

let M1 = multicast(P1, "M1");

// ========================================
// STEP 2: P2 RECEIVES M1
// ========================================

receive(P2, M1);

// ========================================
// STEP 3: P2 SENDS M2
// ========================================

let M2 = multicast(P2, "M2");

// ========================================
// STEP 4: P3 RECEIVES M2 FIRST
// ========================================

receive(P3, M2);

// ========================================
// STEP 5: P3 RECEIVES M1
// ========================================

receive(P3, M1);

// ========================================
// FINAL STATUS
// ========================================

console.log("\n========================================");
console.log("          FINAL STATUS");
console.log("========================================");

console.log("P1 Vector Clock:", P1.clock);
console.log("P2 Vector Clock:", P2.clock);
console.log("P3 Vector Clock:", P3.clock);

console.log("P3 Pending Queue:", P3.pending.length);

console.log("\nBSS PROTOCOL COMPLETED");
