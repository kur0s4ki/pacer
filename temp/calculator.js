#!/usr/bin/env node
/**
 * paceCalculator.js
 *
 * Input:  Max Distance 12min Run (meters)  -> F6
 *
 * Backend Calculations (from your Excel):
 * Threshold (min/km):
 *   = (71.4478484 * EXP(-0.00143607775 * F6) + 3.36187527)
 *   (Excel divides by 1440 only to format as a time value; we use min/km directly)
 *
 * Zone paces (time/pace domain), using "reference value (100%)" = Threshold pace:
 *   Pace = Threshold / multiplier   (multipliers are on SPEED)
 *   Column selection:
 *     if F6 <= 2600      use column K  (<2600 m)
 *     else if F6 <= 3400 use column L  (2600–3400 m)
 *     else               use column M  (>3400 m)
 *
 * Multipliers table (K/L/M by row):
 *   Base                0.77 / 0.78 / 0.82
 *   VT1                 0.84 / 0.87 / 0.90
 *   Sub-Threshold       0.93 / 0.94 / 0.95
 *   Threshold           (reference) = 1.00
 *   VO2max              1.06 / 1.08 / 1.10
 *   Speed Repetitions   1.15 / 1.20 / 1.25
 *
 * HYROX Race Pace (Single):
 *   = AVERAGE(Threshold, Sub-Threshold)   // matches your sheet outputs (e.g., 3200 -> 04:13)
 *
 * Interval durations:
 *   time_at_distance = (SpeedReps pace in min/km) * (distance_m / 1000)
 */

