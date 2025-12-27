// paste your ORIGINAL bikes array here (the one with imageUrl only)
const bikes = [
  // <-- your existing 44 bikes, unchanged
];

// AUTO-CONVERT TO EXPLICIT NESTED ARRAYS
const finalBikes = bikes.map(b => ({
  ...b,
  images: [
    b.imageUrl,
    b.imageUrl,
    b.imageUrl,
    b.imageUrl
  ]
}));

console.log(JSON.stringify(finalBikes, null, 2));
