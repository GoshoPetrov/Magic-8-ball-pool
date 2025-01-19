const LOG = false;

let FRICTION_SCALE = 1;

function setFriction(friction) {
    FRICTION_SCALE = friction;
}

let FATIGUE = 1;

function setFatigue(fatigue) {
    FATIGUE = fatigue;
}

let SCORE_SCALE = 1;
let BALL_SIZE_SCALE = 1;
let BALL_SIZE = 36 * BALL_SIZE_SCALE;

function setBallSize(size){
    BALL_SIZE_SCALE = size;
    BALL_SIZE = 36 * BALL_SIZE_SCALE;
}

const BORDER_SIZE = 50;
const HOLE_RADIUS = 46;

const DELTA = 1/100;

let DISPLAY = true;
let SOUND_ON = true;
let GAME_STOPPED = true;

let KEYBOARD_INPUT_ON = true;

let TRAIN_ITER = 100;
let AI_ON = true;
let AI_PLAYER_NUM = 1;
let DISPLAY_TRAINING = false;
