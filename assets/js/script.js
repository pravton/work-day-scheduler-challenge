// script for workday scheduler
var workHours = [9 + " AM",10 + " AM",11 + " AM",12 + " PM",1 + " PM",2 + " PM",3 + " PM",4 + " PM",5 + " PM"];

var currentDayTime = dayjs().format('dddd, MMMM D, YYYY h:mm A');

$("#currentDay").text(currentDayTime);

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

for (var i = 0; i < workHours.length; i++) {
    createList(workHours[i]);
    console.log(workHours[i]);
}
