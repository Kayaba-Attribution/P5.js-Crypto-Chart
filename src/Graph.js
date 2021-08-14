function Graph(data) {
    this.textSize = innerHeight / 48;
    this.textColor = 230;
    this.font = "verdana";
    this.grid;
    this.labels;
    this.candles;

    this.display = function() {
        // Text Parameters
        textFont(this.font);
        textSize(this.textSize);

        // Display on startup
        if (data === undefined) {
            this.grid();
        }
        // Display after user enters a ticker
        else {
            this.grid();
            this.labels();
            this.candles();
        }
    }

    this.grid = function() {
        // Vertical lines
        stroke(80);
        for (var i = 0.1; i < 0.8; i += 0.1) {
            line(floor(innerWidth * i), floor(innerHeight * 0.1),
                 floor(innerWidth * i), floor(innerHeight * 0.8));
        }
        stroke(this.textColor);
        line(floor(innerWidth * 0.1), floor(innerHeight * 0.8),
             floor(innerWidth * 0.1), floor(innerHeight * 0.9));
        line(floor(innerWidth * 0.9), floor(innerHeight * 0.1),
             floor(innerWidth * 0.9), floor(innerHeight * 0.9));

        // Horizonatal Lines
        stroke(80);
        for (var i = 0.1; i < 0.8; i += 0.1) {
            line(floor(innerWidth * 0.1), floor(innerHeight * i),
                 floor(innerWidth * 0.9), floor(innerHeight * i));
        }
        stroke(this.textColor);
        line(floor(innerWidth * 0.1), floor(innerHeight * 0.8),
             floor(innerWidth * 0.9), floor(innerHeight * 0.8));
        line(floor(innerWidth * 0.1), floor(innerHeight * 0.9),
             floor(innerWidth * 0.9), floor(innerHeight * 0.9));
    }

    this.labels = function() {
        // X-axis text
        noStroke();
        fill(this.textColor);

        // Counting down the days
        count = 13;
        for (var i = 0.18; i < 0.8; i += 0.1) {
            text(data.dateLabels[count], floor(innerWidth * i),
                 floor(innerHeight * 0.93));
            count -= 2;
        }

        // Y-axis text
        count = 0;
        for (var i = 0.208; i < 0.8; i += 0.1) {
            text(data.priceLabels[count],
                floor(innerWidth * 0.91),
                floor(innerHeight * i));
            count++;
        }
    }

    this.candles = function() {
        var count = 14;
        strokeWeight(1);
        strokeCap(PROJECT);

        for (var i = 0.15; i < 0.9; i += 0.05) {
            // Price parameters
            var high = dataJSON[data.timeSeries][data.dateKeys[count]]["2a. high (USD)"];
            var low = dataJSON[data.timeSeries][data.dateKeys[count]]["3a. low (USD)"];
            var open = dataJSON[data.timeSeries][data.dateKeys[count]]["1a. open (USD)"];
            var close = dataJSON[data.timeSeries][data.dateKeys[count]]["4a. close (USD)"];

            // Date coordinate
            var x_coor = innerWidth * i;
            var direction = close - open;

            // Mapping price to pixels
            low = map(low,data.priceRange[0], data.priceRange[1],
                         innerHeight * 0.8, innerHeight * 0.1);
            high = map(high,data.priceRange[0], data.priceRange[1],
                         innerHeight * 0.8, innerHeight * 0.1);
            open = map(open,data.priceRange[0], data.priceRange[1],
                         innerHeight * 0.8, innerHeight * 0.1);
            close = map(close,data.priceRange[0], data.priceRange[1],
                         innerHeight * 0.8, innerHeight * 0.1);

            // Drawing high/low vertical line
            stroke(130);
            line(floor(x_coor), low, floor(x_coor), high);

            // Drawing open/close vertical line
            if (direction > 0) {
                // Positive candle open and close box
                fill("#2dc40b");
                stroke("black");
                rectMode(CENTER);
                rect(x_coor, (open+close)/2, innerWidth/40, open-close);
            }
            else {
                // Negative candle open and close box
                fill("#890e05");
                stroke("black");
                rectMode(CENTER);
                rect(x_coor, (open+close)/2, innerWidth/40, open-close);
            }
            count--;
        }
    }
}

