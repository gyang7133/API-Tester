const address = [];
const apiKey = "AIzaSyBCV-XaXEae9Nr0WjrZyfHjm5bUi6CfZRs";
const placeIDs = [];
let map;
let restuarantIDs = [];

//check to see if check boxes are disabled
let btnDisabled = false;

//term to search for
let toSearchFor = "";

//checks to see if user completed form
let isFormComplete = false;

let placesToDump = [];



$(document).ready(function () {
    $(".form-check-input").on("click", function () {
        $(this).attr("isSelected", "true");
        $("#rest-info").empty();
        toSearchFor = "";
        toSearchFor = $(this).attr("data-text");

        isFormComplete = true;
        restuarantIDs = [];

        if (!btnDisabled) {
            disableBoxes(this);

        } else if (btnDisabled) {
            releaseBoxes(this);

        }


    });
});

// disables other boxes after the user chooses one
const disableBoxes = (caller) => {
    let chosenBox = caller;
    let storedTxt = $(chosenBox).attr("data-text");
    btnDisabled = true;
    switch (storedTxt) {
        case "hamburgers":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled");
            break;
        case "breakfast":
            $("#check-diner").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled");
            break;
        case "japanese":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-diner").attr("disabled", "disabled");
            break;
        default:
            return;
    }
}

//if the user deselects their box, the other boxes will be clickable
const releaseBoxes = (caller) => {
    let storedTxt = $(caller).attr("data-text");

    switch (storedTxt) {
        case "hamburgers":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-japanese").removeAttr("disabled");
            btnDisabled = false;

            break;
        case "breakfast":
            $("#check-diner").removeAttr("disabled");
            $("#check-japanese").removeAttr("disabled");
            btnDisabled = false;

            break;
        case "japanese":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-diner").removeAttr("disabled");
            btnDisabled = false;

            break;
        default:
            return;
    }

}

//gets the address the user inputs
const getAddress = () => {
    let street = $("#address").val().trim();
    let city = $("#city").val().trim();
    let state = $("#state").val().trim();
    let zipcode = $("#zipcode").val().trim();

    //pushes it to the address array
    address.push(street, city, state, zipcode);
}

$('#submit-geo').on('click', function () {
    //if the user has given an address and chosen what they want to search for
    if (isFormComplete) {
        getAddress();

        //sets the address
        let userAddress = address.join();
        let coords;

        let queryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${apiKey}`;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {


            let source = response.results;

            for (let i = 0; i < source.length; i++) {
                //creates a variable that will hold the users lat and lng coordinates
                coords = { lat: source[i].geometry.location.lat, lng: source[i].geometry.location.lng };

            }
            //initialize map with user's coordinates
            initMap(coords);
        });
    } else {
        return false;
    }

});

//Render Search Results
const renderResults = function()
{
    const stock = $(this).attr('data-name');
    
}





const getTravelUrl = (origin, destination) => {
    return `<a href="https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving" target="_blank">${destination}</a>`;
}

