
/*
   BERKELEY CLOCK SYNCHRONIZATION ALGORITHM
   Four Machines: Master, P1, P2, P3
*/

// Initial clock values
let clocks = [100, 110, 90, 120];

let machines = ["Master", "P1", "P2", "P3"];

console.log("======================================");
console.log("   BERKELEY CLOCK SYNCHRONIZATION");
console.log("======================================");

// STEP 1: Display original clock values

console.log("\nInitial Clock Values:");

for (let i = 0; i < clocks.length; i++) {
    console.log(machines[i] + " = " + clocks[i]);
}

// STEP 2: Master calculates total time

let sum = 0;

for (let clock of clocks) {
    sum = sum + clock;
}

console.log("\nTotal Clock Time =", sum);

// STEP 3: Calculate average time

let average = sum / clocks.length;

console.log("Average Clock Time =", average);

// STEP 4: Calculate adjustments

console.log("\nClock Adjustments:");

let adjustments = [];

for (let i = 0; i < clocks.length; i++) {

    let adjustment = average - clocks[i];

    adjustments.push(adjustment);

    console.log(
        machines[i] + " Adjustment = " + adjustment
    );
}

// STEP 5: Synchronize all clocks

console.log("\nSynchronizing Clocks...");

let synchronizedClocks = [];

for (let i = 0; i < clocks.length; i++) {

    let newTime = clocks[i] + adjustments[i];

    synchronizedClocks.push(newTime);
}

// STEP 6: Display final clock values

console.log("\nFinal Synchronized Clock Values:");

for (let i = 0; i < synchronizedClocks.length; i++) {

    console.log(
        machines[i] + " = " + synchronizedClocks[i]
    );
}

console.log("\n======================================");
console.log("   CLOCK SYNCHRONIZATION COMPLETED");
console.log("======================================");
