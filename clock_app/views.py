#views.py
import json
from django.shortcuts import render
from django.http import JsonResponse
from timezonefinder import TimezoneFinder
from datetime import datetime
from pytz import timezone


def world_map(request):
    return render(request, 'worldmap.html')

def get_local_time(request):
    if request.method == 'POST':
        # Parse JSON data from the request
        data = json.loads(request.body.decode('utf-8'))
        lat = data.get('lat', None)
        lng = data.get('lng', None)

        # Check if lat and lng are valid numbers
        if lat is not None and lng is not None:
            try:
                lat = float(lat)
                lng = float(lng)
            except ValueError:
                return JsonResponse({'local_time': 'Invalid coordinates'})

            # Initialize the TimezoneFinder
            tz_finder = TimezoneFinder()

            # Try to determine the time zone based on coordinates
            time_zone_str = tz_finder.timezone_at(lat=lat, lng=lng)

            if time_zone_str:
                # Get the local time in the determined time zone
                local_time = datetime.now(timezone(time_zone_str))
                local_time_str = local_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
                return JsonResponse({'local_time': local_time_str})
            else:
                return JsonResponse({'local_time': 'Unknown Time Zone'})

    return JsonResponse({'local_time': 'Invalid Request'})
