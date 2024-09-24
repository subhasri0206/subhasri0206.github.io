    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function () {
            const accordionItem = this.parentElement;

            // Toggle active class on click
            if (accordionItem.classList.contains('active')) {
                accordionItem.classList.remove('active');
            } else {
                // Close all other items before opening the clicked one
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                });
                accordionItem.classList.add('active');
            }
        });
    });
// Function to activate clicked control and deactivate others
function activateControl(control) {
    const controls = document.querySelectorAll('.control');
    
    // Remove 'active' class from all controls
    controls.forEach((ctrl) => {
        ctrl.classList.remove('active');
        ctrl.style.opacity = '0.3'; // Reset opacity
    });
    
    // Add 'active' class to the clicked control
    control.classList.add('active');
    control.style.opacity = '1'; // Fully visible for active control
}
