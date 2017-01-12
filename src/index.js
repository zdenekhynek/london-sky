import mojs from 'mo-js';
import MojsPlayer from 'mojs-player';
import MojsCurveEditor from 'mojs-curve-editor';

/* colors */
const GRAY = '#636262';
const YELLOW = '#f3d836';
const RED = '#d8502a';
const WHITE = '#ffffff';

const START_SCALE = 0;
const MID_SCALE = 0.2;
const END_SCALE = 5;
const SMALL_RADIUS = 200;
const DURATION_IN = 300;
const DURATION_OUT = 600;
const PAUSE = 600;
const DELAY = DURATION_IN + PAUSE + DURATION_OUT / 2;

//  const EASING = 'linear.none';

const curve1 = new MojsCurveEditor({ name: 'circle1curve' });
const curve1a = new MojsCurveEditor({ name: 'circle1acurve' });

const EASING_IN = curve1.getEasing();
const EASING_OUT = curve1a.getEasing();

function addColorCircle(timeline, color, delay = 0) {
  const circle = new mojs.Shape({
    shape: 'circle',
    scale: { [START_SCALE]: MID_SCALE },
    radius: SMALL_RADIUS,
    duration: DURATION_IN,
    easing: EASING_IN,
    fill: color,
    delay,
  }).then({
    delay: PAUSE,
    duration: DURATION_OUT,
    scale: { [MID_SCALE]: END_SCALE },
    easing: EASING_OUT,
  });

  timeline.add(circle);
}

function addCircleOutline(timeline, color, radius = 1.2, strokeWidth = 20,
  direction = 1, delay = 0) {
  const outline = new mojs.Shape({
    shape: 'circle',
    radius: SMALL_RADIUS * radius,
    scale: { 0.1: 0.35 },
    angle: { 0: 180 },
    strokeWidth,
    strokeDasharray: '100%',
    strokeDashoffset: { [`${-direction * 100 }%`]: `${direction * 100 }%` },
    duration: DURATION_IN * 3,
    fill: 'none',
    stroke: color,
    delay,
    easing: EASING_IN,
  });

  timeline.add(outline);
}

// function addStripe(timeline) {
//   const rect = new mojs.Shape({
//     shape: 'rect',
//     radius: { 1: 5 },
//     radiusX: { 1: 20 },
//     angle: 45,
//     left: { '50%': '45%' },
//     top: { '50%': '40%' },
//     fill: GRAY,
//     easing: EASING_IN,
//   }).then({
//     left: { to: '50%' },
//     top: { to: '50%' },
//     delay: PAUSE / 1.6,
//     duration: DURATION_OUT / 1.6,
//     easing: EASING_OUT,
//   });

//   timeline.add(rect);
// }

const timeline = new mojs.Timeline();

let start = 0;
const delay1 = 0; //  DELAY / 5;
const delay2 = DELAY / 3;

const WIDTH_1 = 25;
const WIDTH_2 = 55;

const RADIUS_1 = 1.1;
const RADIUS_2 = 1.5;

addColorCircle(timeline, GRAY);
addCircleOutline(timeline, GRAY, RADIUS_1, WIDTH_1, 1, delay1);
addCircleOutline(timeline, GRAY, RADIUS_2, WIDTH_2, -1, delay2);

start = (DELAY * 1);

addColorCircle(timeline, YELLOW, DELAY);
addCircleOutline(timeline, YELLOW, RADIUS_1, WIDTH_1, 1, start + delay1);
addCircleOutline(timeline, YELLOW, RADIUS_2, WIDTH_2, -1, start + delay2);

start = (DELAY * 2);

addColorCircle(timeline, RED, DELAY * 2);
addCircleOutline(timeline, RED, RADIUS_1, WIDTH_1, 1, start + delay1);
addCircleOutline(timeline, RED, RADIUS_2, WIDTH_2, -1, start + delay2);

start = (DELAY * 3);

addColorCircle(timeline, WHITE, DELAY * 3);
addCircleOutline(timeline, WHITE, RADIUS_1, WIDTH_1, 1, start + delay1);
addCircleOutline(timeline, WHITE, RADIUS_2, WIDTH_2, -1, start + delay2);

const player = new MojsPlayer({
  isRepeat: true,
  isPlaying: true,
  add: timeline,
});

// const rect = new mojs.Shape({
//   shape: 'rect',
//   radius: { 1: 5 },
//   radiusX: { 1: 20 },
//   angle: 45,
//   left: { '50%': '45%' },
//   top: { '50%': '40%' },
//   fill: GRAY,
//   easing: EASING_IN,
// }).then({
//   left: { to: '50%' },
//   top: { to: '50%' },
//   delay: PAUSE,
//   duration: DURATION_OUT,
//   easing: EASING_OUT,
// });


// const circle2 = new mojs.Shape({
//   shape: 'circle',
//   scale: { 0: 5 },
//   fill: '#343434',
//   radius: SMALL_RADIUS,
//   duration: DURATION_OUT * 4,
//   delay: DURATION_IN + PAUSE,
//   easing: 'linear.none',
// });

// const circle4 = new mojs.Shape({
//   shape: 'circle',
//   scale: { 0: 40 },
//   fill: '#c4ac1d',
//   radius: SMALL_RADIUS,
//   duration: DURATION_OUT - 100,
//   delay: 2 * DURATION_OUT - 150,
//   easing: EASING,
// });

// const circle6 = new mojs.Shape({
//   shape: 'circle',
//   scale: { 0: 40 },
//   fill: '#b34123',
//   radius: SMALL_RADIUS,
//   duration: DURATION_OUT - 100,
//   delay: 3 * DURATION_OUT - 150,
//   easing: EASING,
// });
