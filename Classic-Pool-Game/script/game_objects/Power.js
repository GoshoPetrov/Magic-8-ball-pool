
function Power(caption){
    this.caption = caption;
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