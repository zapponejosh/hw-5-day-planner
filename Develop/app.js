

/* 
on page load the agenda input divs get content from local storage
text divs are empty and user clicks on the pencil and is able to edit the text. 
user clicks save icon and text content update local storage


TIME
If the time has passed a class of "past" is added to the td of the applicable time (time is checked on load and save/edit)
if in the present hour the td has a class of "present" 
if it is a future hour the td has a class of "future"

The date is also stored in localStorage and if the date is not today the localstorage is cleared the the date updated

*/


class Schedule {
    constructor(date) {
        this.date = date;
        this.nine = "";
        this.ten = "";
        this.eleven = "";
        this.twelve = "";
        this.one = "";
        this.two = "";
        this.three = "";
        this.four = "";
        this.five = "";
        // this.nine = nine;
        // this.ten = ten;
        // this.eleven = eleven;
        // this.twelve = twelve;
        // this.one = one;
        // this.two = two;
        // this.three = three;
        // this.four = four;
        // this.five = five;
    }
}

var saveBtn = $( ".c-save" );
var timeSlot = $(".time-slot");

var agendaData = localStorage.getItem("agendaData");

var today = "";

$(document).ready(function () {

    // Adds proper save/edit icon based on saved class
    saveBtn.each(function( index ) {
        if ($( this ).hasClass("saved")) {
            $( this ).html('<i class="fas fa-pen fa-lg"></i>');
            console.log("please save");
        } else {
            $( this ).html('<i class="fas fa-save fa-lg"></i>')
            console.log("Click to edit");
        }
    })

    // Create object for today
    // get from local storage if it exists
    if (!agendaData) {
        today = new Schedule("Sat, July 11")
        localStorage.setItem("agendaData", JSON.stringify(today))
    } else {
        today = JSON.parse(agendaData);
    }

    // display date in DOM
    var currentDate = "Date: " + today.date;
    $("header").append($("#currentDay").text(currentDate));
        
    console.log(today);

    function setAgenda() {

        timeSlot.each(function( i, element) {
            // access the agenda text content
            var agendaTd = $(element).find(".agenda-input");
            console.log(agendaTd);
            console.log(element.id);
            var key = element.id;
            agendaTd.text(today[key]);
    
            // today[key] = agendaTd;
        })

        console.log(today);
    }

    function saveAgenda() {

        timeSlot.each(function( i, element) {
            // access the agenda text content
            var agendaTd = $(element).find(".agenda-input").text();
            console.log(agendaTd);
            console.log(element.id);
            var key = element.id;
    
            today[key] = agendaTd;
            localStorage.setItem("agendaData", JSON.stringify(today))

        })
    }
    
    // get agenda on load
    setAgenda();


    //  Make content Editable or non editable 
    saveBtn.on("click", function () {
         var agendaDiv = $(this).parent().find(".agenda-input")
         var currentStatus = agendaDiv.attr("contenteditable")
         console.log(currentStatus);
        if (currentStatus === "true") {
            agendaDiv.attr("contenteditable", "false");
            agendaDiv.removeClass("editing");
            $( this ).html('<i class="fas fa-pen fa-lg"></i>');
        } else {
            agendaDiv.attr("contenteditable", "true");
            agendaDiv.addClass("editing");
            $( this ).html('<i class="fas fa-save fa-lg"></i>')
            

        }
        saveAgenda()
    });

    // get the date
    // check if the date already has an entry in LS
    // If it is then set the variable to the object and populate the table with the object
    // If it isnt then set set it and creat a new object with empty strings
    // When a user edits a field turn conteneditable to true
    // when a user saves add the data to the object and set it in local storage again
    // STRETCH: User can go several days down the road or back in time (there would be a button that brings them to "today") to set and view schedules stored in localStorage










});