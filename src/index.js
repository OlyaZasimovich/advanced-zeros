module.exports = function getZerosCount(number, base) {
  function sortUnique(arr) {
  arr.sort();
  var last_i;
  for (var i=0;i<arr.length;i++)
    if ((last_i = arr.lastIndexOf(arr[i])) !== i)
      arr.splice(i+1, last_i-i);
  return arr;
}

function dividersBase(base) {
  var divider = 2;
  var dividerArray = [];

  while (base > 1) {
    while (base % divider === 0) {
      dividerArray.push(divider);
      base = Math.floor(base / divider);
    }
    if (divider === 2) {
      divider++;
    } else {
      divider = divider + 2;
    }
  }

  return sortUnique(dividerArray);
}



function min(arrayNumbers) {
  return Math.min.apply(null, arrayNumbers);
}

function groupPairs(pairs) {
  var grouped = {};

  for (var i = 0; i < pairs.length; i++) {
    var currentNumber = pairs[i];
    if (!grouped[currentNumber]) {
      grouped[currentNumber] = 1;
    } else {
      grouped[currentNumber]++;
    }
  }

  return grouped;
}


module.exports = function getZerosCount(number, base) {
  var counter;
  var dividers = dividersBase(base);
  var dividerPairs = [];

  for (var i = 0; i < dividers.length; i++) {
    var baseNumber = base;
    while (baseNumber % dividers[i] === 0) {
      dividerPairs.push(dividers[i]);
      baseNumber = Math.floor(baseNumber / dividers[i]);
    }
  }

  var groupedPairs = groupPairs(dividerPairs);
  var keys = Object.keys(groupedPairs);

  var countZeros = 0;
  var zerosArray = [];
  var temp = number;
  for (var i = 0; i < keys.length; i++) {
    var val = parseInt(keys[i]);
    var pow = groupedPairs[keys[i]];

    while (number >= val) {
      number = Math.floor(number / val);
      countZeros += number;
    }
    zerosArray.push(Math.floor(countZeros / pow));
    countZeros = 0;
    number = temp;
  }

  counter = min(zerosArray);
  return counter;
};
}
