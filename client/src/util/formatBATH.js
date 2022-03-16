const formatBATH = (num) => {
    num = Number(num);
    var p = num.toFixed(2).split(".");
    return "฿" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

export default formatBATH;