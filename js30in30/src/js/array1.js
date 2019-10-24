
export default class ArrayCardio {
    run() {
        const inventors = [
            {first: 'Albert', last: 'Einstein', year: 1879, passed: 1955},
            {first: 'Isaac', last: 'Newton', year: 1643, passed: 1727},
            {first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642},
            {first: 'Marie', last: 'Curie', year: 1867, passed: 1934},
            {first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630},
            {first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543},
            {first: 'Max', last: 'Planck', year: 1858, passed: 1947}
        ];

        const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire',
                        'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester',
                        'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving',
                        'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph',
                        'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony',
                        'Blake, William'];


        // Filter the list of inventors to those born in the 1500s
        const inventors1500 = inventors.filter(inventor =>
            inventor.year >= 1500 && inventor.year < 1600
        );
        console.table(inventors1500);

        // Array of the inventor's first and last names
        const inventorFullNames = inventors.map(inventor =>
            `${inventor.last}, ${inventor.first}`
        );
        console.table(inventorFullNames);

        // Sort the inventors by birth date: oldest to youngest
        const inventorsSorted = inventors.sort((a, b) =>
            a.year - b.year
        );
        console.table(inventorsSorted);

        // How many years did all the inventors live ?
        const sumOfYears = inventors.reduce((total, inventor) => total + (inventor.passed - inventor.year), 0);
        console.log(`Sum of all years ${sumOfYears}`);

        // Sort the inventors by years lived
        const invetorsSortedByYearsLived = inventors.sort((a, b) => {
            let aYearsLived = a.passed - a.year;
            let bYearsLived = b.passed - b.year;

            return bYearsLived - aYearsLived;
        });
        console.table(invetorsSortedByYearsLived);

        // Sort the people by last name
        const sortedPeople = people.sort((a, b) => {
            let [last, first] = a.split(', ');
            let [bLast, bFirst] = b.split(', ');

            return bLast - last;
        });
        console.table(sortedPeople);

        // Sum up the instances of each of these
        const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

        const transportation = data.reduce((result, vehicle) => {
            if (result[vehicle] == undefined) {
                result[vehicle] = 0;
            }

            result[vehicle]++;

            return result
        }, {});
        console.log(transportation);
    }
}