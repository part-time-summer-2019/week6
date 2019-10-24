let cities = [];

(function retrieveData() {
    const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    fetch(url)
        .then(response => response.json())
        .then(data =>
            cities = data
        )
    ;
})();


function findMatches(searchStr) {
    const regExp = new RegExp(searchStr, 'gi');

    return cities
    // filter out the cities the don't match the search string
        .filter(city => city.city.match(regExp) || city.state.match(regExp));
}

function handleChange(e) {
    const regExp = new RegExp(this.value, 'gi');


    const matches = this.value === '' || this.value === undefined ? '' : findMatches(this.value)
        .map(city => {
            const formattedCity = city.city.replace(regExp, `<span class="highlight">${this.value}</span>`)
            const formattedState = city.state.replace(regExp, `<span class="highlight">${this.value}</span>`);

            return `<li>
                <span class="city">${formattedCity}, ${formattedState}</span>
                <span class="population">${Number(city.population).toLocaleString()}</span>
                </li>`;
        })
        .join('');


    document.querySelector('.suggestions')
        .innerHTML = matches;
}

document.querySelector('.searchinput')
        .addEventListener('keyup', handleChange);