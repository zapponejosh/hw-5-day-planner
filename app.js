// console.log(moment());
// console.log(moment()._d.getDay());

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
  }
}

var saveBtn = $(".c-save");
var timeSlot = $(".time-slot");

function createDate(x) {
  var m = moment();
  var date = "";
  if (x === 0) {
    date = m.format("dddd, MMMM Do YYYY");
  } else if (x === 1) {
    m = m.add(1, "days");
    date = m.format("dddd, MMMM Do YYYY");
  } else if (x === -1) {
    m = m.add(-1, "days");
    date = m.format("dddd, MMMM Do YYYY");
  } else {
    console.log("CreateDate error");
    return;
  }

  return date;
}

var today = "";

var chosenDate = 0;

$(document).ready(function () {
  var lsVar = "agendaData-" + createDate(chosenDate);
  // console.log(lsVar);
  var agendaData = localStorage.getItem(lsVar);

  // get agenda and set time status on load
  chosenAgenda();

  $("#button-group").delegate(".date-btn", "click", function () {
    $(".date-btn").each(function (i, element) {
      $(element).addClass("btn-dark");
    });
    if ($(this).attr("id") === "tomorrow") {
      chosenDate = 1;
      $(this).removeClass("btn-dark");
      $(this).addClass("btn-primary");
    } else if ($(this).attr("id") === "today") {
      chosenDate = 0;
      $(this).removeClass("btn-dark");
      $(this).addClass("btn-primary");
    } else if ($(this).attr("id") === "yesterday") {
      chosenDate = -1;
      $(this).removeClass("btn-dark");
      $(this).addClass("btn-primary");
    } else {
      // console.log("broken btn" + $(this).attr("id"))
      return;
    }
    lsVar = "agendaData-" + createDate(chosenDate);
    agendaData = localStorage.getItem(lsVar);
    chosenAgenda();
    // console.log("not broken btn")
  });

  // Adds proper save/edit icon based on saved class
  saveBtn.each(function (index) {
    if ($(this).hasClass("saved")) {
      $(this).html('<i class="fas fa-pen fa-lg"></i>');
      // console.log("please save");
    } else {
      $(this).html('<i class="fas fa-save fa-lg"></i>');
      // console.log("Click to edit");
    }
  });

  // Create object for today
  // get from local storage if it exists
  function chosenAgenda() {
    if (!agendaData) {
      today = new Schedule(createDate(chosenDate));
      localStorage.setItem(lsVar, JSON.stringify(today));
    } else {
      today = JSON.parse(agendaData);
      if (today.date !== createDate(chosenDate)) {
        today.date = createDate(chosenDate);
        localStorage.setItem(lsVar, JSON.stringify(today));
      }
    }
    // display date in DOM
    var currentDate = today.date;
    $("#currentDay").text(currentDate);

    setAgenda();
    timeCheck();
  }

  // console.log(today);

  function setAgenda() {
    timeSlot.each(function (i, element) {
      // access the agenda text content
      var agendaTd = $(element).find(".agenda-input");
      // console.log(agendaTd);
      // console.log(element.id);
      var key = element.id;
      agendaTd.text(today[key]);
    });

    // console.log(today);
  }

  function saveAgenda() {
    timeSlot.each(function (i, element) {
      // access the agenda text content
      var agendaTd = $(element).find(".agenda-input").text();
      // console.log(agendaTd);
      // console.log(element.id);
      var key = element.id;

      today[key] = agendaTd;
      localStorage.setItem(lsVar, JSON.stringify(today));
    });
  }

  // saveBtn.parent().on("click", makeEditable);
  //  Make content Editable or non editable
  saveBtn.on("click", makeEditable);

  function makeEditable() {
    var agendaDiv = $(this).parent().find(".agenda-input");
    var currentStatus = agendaDiv.attr("contenteditable");
    //  console.log(currentStatus);
    if (currentStatus === "true") {
      agendaDiv.attr("contenteditable", "false");
      agendaDiv.removeClass("editing");
      $(this).html('<i class="fas fa-pen fa-lg"></i>');
    } else {
      agendaDiv.attr("contenteditable", "true");
      agendaDiv.addClass("editing");
      agendaDiv.focus();
      $(this).html('<i class="fas fa-save fa-lg"></i>');
    }
    saveAgenda();
    timeCheck();
  }

  function timeCheck() {
    var currentTime = moment()._d.getHours();
    // For testing
    // var currentTime = 12;
    // console.log(currentTime);

    timeSlot.each(function (i, element) {
      var agendaTd = $(element).find(".c-agenda");
      var elementTime = $(element).attr("data-time");
      agendaTd.removeClass("future");
      agendaTd.removeClass("present");
      agendaTd.removeClass("past");
      if (chosenDate === 1) {
        agendaTd.addClass("future");
      } else if (chosenDate === -1) {
        // console.log("-1")
        agendaTd.addClass("past");
      } else if (elementTime == currentTime && chosenDate === 0) {
        agendaTd.addClass("present");
      } else if (elementTime <= currentTime && chosenDate === 0) {
        agendaTd.addClass("past");
      } else if (elementTime >= currentTime && chosenDate === 0) {
        agendaTd.addClass("future");
      } else {
        console.log("time check error");
      }
    });
    // console.log(chosenDate);
  }
});
