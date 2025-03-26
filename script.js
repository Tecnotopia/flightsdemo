document.addEventListener('DOMContentLoaded', () => {
    const departuresTab = document.getElementById('departures-tab');
    const arrivalsTab = document.getElementById('arrivals-tab');
    const filterAllButton = document.getElementById('filter-all');
    const filterDomesticButton = document.getElementById('filter-domestic');
    const filterInternationalButton = document.getElementById('filter-international');
    const filterOnTimeButton = document.getElementById('filter-on-time');
    const filterDelayedButton = document.getElementById('filter-delayed');
    const flightListDiv = document.getElementById('flight-list');

    const detailFlightNumber = document.getElementById('detail-flight-number'); // Ya no son necesarios estos elementos individuales
    const detailOrigin = document.getElementById('detail-origin');
    const detailDestination = document.getElementById('detail-destination');
    const detailDepartureTime = document.getElementById('detail-departure-time');
    const detailArrivalTime = document.getElementById('detail-arrival-time');
    const detailStatus = document.getElementById('detail-status');

    let currentTab = 'departure';
    let currentFilter = 'all';
    let selectedFlight = null;
    let currentlyOpenDetails = null; // Variable para rastrear los detalles abiertos

    const flightsData = [
        {
            id: 1,
            type: 'departure',
            airline: 'Viva Aerobus',
            flightNumber: 'VB1001',
            origin: 'Ciudad de México (MEX)',
            destination: 'Guadalajara (GDL)',
            departureTime: '07:00',
            arrivalTime: '08:15',
            status: 'A tiempo',
            isDomestic: true,
            extraInfo: 'Puerta 12, a las 06:30'
        },
        {
            id: 2,
            type: 'arrival',
            airline: 'Viva Aerobus',
            flightNumber: 'VB2002',
            origin: 'Monterrey (MTY)',
            destination: 'Ciudad de México (MEX)',
            departureTime: '09:00',
            arrivalTime: '10:10',
            status: 'A tiempo',
            isDomestic: true,
            extraInfo: 'Equipaje en la banda 3'
        },
        {
            id: 3,
            type: 'departure',
            airline: 'Viva Aerobus',
            flightNumber: 'VB3003',
            origin: 'Cancún (CUN)',
            destination: 'Montreal (YUL)',
            departureTime: '11:00',
            arrivalTime: '16:00',
            status: 'Retrasado',
            isDomestic: false,
            extraInfo: 'Condiciones climáticas'
        },
        {
            id: 4,
            type: 'arrival',
            airline: 'Viva Aerobus',
            flightNumber: 'VB4004',
            origin: 'Los Ángeles (LAX)',
            destination: 'Tijuana (TIJ)',
            departureTime: '13:00',
            arrivalTime: '15:00',
            status: 'A tiempo',
            isDomestic: false,
            extraInfo: 'Pasajeros deben pasar por aduana'
        },
        {
            id: 5,
            type: 'departure',
            airline: 'Viva Aerobus',
            flightNumber: 'VB5005',
            origin: 'Guadalajara (GDL)',
            destination: 'Chicago (ORD)',
            departureTime: '15:00',
            arrivalTime: '20:00',
            status: 'A tiempo',
            isDomestic: false,
            extraInfo: 'Puerta 5, Embarque comienza a las 14:30'
        },
        {
            id: 6,
            type: 'arrival',
            airline: 'Viva Aerobus',
            flightNumber: 'VB6006',
            origin: 'Dallas (DFW)',
            destination: 'Monterrey (MTY)',
            departureTime: '17:00',
            arrivalTime: '18:30',
            status: 'A tiempo',
            isDomestic: false,
            extraInfo: 'Llegada a la terminal B'
        },
        {
            id: 7,
            type: 'departure',
            airline: 'Viva Aerobus',
            flightNumber: 'VB7007',
            origin: 'Ciudad de México (MEX)',
            destination: 'Miami (MIA)',
            departureTime: '19:00',
            arrivalTime: '23:00',
            status: 'A tiempo',
            isDomestic: false,
            extraInfo: 'Vuelo nocturno, mantas disponibles'
        },
        {
            id: 8,
            type: 'arrival',
            airline: 'Viva Aerobus',
            flightNumber: 'VB8008',
            origin: 'Medellín (MDE)',
            destination: 'Ciudad de México (MEX)',
            departureTime: '21:00',
            arrivalTime: '02:00',
            status: 'A tiempo',
            isDomestic: false,
            extraInfo: 'Bienvenidos a la Ciudad de México'
        },
        {
            id: 9,
            type: 'departure',
            airline: 'Viva Aerobus',
            flightNumber: 'VB9009',
            origin: 'Tijuana (TIJ)',
            destination: 'Ciudad de México (MEX)',
            departureTime: '23:00',
            arrivalTime: '01:00',
            status: 'A tiempo',
            isDomestic: true,
            extraInfo: 'Último vuelo del día'
        },
        {
            id: 10,
            type: 'arrival',
            airline: 'Viva Aerobus',
            flightNumber: 'VB0010',
            origin: 'Ciudad de México (MEX)',
            destination: 'Mérida (MID)',
            departureTime: '05:00',
            arrivalTime: '06:30',
            status: 'A tiempo',
            isDomestic: true,
            extraInfo: 'Primer vuelo de la mañana'
        },
        {
            id: 11,
            type: 'departure',
            airline: 'Viva Aerobus',
            flightNumber: 'VB1011',
            origin: 'Monterrey (MTY)',
            destination: 'Guadalajara (GDL)',
            departureTime: '10:00',
            arrivalTime: '11:00',
            status: 'A tiempo',
            isDomestic: true,
            extraInfo: 'Vuelo directo'
        },
        {
            id: 12,
            type: 'arrival',
            airline: 'Viva Aerobus',
            flightNumber: 'VB2012',
            origin: 'Villahermosa (VSA)',
            destination: 'Ciudad de México (MEX)',
            departureTime: '12:00',
            arrivalTime: '13:30',
            status: 'Retrasado',
            isDomestic: true,
            extraInfo: 'Retraso de 30 minutos'
        }
    ];

    function filterFlights(tab, filter) {
        const filtered = flightsData.filter(flight => flight.type === tab && (filter === 'all' || (filter === 'domestic' && flight.isDomestic) || (filter === 'international' && !flight.isDomestic) || (filter === 'on-time' && flight.status.toLowerCase() === 'a tiempo') || (filter === 'delayed' && flight.status.toLowerCase() === 'retrasado')));
        return filtered;
    }

    function renderFlights(flights) {
        flightListDiv.innerHTML = '';
        if (flights.length === 0) {
            flightListDiv.innerHTML = '<p>No hay vuelos disponibles con los filtros seleccionados.</p>';
            return;
        }
        flights.forEach(flight => {
            const flightItem = document.createElement('div');
            flightItem.classList.add('flight-item');
            flightItem.innerHTML = `
                <h3>${flight.airline} - ${flight.flightNumber}</h3>
                <p>Origen: ${flight.origin}</p>
                <p>Destino: ${flight.destination}</p>
                <p>Hora: ${currentTab === 'departure' ? flight.departureTime : flight.arrivalTime}</p>
                <p>Estado: <span class="${flight.status.toLowerCase().replace(' ', '-')}">${flight.status}</span></p>
            `;

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('flight-details-container', 'hidden');
            detailsContainer.innerHTML = `
                <p><strong>Información Adicional:</strong> ${flight.extraInfo}</p>
                <p><strong>Hora de Salida:</strong> ${flight.departureTime}</p>
                <p><strong>Hora de Llegada:</strong> ${flight.arrivalTime}</p>
                <p><strong>Estado:</strong> ${flight.status}</p>
            `;

            flightItem.appendChild(detailsContainer);
            flightItem.addEventListener('click', () => showFlightDetails(flight, detailsContainer));
            flightListDiv.appendChild(flightItem);
        });
    }

    function showFlightDetails(flight, detailsElement) {
        if (currentlyOpenDetails && currentlyOpenDetails !== detailsElement) {
            currentlyOpenDetails.classList.add('hidden');
        }

        detailsElement.classList.toggle('hidden');
        currentlyOpenDetails = detailsElement.classList.contains('hidden') ? null : detailsElement;
    }

    function updateActiveTab(tabId) {
        document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    function updateActiveFilter(filterId) {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(filterId).classList.add('active');
    }

    departuresTab.addEventListener('click', () => {
        currentTab = 'departure';
        updateActiveTab('departures-tab');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    arrivalsTab.addEventListener('click', () => {
        currentTab = 'arrival';
        updateActiveTab('arrivals-tab');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    filterAllButton.addEventListener('click', () => {
        currentFilter = 'all';
        updateActiveFilter('filter-all');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    filterDomesticButton.addEventListener('click', () => {
        currentFilter = 'domestic';
        updateActiveFilter('filter-domestic');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    filterInternationalButton.addEventListener('click', () => {
        currentFilter = 'international';
        updateActiveFilter('filter-international');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    filterOnTimeButton.addEventListener('click', () => {
        currentFilter = 'on-time';
        updateActiveFilter('filter-on-time');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    filterDelayedButton.addEventListener('click', () => {
        currentFilter = 'delayed';
        updateActiveFilter('filter-delayed');
        renderFlights(filterFlights(currentTab, currentFilter));
    });

    // Inicializar la lista de vuelos para la pestaña de salidas y todos los vuelos
    renderFlights(filterFlights(currentTab, currentFilter));
});
