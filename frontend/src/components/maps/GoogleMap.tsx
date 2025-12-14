'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

interface GoogleMapProps {
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    description?: string;
  }>;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  address,
  latitude,
  longitude,
  zoom = 15,
  height = '400px',
  markers = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        setError('فشل في تحميل خرائط جوجل');
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const initializeMap = async () => {
      try {
        let centerLat = latitude || 30.0444; // Default: Cairo
        let centerLng = longitude || 31.2357;

        // If address is provided, geocode it
        if (address && !latitude && !longitude) {
          const geocoder = new window.google.maps.Geocoder();
          const result = await new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results: any, status: string) => {
              if (status === 'OK' && results[0]) {
                resolve(results[0]);
              } else {
                reject(new Error('العنوان غير موجود'));
              }
            });
          });

          const location = (result as any).geometry.location;
          centerLat = location.lat();
          centerLng = location.lng();
        }

        // Create map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Add markers
        markers.forEach(marker => {
          new window.google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map,
            title: marker.title,
            animation: window.google.maps.Animation.DROP
          });

          // Add info window if description exists
          if (marker.description) {
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="direction: rtl; text-align: right; padding: 10px;">
                  <h3 style="margin: 0 0 5px 0; color: #333;">${marker.title}</h3>
                  <p style="margin: 0; color: #666;">${marker.description}</p>
                </div>
              `
            });

            const markerObj = new window.google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map,
              title: marker.title,
              animation: window.google.maps.Animation.DROP
            });

            markerObj.addListener('click', () => {
              infoWindow.open(map, markerObj);
            });
          }
        });

        // Add single marker if lat/lng provided
        if (latitude && longitude && markers.length === 0) {
          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title: address || 'الموقع',
            animation: window.google.maps.Animation.DROP
          });
        }

      } catch (err) {
        setError('خطأ في تحميل الخريطة');
        console.error('Map error:', err);
      }
    };

    initializeMap();
  }, [isLoaded, address, latitude, longitude, zoom, markers]);

  if (error) {
    return (
      <div 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-gray-600 text-sm">يرجى التحقق من اتصال الإنترنت</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="flex items-center gap-2">
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">جاري تحميل الخريطة...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        className="w-full rounded-lg overflow-hidden"
        style={{ height }}
      />
      {address && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <p className="text-sm font-medium text-gray-900">{address}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
