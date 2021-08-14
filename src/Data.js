function Data(ticker) {
    var apiKey = "V5ZIBTPZOAWUU4DK";
    this.apiCall = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+ticker+"&market=USD&apikey="+apiKey;
    //this.apiCall = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+apiKey;
    this.parseData;
    this.dateLabels = []; // X-axis labels
    this.dateKeys = []; // Data Key values
    this.priceLabels = []; // Y-axis labels
    this.priceRange = []; // Array to map the relationship between price and pixels
    this.timeSeries = "Time Series (Digital Currency Daily)";
    this.volRange = [];

    // Prepares the data for graphing
    this.parseData = function(dataJSON) {
        // X - AXIS
            // JSON for converting numerical representations of months into abbrev. English
            var months = {
                "01": "Jan",
                "02": "Feb",
                "03": "Mar",
                "04": "Apr",
                "05": "May",
                "06": "Jun",
                "07": "Jul",
                "08": "Aug",
                "09": "Sep",
                "10": "Oct",
                "11": "Nov",
                "12": "Dec"
            };

            // Puts date data into a temporary array
            var dateTemp = [];
            for (var i in dataJSON) {
                for (var j in dataJSON[i]) {
                    dateTemp.push(j);
                }
            }
            console.log(dateTemp)

            // Removes metadata from both arrays
            for (var i = 7; i < dateTemp.length; i++) {
                this.dateKeys.push(dateTemp[i]);
                this.dateLabels.push(dateTemp[i]);
            }
            console.log(this.dateKeys)
            console.log(this.dateLabels)



            // Converts numerical dates to engish
            for (var i = 0; i < this.dateLabels.length; i++) {
                this.dateLabels[i] = months[this.dateLabels[i].substring(5,7)] + " "
                                + this.dateLabels[i].substring(8,10);
            }

            console.log(this.dateLabels)


        // Y - AXIS
            // Getting the lowest price and highest price for the past 15 days
            this.lowest = Number.MAX_VALUE;
            this.highest = Number.MIN_VALUE;
            for (var i = 0; i < 15; i++) {
       
                //console.log(i)
                if (parseFloat(dataJSON[this.timeSeries][this.dateKeys[i]]["3b. low (USD)"]) < this.lowest) {
                    this.lowest = parseFloat(dataJSON[this.timeSeries][this.dateKeys[i]]["3b. low (USD)"]);
                    console.log("LOW: ", this.lowest)
                }

                if (parseFloat(dataJSON[this.timeSeries][this.dateKeys[i]]["2b. high (USD)"]) > this.highest) {
                    this.highest = parseFloat(dataJSON[this.timeSeries][this.dateKeys[i]]["2b. high (USD)"]);
                    console.log("HIGH: ", this.highest)
                }
                
            }
            // Storing the Y-axis labels in an array

            // If the range between the high and low is less than 5, the labels
                // increase by 1.
            if (this.highest - this.lowest < 5) {
                this.priceLabels = [Math.floor(this.lowest + 5)+".00",
                                    Math.floor(this.lowest + 4)+".00",
                                    Math.floor(this.lowest + 3)+".00",
                                    Math.floor(this.lowest + 2)+".00",
                                    Math.floor(this.lowest + 1)+".00",
                                    Math.floor(this.lowest)+".00"];

                this.priceRange = [Math.floor(this.lowest - 1),
                                   Math.floor(this.lowest + 6)];
            }

            // If the range between the high and low is more than 5, the labels
                // increase by a percentage of its range.
            else {
                var rangeDiv = Math.ceil((this.highest - this.lowest)/6);
                this.priceLabels = [Math.floor(this.lowest + (rangeDiv * 5))+".00",
                                    Math.floor(this.lowest + (rangeDiv * 4))+".00",
                                    Math.floor(this.lowest + (rangeDiv * 3))+".00",
                                    Math.floor(this.lowest + (rangeDiv * 2))+".00",
                                    Math.floor(this.lowest + (rangeDiv))+".00",
                                    Math.floor(this.lowest)+".00"];

                this.priceRange = [Math.floor(this.lowest - (rangeDiv)),
                                   Math.floor(this.lowest + (rangeDiv * 6))];
            }
    }
}
