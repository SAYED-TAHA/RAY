'use client';

import React, { useState, useRef } from 'react';
import GoogleMap from './GoogleMap';
import { Search, MapPin, Navigation } from 'lucide-react';

interface MapWithSearchProps {
  onLocationSelect?: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  height?: string;
}

const MapWithSearch: React.FC<MapWithSearchProps> = ({
  onLocationSelect,
  initialLocation,
  height = '500px'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{
    place_id: string;
    description: string;
  }>>([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const searchPlaces = async (query: string) => {
    if (!query || !window.google) return;

    setIsSearching(true);
    try {
      const service = new window.google.maps.places.AutocompleteService();
      const results = await new Promise((resolve, reject) => {
        service.getPlacePredictions(
          { input: query, componentRestrictions: { country: 'eg' } },
          (predictions: any, status: string) => {
            if (status === 'OK') {
              resolve(predictions);
            } else {
              reject(new Error('فشل في البحث'));
            }
          }
        );
      });

      setSearchResults(results as any[]);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.length > 2) {
      searchTimeoutRef.current = setTimeout(() => {
        searchPlaces(value);
      }, 500);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const selectPlace = async (place: any) => {
    if (!window.google) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      const result = await new Promise((resolve, reject) => {
        geocoder.geocode({ placeId: place.place_id }, (results: any, status: string) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error('فشل في العثور على الموقع'));
          }
        });
      });

      const location = (result as any).geometry.location;
      const newLocation = {
        lat: location.lat(),
        lng: location.lng(),
        address: place.description
      };

      setSelectedLocation(newLocation);
      setShowResults(false);
      setSearchQuery(place.description);

      if (onLocationSelect) {
        onLocationSelect(newLocation);
      }
    } catch (error) {
      console.error('Place selection error:', error);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('المتصفح لا يدعم تحديد الموقع');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        if (!window.google) return;

        try {
          const geocoder = new window.google.maps.Geocoder();
          const result = await new Promise((resolve, reject) => {
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results: any, status: string) => {
                if (status === 'OK' && results[0]) {
                  resolve(results[0]);
                } else {
                  reject(new Error('فشل في العثور على العنوان'));
                }
              }
            );
          });

          const newLocation = {
            lat: latitude,
            lng: longitude,
            address: (result as any).formatted_address
          };

          setSelectedLocation(newLocation);
          setSearchQuery(newLocation.address);

          if (onLocationSelect) {
            onLocationSelect(newLocation);
          }
        } catch (error) {
          console.error('Geocoding error:', error);
        }
      },
      (error) => {
        console.error('Location error:', error);
        alert('فشل في تحديد الموقع الحالي');
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="ابحث عن عنوان أو موقع..."
            className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          />
          <button
            onClick={getCurrentLocation}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition"
            title="استخدم موقعي الحالي"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {searchResults.map((place, index) => (
              <button
                key={place.place_id}
                onClick={() => selectPlace(place)}
                className="w-full text-right px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{place.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Loading Indicator */}
        {isSearching && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">جاري البحث...</span>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <GoogleMap
        latitude={selectedLocation?.lat}
        longitude={selectedLocation?.lng}
        address={selectedLocation?.address}
        height={height}
        markers={selectedLocation ? [{
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          title: 'الموقع المحدد',
          description: selectedLocation.address
        }] : []}
      />

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">الموقع المحدد</h4>
              <p className="text-blue-700 text-sm mt-1">{selectedLocation.address}</p>
              <p className="text-blue-600 text-xs mt-1">
                الإحداثيات: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithSearch;
