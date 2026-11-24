
// Vector Clock Algorithm - Three Processes

let P1 = [0, 0, 0];
let P2 = [0, 0, 0];
let P3 = [0, 0, 0];

console.log("===== VECTOR CLOCK ALGORITHM =====");

// P1 performs an event
P1[0]++;
console.log("P1 Internal Event:", P1);

// P1 sends message to P2
P1[0]++;
let message1 = [...P1];

console.log("P1 Sends Message:", message1);

// P2 receives message
for (let i = 0; i < 3; i++) {
    P2[i] = Math.max(P2[i], message1[i]);
}
P2[1]++;

console.log("P2 Receives Message:", P2);

// P2 sends message to P3
P2[1]++;
let message2 = [...P2];

console.log("P2 Sends Message:", message2);

// P3 receives message
for (let i = 0; i < 3; i++) {
    P3[i] = Math.max(P3[i], message2[i]);
}
P3[2]++;

console.log("P3 Receives Message:", P3);

// P3 performs internal event
P3[2]++;

console.log("P3 Internal Event:", P3);

console.log("\nFinal Vector Clocks:");
console.log("P1:", P1);
console.log("P2:", P2);
console.log("P3:", P3);














// /*
//    VECTOR CLOCK ALGORITHM
//    Three Processes: P1, P2, P3
//    Based on Textbook Figure 5.5
// */

// // Initial vector clocks
// let P1 = [0, 0, 0];
// let P2 = [0, 0, 0];
// let P3 = [0, 0, 0];

// console.log("==================================");
// console.log("       VECTOR CLOCK ALGORITHM");
// console.log("       THREE PROCESS SYSTEM");
// console.log("==================================");

// // Function to display vector clock
// function display(process, event, clock) {
//     console.log(
//         process + " " + event + " = (" + clock.join(",") + ")"
//     );
// }

// // Function for internal event
// function internalEvent(clock, processIndex) {
//     clock[processIndex]++;
// }

// // Function for receiving a message
// function receiveMessage(receiver, message, processIndex) {

//     // Take maximum of both vectors
//     for (let i = 0; i < 3; i++) {
//         receiver[i] = Math.max(receiver[i], message[i]);
//     }

//     // Increment receiver's own clock
//     receiver[processIndex]++;
// }

// // ----------------------------------
// // PROCESS P1
// // ----------------------------------

// // Event e11: Internal event
// internalEvent(P1, 0);
// display("P1", "e11", P1);

// // Event e12: Send message to P2
// internalEvent(P1, 0);
// display("P1", "e12 (Send)", P1);

// // Save message timestamp
// let message1 = [...P1];


// // ----------------------------------
// // PROCESS P2
// // ----------------------------------

// // Event e21: Internal event
// internalEvent(P2, 1);
// display("P2", "e21", P2);

// // Event e22: Receive message from P1
// receiveMessage(P2, message1, 1);
// display("P2", "e22 (Receive)", P2);


// // ----------------------------------
// // PROCESS P3
// // ----------------------------------

// // Event e31: Internal event
// internalEvent(P3, 2);
// display("P3", "e31 (Send)", P3);

// // Save message timestamp
// let message2 = [...P3];

// // Event e32: Internal event
// internalEvent(P3, 2);
// display("P3", "e32", P3);


// // ----------------------------------
// // PROCESS P2 CONTINUES
// // ----------------------------------

// // Event e23: Receive message from P3
// receiveMessage(P2, message2, 1);
// display("P2", "e23 (Receive)", P2);

// // Event e24: Send message to P1
// internalEvent(P2, 1);
// display("P2", "e24 (Send)", P2);

// // Save message timestamp
// let message3 = [...P2];


// // ----------------------------------
// // PROCESS P1 RECEIVES MESSAGE
// // ----------------------------------

// // Event e13: Receive message from P2
// receiveMessage(P1, message3, 0);
// display("P1", "e13 (Receive)", P1);


// // ----------------------------------
// // FINAL VECTOR CLOCKS
// // ----------------------------------

// console.log("\n==================================");
// console.log("       FINAL VECTOR CLOCKS");
// console.log("==================================");

// console.log("P1:", P1);
// console.log("P2:", P2);
// console.log("P3:", P3);