function secondsToMmSs(totalSeconds) {
  const s = Math.round(totalSeconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function minPerKmToMmSs(minPerKm) {
  return secondsToMmSs(minPerKm * 60);
}

function minPerKmToMetersPerSecond(minPerKm) {
  return 1000 / (minPerKm * 60);
}

function durationForDistance(distanceMeters, paceMinPerKm) {
  const v = minPerKmToMetersPerSecond(paceMinPerKm); // m/s
  return secondsToMmSs(distanceMeters / v);
}

function pickBand(distanceMeters) {
  if (distanceMeters <= 2600) return "<2600";
  if (distanceMeters <= 3400) return "2600–3400";
  return ">3400";
}

// Exact multipliers from the sheet (columns K / L / M)
const ZONE_MULTIPLIERS = {
  "<2600": {
    Base: 0.77,
    VT1: 0.84,
    "Sub-Threshold": 0.93,
    Threshold: 1.0,
    VO2max: 1.06,
    "Speed Repetitions": 1.15
  },
  "2600–3400": {
    Base: 0.78,
    VT1: 0.87,
    "Sub-Threshold": 0.94,
    Threshold: 1.0,
    VO2max: 1.08,
    "Speed Repetitions": 1.20
  },
  ">3400": {
    Base: 0.82,
    VT1: 0.90,
    "Sub-Threshold": 0.95,
    Threshold: 1.0,
    VO2max: 1.10,
    "Speed Repetitions": 1.25
  }
};

const INTERVAL_DISTANCES = [200, 400, 600, 800];

/** Threshold pace (min per km) exactly as in your formula (without /1440) */
function thresholdMinPerKm(distanceMeters) {
  return 71.4478484 * Math.exp(-0.00143607775 * distanceMeters) + 3.36187527;
}

/** Core calculation following the workbook exactly */
function calculatePaces(maxDistanceMeters) {
  const distance = Number(maxDistanceMeters);
  if (!Number.isFinite(distance) || distance <= 0) {
    return { error: "Please enter a valid distance in meters." };
  }

  const band = pickBand(distance);
  const mult = ZONE_MULTIPLIERS[band];

  // Reference value (100%) = Threshold pace
  const threshold = thresholdMinPerKm(distance);

  // Zone paces: pace = threshold / multiplier (multipliers are speed-side)
  const base = threshold / mult.Base;
  const vt1 = threshold / mult.VT1;
  const sub = threshold / mult["Sub-Threshold"];
  const thr = threshold; // Threshold (LT2)
  const vo2 = threshold / mult.VO2max;

  // HYROX = average(Threshold, Sub-Threshold)
  const hyrox = (thr + sub) / 2;

  // Speed Repetitions pace
  const speedReps = threshold / mult["Speed Repetitions"];

  // Intervals at Speed Reps pace
  const intervals = INTERVAL_DISTANCES.map((d) => ({
    distance: `${d}m`,
    duration: durationForDistance(d, speedReps)
  }));

  return {
    input: { distance },
    hyrox: minPerKmToMmSs(hyrox),
    zones: [
      { label: "Base (Zone 2)", pace: minPerKmToMmSs(base) },
      { label: "Aerobe Schwelle (VT1)", pace: minPerKmToMmSs(vt1) },
      { label: "Sub-Threshold", pace: minPerKmToMmSs(sub) },
      { label: "Threshold (LT2)", pace: minPerKmToMmSs(thr) },
      { label: "Max. Aerobic Power (VO2max)", pace: minPerKmToMmSs(vo2) }
    ],
    speedReps: {
      pace: minPerKmToMmSs(speedReps),
      intervals
    },
    debug: {
      band,
      threshold_min_per_km: threshold
    }
  };
}

/* ---------- Pretty printing like your console sample ---------- */

function pad(str, width) {
  const s = String(str);
  if (s.length >= width) return s;
  return s + " ".repeat(width - s.length);
}

function printSectionTitle(title) {
  console.log("");
  console.log(title);
  console.log("=".repeat(title.length));
}

function printTwoCol(kv, col1 = 26, col2 = 12) {
  Object.entries(kv).forEach(([k, v]) => {
    console.log(`${pad(k + ":", col1)} ${String(v).padStart(col2, " ")}`);
  });
}

function printTable(rows, headers) {
  const cols = headers.map((h) => h.key);
  const widths = headers.map((h) => h.width);
  const headerLine = headers.map((h, i) => pad(h.label, widths[i])).join("  ");
  console.log(headerLine);
  console.log(headers.map((h, i) => "-".repeat(widths[i])).join("  "));
  rows.forEach((r) => {
    const line = cols.map((c, i) => pad(r[c], widths[i])).join("  ");
    console.log(line);
  });
}

function displayResult(calc) {
  if (calc.error) {
    console.log(calc.error);
    return;
  }

  printSectionTitle("Input");
  printTwoCol({ "Max Distance 12min Run": calc.input.distance });

  printSectionTitle("HYROX");
  printTwoCol({ "Race Pace (Single)": calc.hyrox });

  printSectionTitle("Training");
  const zoneRows = calc.zones.map((z) => ({ zone: z.label, pace: z.pace }));
  printTable(zoneRows, [
    { key: "zone", label: "Intensity Zone", width: 30 },
    { key: "pace", label: "Pace (min/km)", width: 14 }
  ]);

  printSectionTitle("Speed Repetitions");
  printTwoCol({ Pace: calc.speedReps.pace });
  const intervalRows = calc.speedReps.intervals.map((r) => ({
    distance: r.distance,
    duration: r.duration
  }));
  printTable(intervalRows, [
    { key: "distance", label: "Distance", width: 10 },
    { key: "duration", label: "Duration (mm:ss)", width: 18 }
  ]);
}

/* ------------------------- Module and CLI usage ------------------------ */

function run(distanceMeters) {
  const calc = calculatePaces(distanceMeters);
  displayResult(calc);
  return calc;
}

if (require.main === module) {
  const arg = process.argv[2];
  if (!arg) {
    console.log("Usage: node paceCalculator.js <distance_meters>");
    process.exit(1);
  }
  run(Number(arg));
}

module.exports = {
  calculatePaces,
  displayResult,
  run
};
