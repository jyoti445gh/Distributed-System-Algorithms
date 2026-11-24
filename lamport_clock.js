
// Lamport Logical Clock Algorithm

let P1 = 0;
let P2 = 0;
let P3 = 0;

console.log("===== LAMPORT LOGICAL CLOCK =====");

// Process P1 performs an event
P1++;
console.log("P1: Event 1 =", P1);

// P1 sends a message to P2
P1++;
let message = P1;
console.log("P1: Sending message with timestamp =", message);

// P2 receives the message
P2 = Math.max(P2, message) + 1;
console.log("P2: Receiving message =", P2);

// P2 performs an internal event
P2++;
console.log("P2: Internal event =", P2);

// P2 sends a message to P3
P2++;
message = P2;
console.log("P2: Sending message with timestamp =", message);

// P3 receives the message
P3 = Math.max(P3, message) + 1;
console.log("P3: Receiving message =", P3);

// P3 performs an internal event
P3++;
console.log("P3: Internal event =", P3);

console.log("\nFinal Clock Values:");
console.log("P1 =", P1);
console.log("P2 =", P2);
console.log("P3 =", P3);
