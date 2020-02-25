export default function(timeSeries) {
  let data = [],
    stock;

  for (let each in timeSeries) {
    stock = timeSeries[each];
    // console.log("TEST", stock)
    data.push([
      new Date(each).getTime(),
      parseFloat(stock["1. open"]),
      parseFloat(stock["2. high"]),
      parseFloat(stock["3. low"]),
      parseFloat(stock["4. close"])
    ]);
  }

  return data.reverse();
}
