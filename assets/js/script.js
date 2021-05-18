// script for workday scheduler
var workHours = [9 + " AM",10 + " AM",11 + " AM",12 + " PM",1 + " PM",2 + " PM",3 + " PM",4 + " PM",5 + " PM"];
//get current date and time
var currentDayTime = dayjs().format('dddd, MMMM D, YYYY h:mm A');
//display the current day and time
$("#currentDay").text(currentDayTime);

//function to generate time blocks
var createList = function(workHour, taskText) {
    var hourContainer = $("<li>").addClass("time-block row").attr("id", i)
    var hourBlock = $("<div>")
    .addClass("col-2 col-md-1 hour")
    .text(workHour);

    var contentBlock = $("<textarea>")
    .addClass("col-8 col-md-10 description")
    .text(taskText);
    

    var saveBlock = $("<button>")
    .addClass("saveBtn col-2 col-md-1")
    .html("<i class='fas fa-save'></i>");

    hourContainer.append(hourBlock, contentBlock, saveBlock);

    $(".container").append(hourContainer);

}

//Loop the function to generate multiple time blocks
for (var i = 0; i < workHours.length; i++) {
    createList(workHours[i]);
}


function trackTime() {
    //get the current hour
    var currentHour = parseInt(dayjs().format('H'));
    //test the hour
    //var currentHour = 17;
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

//run the trackTime function when page loads
trackTime();

// run the function in set interval of 30 minutes 
setInterval(function(){
    trackTime();
}, (1000*60)*30);


