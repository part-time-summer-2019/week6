const checkboxes = document.querySelectorAll('.inbox input[type=checkbox]');
let lastChecked;

// Event listeners
function handleCheckboxClick(e) {
    if (e.shiftKey) {
        let inBetween = false;

        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }


    lastChecked = this;
}


// Register Event listeners
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheckboxClick));
