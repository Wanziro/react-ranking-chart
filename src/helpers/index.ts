export const numberFormatter = (num: any) => {
  if (
    isNaN(num) ||
    num === undefined ||
    num === null ||
    typeof num === "undefined"
  ) {
    // throw new Error(`numberFormatter Failed,not a NUM`)
    // console.log("Num:-", num)
    return "";
  }
  // console.log("Num:-", num)
  let sign = "";
  if (num < 0) {
    sign = "-";
  }
  const str = Math.abs(num).toString();
  let lastComma = 0;
  let lastDot = str.lastIndexOf(".");
  if (lastDot == -1) {
    lastComma = str.length - 4;
  } else {
    lastComma = lastDot - 4;
  }

  // console.log(lastComma);
  let newStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    if (i == lastComma) {
      newStr = "," + newStr;
      lastComma -= 2;
    }

    newStr = str[i] + newStr;
  }
  if (sign === "-") {
    newStr = sign + newStr;
  }
  if (newStr.includes("e")) {
    return exponentialToFixed(newStr);
  }
  return newStr;
};

function exponentialToFixed(x: any) {
  if (Math.abs(+x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
