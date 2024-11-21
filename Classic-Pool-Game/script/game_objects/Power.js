
function Power(caption){
    this.caption = caption;
}

Power.prototype.start = function () {
    if (this.caption === "Big balls") 
    {
        BALL_SIZE_SCALE = 1.5;
    }
    else if (this.caption === "Double points") 
    {
        SCORE_SCALE = 2;
    }
    
}

Power.prototype.stop = function () {
    if (this.caption === "Big balls") 
    {
        BALL_SIZE_SCALE = 1;
    } 
    else if (this.caption === "Double points") 
    {
        SCORE_SCALE = 1;
    }
}


function RandomPower() {

    const powers = [
        "Double points",
        "Big balls",
    ];

    return new Power(powers[
        Math.floor(Math.random() * (powers.length + 1))
    ]);

}