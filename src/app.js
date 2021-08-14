// Global Variables
var screenWidth;
var screenHeight;
var textField;
var searchButton;
var graph;
var ticker;
var data;
var dataJSON;

// Setting the ticker to blank string
ticker = "";

function setup() {
    // Initializing the screen's width and height
    screenWidth = innerWidth;
    screenHeight = innerHeight;

    // Initializing the canvas and the graph
    createCanvas(screenWidth,screenHeight);
    background(25);
    graph = new Graph(data, dataJSON);
    graph.display();

    // Initializing the search bar
    textField = createInput();
    textField.value(ticker);
    textField.position(screenWidth * 0.1, screenHeight * 0.04);
    searchButton = createElement("button").id("searchButton");
    searchButton.position(screenWidth * 0.23, screenHeight * 0.04);

    // When the user enters a new stock ticker
    searchButton.mousePressed(getData)
    textField.changed(getData);
}

function draw() {
    // For when the user resizes their window
    if (screenWidth != innerWidth || screenHeight != innerHeight) {
            ticker = textField.value().toUpperCase();
            searchButton.remove();
            textField.remove();
            setup();
    }
}

function getData() {
    // Save the ticker value to prevent unneccesary API calls
    ticker = textField.value().toUpperCase();
    data = new Data(ticker);
    dataJSON = loadJSON(data.apiCall, gotData);

    // Loading Screen
    noStroke();
    fill(200, 200, 200);
    textSize(screenHeight/8);
    text("Loading",(screenWidth/2.5),(screenHeight/2));

    // Recreates graph when API is called
    function gotData() {
        data.parseData(dataJSON);
        searchButton.remove();
        textField.remove();
        setup();
    }
}
