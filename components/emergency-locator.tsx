'use client';

import { useState, useEffect, useMemo, MouseEvent } from 'react';
import MapView from './map-view';

interface Hospital {
  id: number;
  name: string;
  lat: number;
  lon: number;
  phone: string | null;
}

// Helper function to calculate distance
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function EmergencyLocator() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setError(null);
      },
      () => {
        setError('Unable to retrieve your location. Please enable location services in your browser settings.');
        setLoading(false);
      }
    );
  }, []);

  // Fetch hospitals near the user's location
  useEffect(() => {
    if (location) {
      const fetchHospitals = async () => {
        try {
          const response = await fetch(`/api/hospitals?lat=${location.lat}&lon=${location.lon}`);
          if (!response.ok) throw new Error('Failed to fetch hospital data');
          const data: Hospital[] = await response.json();
          setHospitals(data);
        } catch (err) {
          setError('Could not fetch nearby hospitals. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchHospitals();
    }
  }, [location]);

  // Sort hospitals by distance
  const sortedHospitals = useMemo(() => {
    if (!location || hospitals.length === 0) return [];
    return [...hospitals].sort((a, b) => {
      const distA = calculateDistance(location.lat, location.lon, a.lat, a.lon);
      const distB = calculateDistance(location.lat, location.lon, b.lat, b.lon);
      return distA - distB;
    });
  }, [hospitals, location]);

  // Confirm before emergency call
  const handleEmergencyCall = (e: MouseEvent<HTMLAnchorElement>) => {
    const confirmation = confirm(
      'You are about to call the National Emergency Number (112).\n\nOnly proceed in a genuine emergency.'
    );
    if (!confirmation) e.preventDefault();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg text-muted-foreground">
          Finding your location and nearby hospitals...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-center text-red-500 text-xl p-8">{error}</div>;
  }

  // Main UI
  return (
    location && (
      <div
        className="relative min-h-[calc(100vh-80px)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/360_F_1702835434_uaQxsJkrTtvunW5FkQUqP0wbckLZwP2l.jpg')",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-[calc(100vh-80px)]">
          {/* Hospital List */}
          <div className="overflow-y-auto pr-2">
            <h2 className="text-2xl font-bold mb-4">Nearest Hospitals</h2>
            {sortedHospitals.length > 0 ? (
              <ul className="space-y-3">
                {sortedHospitals.map((hospital) => {
                  const distance = calculateDistance(
                    location.lat,
                    location.lon,
                    hospital.lat,
                    hospital.lon
                  ).toFixed(1);

                  return (
                    <li
                      key={hospital.id}
                      className="p-4 border rounded-lg shadow-md bg-card/80 backdrop-blur-sm"
                    >
                      <h3 className="text-lg font-semibold">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground">{distance} km away</p>

                      <div className="mt-4 pt-3 border-t">
                        {hospital.phone ? (
                          <div>
                            <p className="text-sm font-medium mb-3">
                              📞 Contact: {hospital.phone}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">
                              No direct number available. For any emergency, please use the
                              national helpline.
                            </p>
                            <a
                              href="tel:112"
                              onClick={handleEmergencyCall}
                              className="inline-block w-full bg-red-600 text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-red-700 transition-colors shadow-lg animate-pulse"
                            >
                              DIAL 112 NOW
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No hospitals found within a 10km radius.</p>
            )}
          </div>

          {/* Map View */}
          <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
            <div
              id="map-placeholder"
              style={{
                height: '100%',
                width: '100%',
                background: '#e0e0e0',
              }}
            >
              <MapView location={location} hospitals={hospitals} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
