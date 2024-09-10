
const getBookCover = (title) => {
const url = `https://openlibrary.org/search.json?title=` 
+ title; + `.json`

fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        fetch(`https://covers.openlibrary.org/b/olid/` + data.cover_edition_key + `.jpg`) 
            .then(function (response) {
                return response;
            });
    })
};


// const getBookCover = (title) => {
// const url = `https://openlibrary.org/search.json?title=` 
// + title; + `.json`

// fetch(url)
//     .then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         fetch(`https://covers.openlibrary.org/b/olid/` + data.cover_edition_key + `.jpg`) 
//             .then(function (response) {
//                 return response;
//             });
//     })
// };
