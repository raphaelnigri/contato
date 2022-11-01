function autoExpand (textarea) {
	textarea.style.height = 'inherit'; // Reset input height
	var css = window.getComputedStyle(textarea); // Valores do elemento

    var height = parseInt(css.getPropertyValue('border-top-width'), 10)
        + parseInt(css.getPropertyValue('padding-top'), 10)
        + textarea.scrollHeight
        + parseInt(css.getPropertyValue('padding-bottom'), 10)
        + parseInt(css.getPropertyValue('border-bottom-width'), 10);

    textarea.style.height = height + 'px';
};

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() == 'textarea'){
        autoExpand(event.target);
    }
});
