

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


$(document).ready(function () {
// Adds proper save/edit icon based on saved class
    $( ".c-save" ).each(function( index ) {
        if ($( this ).hasClass("saved")) {
            $( this ).html('<i class="fas fa-pen fa-lg"></i>');
            console.log("please save");
        } else {
            $( this ).html('<i class="fas fa-save fa-lg"></i>')
            console.log("Click to edit");
        }
    })


});