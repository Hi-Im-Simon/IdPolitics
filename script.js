// class = r-kzbkwu
// Sejm API - IX kadencja (lista posłów) = https://api.sejm.gov.pl/sejm/term9/MP
document.body.style.border = "5px solid blue";

// document.body.appendChild(document.createElement('p'));
// posts[2].appendChild(document.createElement('p'));


const func = () => {
    var posts = document.getElementsByTagName('article');
    if (posts.length < 1) {
        setTimeout(func, 1000);
    }
    else {
        // for (var i = 0; i < posts.length; i++) {
        //     let el = document.createElement('p');
        //     console.log('eo2');
        //     posts[i].appendChild(el);
        // }
        console.log(posts);
    }
}

if (document.readyState === 'complete') {
    func();
} else {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            func();
        }
    }
}