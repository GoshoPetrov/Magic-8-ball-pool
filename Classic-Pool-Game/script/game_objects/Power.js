
const POWER_BIG = "Big balls";
const POWER_DOUBLE_POINTS = "Double points";
const POWER_FATIGUE = "Fatigue";
const POWER_FRICTION = "Friction";
const POWER_SLIPPERY = "Slippery";

function Power(caption){
    this.caption = caption;
}

Power.prototype.start = function () {
    switch (this.caption) {
        case POWER_BIG:
            setBallSize(1.5);
            break;
        case POWER_DOUBLE_POINTS:
            SCORE_SCALE = 2;
            break;
        case POWER_FATIGUE:
            setFatigue(0.1);
            break;
        case POWER_FRICTION:
            break;
        case POWER_SLIPPERY:
            break;
    }
    
}

Power.prototype.stop = function () {
    switch (this.caption) {
        case POWER_BIG:
            setBallSize(1);
            break;
        case POWER_DOUBLE_POINTS:
            SCORE_SCALE = 1;
            break;
        case POWER_FATIGUE:
            setFatigue(1);
            break;
        case POWER_FRICTION:
            break;
        case POWER_SLIPPERY:
            break;
    }
}


function RandomPower() {

    const powers = [
        POWER_BIG,
        POWER_DOUBLE_POINTS,
        POWER_FATIGUE,
        POWER_FRICTION,
        POWER_SLIPPERY,
    ];

    const index = Math.floor(Math.random() * powers.length);
    return new Power(powers[index]);

}