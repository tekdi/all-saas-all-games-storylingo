
export function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }
  
  export function compareArrays(arr1, arr2) {
    let words_result = [];
  
    // Iterate over each element and compare
    for (var k in arr1){
      if (arr2[k] === "" || arr2[k] === undefined)
      {
        // Element not available on the same key
        words_result.push('-1');
      }
      else if (arr1[k] === arr2[k]) {
        // Elements match on the same key
        words_result.push('1');
      }
      else {
        // Element does not match on the same key
        words_result.push('0');
      }
    }
    if (arr1.length < arr2.length)
    {
      for (let i = arr1.length; i < arr2.length; i++){
        words_result.push('-1');
      }
    }
    return words_result;
  }
  