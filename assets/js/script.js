// script for workday scheduler
var workHours = [9 + " AM",10 + " AM",11 + " AM",12 + " PM",1 + " PM",2 + " PM",3 + " PM",4 + " PM",5 + " PM"];

//array for text Data
var textData = [];
//get current date and time
var currentDayTime = dayjs().format('dddd, MMMM D, YYYY h:mm A');
//display the current day and time
$("#currentDay").text(currentDayTime);

//function to generate time blocks
var createList = function(workHour, taskText) {
    //create the hourContainer/time-block
    var hourContainer = $("<li>").addClass("time-block row").attr("id", i)
    //hourBlock
    var hourBlock = $("<div>")
    .addClass("col-2 col-md-1 hour")
    .text(workHour);
    //contentBlock
    var contentBlock = $("<textarea>")
    .addClass("col-8 col-md-10 description")
    .text(taskText);
    //saveBlock
    var saveBlock = $("<button>")
    .addClass("saveBtn col-2 col-md-1")
    .html("<i class='fas fa-save'></i>");
    //append the created blocks to hourContainer/time-block
    hourContainer.append(hourBlock, contentBlock, saveBlock);
    //append the hourContainer/time-block to the .container
    $(".container").append(hourContainer);

};

//Loop the function to generate multiple time blocks
for (var i = 0; i < workHours.length; i++) {
    createList(workHours[i]);
}

//function to trackTime
var trackTime = function() {
    //get the current hour
    var currentHour = parseInt(dayjs().format('H'));
    //test the hour
    //var currentHour = 12;
    //loop the function to test the hours
    $(".time-block").each(function() {
        //get the hours from .time-block
        var workHour = parseInt($(this).children().text());
        //change the time to 24h
        if (workHour <= 5) {
            workHour += 12;
        }
        //past statement
        if (currentHour > workHour) {
            $(this).removeClass("future")
            .removeClass("present")
            .addClass("past");
        //present statement
        } else if (currentHour === workHour) {
            $(this).removeClass("future")
            .removeClass("past")
            .addClass("present");
        //future statement
        } else {
            $(this).removeClass("present")
            .removeClass("past")
            .addClass("future");
        }
    })
}

//save the content to localStorage each time when the button is clicked
$(".saveBtn").on("click", function(){
    var updatedText = $(this).siblings("textarea").val();
    var textId = $(this).closest(".time-block").attr("id");

    //update the textData
    textData.push({
        text: updatedText,
        id: textId
    })
    
    //save the textData to localStorage
    localStorage.setItem("textData", JSON.stringify(textData));
});

//load data function
var loadData = function() {
    //get the data from localstorage
    textData = JSON.parse(localStorage.getItem("textData"));
    //if the loaded data is empty set the textData empty
    if (!textData) {
        textData = [];
    }
    //assign the values to time-blocks
    $(".time-block").each(function(){
        var getId = $(this).attr("id");
        for (var i = 0; i < textData.length; i++) {
            if (getId === textData[i].id) {
                $(this).children("textarea").text(textData[i].text);
            }
        }
    });

}

//add a clear button to clear the textarea and storage
var clearAllButton = document.getElementById("clearAllButton");

var clearAllfunc = clearAllButton.addEventListener("click", function() {
    textData = [];

    localStorage.setItem("textData", JSON.stringify(textData));

    textData = JSON.parse(localStorage.getItem("textData"));

    //assign the values to time-blocks
    $(".time-block").each(function(){
        var getId = $(this).attr("id");
        for (var i = 0; i < textData.length; i++) {
            if (getId === textData[i].id) {
                $(this).children("textarea").text(textData[i].text);
            }
        }
    }) 

    document.location.replace("./");
});

//load the data when the page loads
loadData();

//run the trackTime function when page loads
trackTime();

// run the function in set interval of 30 minutes 
setInterval(function(){
    trackTime();
}, (1000*60)*30);