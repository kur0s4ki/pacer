// Direct copy of your exact calculation logic from temp/calculator.cjs

function secondsToMmSs(totalSeconds) {
  const s = Math.round(totalSeconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function minPerKmToMmSs(minPerKm) {
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

/** Threshold pace (min per km) exactly as in your Excel formula (without /1440) */
function thresholdMinPerKm(distanceMeters) {
  // The Excel formula divides by 1440 only to format as a time value
  // We use min/km directly without this division
  return 71.4478484 * Math.exp(-0.00143607775 * distanceMeters) + 3.36187527;
}

/** Core calculation following the workbook exactly */
export function calculatePaces(maxDistanceMeters) {
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
  // For distance 2500m with band "<2600", mult["Speed Repetitions"] is 1.15
  // If threshold is about 5.33, speedReps = 5.33 / 1.15 = 4.63 (about 4:38)
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
