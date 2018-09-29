var sheltersElem = document.querySelector('.shelters');

function filterShelters(evt) {
    let q = event.target.value;

    axios
        .get('/shelters/filter/' + q)
        .then(function(result) {
            let results = result.data;
            sheltersElem.innerHTML = results;
        })
}