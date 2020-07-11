

// Save btn when not saved <i class="fas fa-save fa-lg"></i>
// Save btn when saved <i class="fas fa-pen-square"></i>


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