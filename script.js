// Sejm API - IX kadencja (lista posłów) = https://api.sejm.gov.pl/sejm/term9/MP

var CURRENT_POST_COUNT = 0;
var SEJM_POLITICIANS = [];
var HANDLES_TO_NAMES;


fetchJSON('data/parliament_polish_mps.json').then(p => {
    SEJM_POLITICIANS = p;
});

fetchJSON('data/handle_to_name.json').then(htn => {
    HANDLES_TO_NAMES = htn;
});

const hideElement = (elem) => {
    elem.css('display', 'none');
};


const main = () => {
    let posts = $('.r-kzbkwu'); // load all elements with Twitter post class 
    if (posts.length < 1) setTimeout(main, 500);
    else if (posts.length == CURRENT_POST_COUNT) return;
    else {
        CURRENT_POST_COUNT = posts.length;
        posts.each(function() {
            if (!$(this).hasClass('searched')) {
                let handle = $(this).find('a > div > span.r-poiln3').text(); // find a @tag of Twitter post's author

                if (HANDLES_TO_NAMES.hasOwnProperty(handle)) { // if this person exists in JSON
                    let person;
                    for (person of SEJM_POLITICIANS) {
                        if (person.firstLastName.toLowerCase() == HANDLES_TO_NAMES[handle].toLowerCase()) break;
                    }

                    let elem = $(`
                        <div>
                            <span
                                class='person-info'
                                title='${ 
                                    (person.firstLastName) + '\n'
                                    + 'okręg wyborczy - ' + (person.districtName) + ' (nr ' + (person.discritNum) + ')\n'
                                    + 'aktywn' + (person.firstName[person.firstName.length-1] === 'a' ? 'a' : 'y') + ' w polityce - ' + (person.active ? 'tak' : 'nie') + '\n'  // if true then 'tak' else 'nie'
                                    + 'email - ' + (person.email) + ' (kliknij aby skopiować)'
                                }'
                            >
                                &#9432; Człon${ (person.firstName[person.firstName.length-1] === 'a' ? 'kini' : 'ek') } klubu ${ person.club }
                            </span>
                        </div>
                    `).css({
                        'color': 'rgb(109, 114, 119)',
                        'font-family': '\'Segoe UI\', system-ui, sans-serif',
                        'margin-bottom': '5px',
                        'font-weight': '550',
                    });

                    let onClickElem = $(`
                        <div id='popup'>
                            <span>
                                Email został skopiowany do schowka.
                            </span>
                        </div>
                    `).css({
                        'background': '#1d9bf0',
                        'color': 'white',
                        'font-family': '\'Segoe UI\', system-ui, sans-serif',
                        'font-weight': 'bold',
                        'border-radius': '50px',
                        'text-align': 'center',
                        'width': '300px',
                        'padding': '15px',
                        'position': 'fixed',
                        'top': 'calc(100vh - 70px)',
                        'left': 'calc(50% - 150px)',
                        'display': 'none',
                    });
                    $('body').append(onClickElem);

                    $('.person-info').click(function (elem) {
                        navigator.clipboard.writeText(person.email);    // copy email to clipboard on click
                        $('#popup').css('display', 'block');
                        setTimeout(hideElement, 2000, $('#popup'));
                        elem.stopPropagation();                         // remove other onclick functionalities
                    });

                    $(this).addClass('searched');
                    $(this).children(':last-child').before(elem);
                }
            }
        });
    }
}

document.addEventListener('scroll', main);

if (document.readyState === 'complete') main();
else {
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') main();
    }
}