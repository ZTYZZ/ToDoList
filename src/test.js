/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
    let reg = \[0|1]+\g;
    let reg2 = ^reg;
    let count = 0;
    for(let i = 0; i < s.length; i++) {
        for(let j = 0; j<s.length;j++) {

        }
    }

    return count;
};
console.log(countBinarySubstrings("101011100010");