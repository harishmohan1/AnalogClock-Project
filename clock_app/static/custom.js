document.addEventListener('DOMContentLoaded', function () {
    var data = null;
    var map = L.map('world-map', {
        center: [0, 0],
        zoom: 3,
        maxZoom: 10,
        minZoom: 3,
        zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 25,
    }).addTo(map);

    // Define a variable to hold the analog clock element
    //var analogClock = document.getElementById('analog-clock');

    map.on('click', function (e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;

        

        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('X-CSRFToken', csrf_token);

        // Use AJAX to fetch the local time from the server and update the canvas clock
        fetch('/get_local_time/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ lat: lat, lng: lng }),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error:', response);
                throw new Error('Failed to fetch local time');
            }
        })
        .then(function (fetchedData) {
            // Assign the fetched data to the outer variable
            data = fetchedData;
        
            // Call the updateClock function with the fetched data
            updateClock();
        
            // Split the date string into parts (assuming the format is "YYYY-MM-DD HH:MM:SS TIMEZONEOFFSET")
            const dateParts = data.local_time.split(' ');
        
            // Ensure we have at least two parts: date and time
            if (dateParts.length < 2) {
                console.error('Invalid Date Format:', data.local_time);
                alert('Invalid Date Format');
                return;
            }
        
            // Combine the date and time parts into a format recognized by Date
            const combinedDate = dateParts[0] + 'T' + dateParts[1];
        
            // Attempt to create a Date object
            const localTime = new Date(combinedDate);
        
            // Check if the Date object is valid
            if (!isNaN(localTime.getTime())) {
                const formattedDate = localTime.toLocaleDateString();
                const formattedTime = localTime.toLocaleTimeString();
        
                // Display an alert with the formatted date and time
                //alert('Date: ' + formattedDate + '\nTime: ' + formattedTime);
        
                // Show the analog clock
                var analogClock = document.getElementById('analog-clock');
        
                analogClock.style.display = 'block';
                analogClock.style.top = e.containerPoint.y + 'px';
                analogClock.style.left = e.containerPoint.x + 'px';
            } else {
                console.error('Invalid Date:', data.local_time);
                alert('Invalid Date Format');
            }
        })
        .catch(function (error) {
            console.error('Fetch error:', error);
            // Handle the fetch error here, for example, displaying an error message to the user
        });
         
    });
    
    
    function updateClock() {
        // Ensure data and data.local_time are defined before accessing their properties
        if (data && data.local_time) {
            // Split the date string into parts (assuming the format is "YYYY-MM-DDTHH:MM:SS")
            const dateParts = data.local_time.split(' ');
            const timeParts = dateParts[1].split(':');
    
            // Extract hours, minutes, and seconds from the split parts
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            const seconds = parseInt(timeParts[2], 10);
    
            // Calculate the rotation angles for the second, minute, and hour hands
            const secondHandAngle = (seconds / 60) * 360;
            const minuteHandAngle = ((minutes + seconds / 60) / 60) * 360;
            const hourHandAngle = ((hours % 12 + minutes / 60) / 12) * 360;
    
            // Set the rotation angles for the second, minute, and hour hands
            const secondHand = document.querySelector('.second-hand');
            const minuteHand = document.querySelector('.minute-hand');
            const hourHand = document.querySelector('.hour-hand');
    
           
            secondHand.style.transform = `rotate(${secondHandAngle}deg)`;
            minuteHand.style.transform = `rotate(${minuteHandAngle}deg)`;
            hourHand.style.transform = `rotate(${hourHandAngle}deg)`;
        } else {
            console.error('Invalid or undefined data:', data);
        }
    }
    setInterval(updateClock, 1000);
    
});


