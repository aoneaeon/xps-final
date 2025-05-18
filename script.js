document.addEventListener('DOMContentLoaded', () => {

    // --- lot data ---
    const lotData = {
        "1, Block 1": { sqm: 1034, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "2, Block 1": { sqm: 1000, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "3, Block 1": { sqm: 1000, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "4, Block 1": { sqm: 1500, price: "₱1,800 per sqm", status: "Available", notes: "Premium lot." },
        "5, Block 1": { sqm: 1428, price: "₱1,800 per sqm", status: "Available", notes: "Premium lot." },
        "6, Block 1": { sqm: 1572, price: "₱1,800 per sqm", status: "Available", notes: "Premium lot." },
        "7, Block 1": { sqm: 1029, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "8, Block 1": { sqm: 1029, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "9, Block 1": { sqm: 1029, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "10, Block 1": { sqm: 1029, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "11, Block 1": { sqm: 1500, price: "₱1,800 per sqm", status: "Available", notes: "Premium lot." },
        "12, Block 1": { sqm: 1819, price: "₱-------", status: "Sold", notes: "" },
        "13, Block 1": { sqm: 1000, price: "₱-------", status: "Sold", notes: "" },
        "14, Block 1": { sqm: 908, price: "₱-------", status: "Sold", notes: "" },
        "1, Block 2": { sqm: 745, price: "₱-------", status: "Sold", notes: "" },
        "1, Block 3": { sqm: 1184, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "2, Block 3": { sqm: 1024, price: "₱1,800 per sqm", status: "Available", notes: "Premium lot." },
        "3, Block 3": { sqm: 1148, price: "₱1,800 per sqm", status: "Available", notes: "Premium lot." },
        "4, Block 3": { sqm: 500, price: "₱-------", status: "Sold", notes: "" },
        "5, Block 3": { sqm: 742, price: "₱-------", status: "Sold", notes: "" },
        "6, Block 3": { sqm: 1000, price: "₱-------", status: "Sold", notes: "" },
        "7, Block 3": { sqm: 500, price: "₱-------", status: "Sold", notes: "" },
        "8, Block 3": { sqm: 500, price: "₱-------", status: "Sold", notes: "" },
        "9, Block 3": { sqm: 1397, price: "₱-------", status: "Sold", notes: "" },
        "1, Block 4": { sqm: 1000, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "2, Block 4": { sqm: 1174, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "3, Block 4": { sqm: 1201, price: "₱1,500 per sqm", status: "Available", notes: "Largest lot in Block 4." },
        "4, Block 4": { sqm: 629, price: "₱-------", status: "Sold", notes: "" },
        "5, Block 4": { sqm: 753, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "6, Block 4": { sqm: 754, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "7, Block 4": { sqm: 969, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "1, Block 5": { sqm: 1205, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "2, Block 5": { sqm: 813, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "4, Block 5": { sqm: 1204, price: "₱1,500 per sqm", status: "Available", notes: "" },
        "3, Block 5": { sqm: 1033, price: "₱1,500 per sqm", status: "Available", notes: "" },
    };


    // --- DOM refs ---
    const svgMap = document.getElementById('subdivision-map');
    const lotPaths = svgMap.querySelectorAll('.lot');
    const placeholder = document.querySelector('#lot-details-content .placeholder');
    const detailsGroup = document.querySelector('#lot-details-content .details-group');
    const detailLotId = document.getElementById('detail-lot-id');
    const detailSqm = document.getElementById('detail-sqm');
    const detailPrice = document.getElementById('detail-price');
    const detailStatus = document.getElementById('detail-status');
    const detailNotes = document.getElementById('detail-notes');

    let activeLotElement = null; // keep track of currently hovered lot

    // --- functions ---

    // updates sidebar
    function updateSidebar(lotId) {
        const data = lotData[lotId];

        if (data) {
            placeholder.style.display = 'none';
            detailsGroup.style.display = 'block';

            detailLotId.textContent = `Lot ${lotId}`;
            detailSqm.textContent = data.sqm.toLocaleString(); // format num
            detailPrice.textContent = data.price;
            detailStatus.textContent = data.status;
            detailNotes.textContent = data.notes || '---'; // 

            // status class based on data
            detailStatus.className = `status ${data.status}`; // class

            // show/hide notes based on data
             detailNotes.style.display = data.notes ? 'block' : 'none';


        } else {
            // if no data found for lotId, reset sidebar
            resetSidebar();
        }
    }

    // function to reset sidebar to placeholder
    function resetSidebar() {
        placeholder.style.display = 'block';
        detailsGroup.style.display = 'none';

        // reset to default values
        detailLotId.textContent = 'Lot --';
        detailSqm.textContent = '---';
        detailPrice.textContent = '$---,---';
        detailStatus.textContent = '---';
        detailStatus.className = 'status'; // 
        detailNotes.textContent = '---';
        detailNotes.style.display = 'none'; // hide notes by default

    }

    // function to apply initial styles based on status
    function applyInitialLotStyles() {
        lotPaths.forEach(path => {
            const lotId = path.dataset.lotId;
            const data = lotData[lotId];
            if (data) {
                path.classList.add(data.status.toLowerCase()); // add class
            } else {
                 path.classList.add('unavailable'); // or some default/error class
                 path.style.fill = '#cccccc'; // default grey if no data
            }
        });
    }

    // --- event listeners ---
    lotPaths.forEach(path => {
        // mouse enters lot area
        path.addEventListener('mouseenter', (event) => {
            const lotId = event.target.dataset.lotId;

            // remove active state from previously hovered lot
            if (activeLotElement && activeLotElement !== event.target) {
                activeLotElement.classList.remove('active-hover');
            }

            // add active state to current lot and update global tracker
            event.target.classList.add('active-hover');
            activeLotElement = event.target;

            updateSidebar(lotId);
        });

    });

    // mouse leaves lot area
     svgMap.addEventListener('mouseleave', () => {
         if (activeLotElement) {
             activeLotElement.classList.remove('active-hover');
             activeLotElement = null;
             resetSidebar(); // 
         }
     });


    // --- initialization ---
    applyInitialLotStyles(); //
    resetSidebar(); // 

});

