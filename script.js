// Sejm API - IX kadencja (lista posłów) = https://api.sejm.gov.pl/sejm/term9/MP

var CURRENT_POST_COUNT = 0;
var SEJM_POLITICIANS;
var HANDLES_TO_NAMES;


fetchJSON('data/parliament_polish_mps.json').then(p => {
    SEJM_POLITICIANS = p;
});

fetchJSON('data/handle_to_name.json').then(htn => {
    HANDLES_TO_NAMES = htn;
});


const main = () => {
    let posts = $('.r-kzbkwu'); // load all elements with Twitter post class 
    if (posts.length < 1) setTimeout(main, 500);
    else if (posts.length == CURRENT_POST_COUNT) return;
    else {
        CURRENT_POST_COUNT = posts.length;
        posts.each(function() {
            if (!$(this).hasClass('searched')) {
                let handle = $(this).find('a > div > span.r-poiln3').text(); // find a @tag of Twitter post's author

                if (HANDLES_TO_NAMES.hasOwnProperty(handle)) {
                    let elem = $(`
                        <div>
                            <span>${ handle }</span>
                        </div>
                    `).css({
                        'color': 'white',
                        'font-family': 'Comic Sans MS'
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