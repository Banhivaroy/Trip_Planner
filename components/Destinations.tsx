"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Search, MapPin, Star, Calendar } from 'lucide-react';

interface Destination {
  id: string;
  title: string;
  location: string;
  category?: string;
  rating: number;
  description: string;
}

const SAMPLE_DESTINATIONS: Destination[] = [
  {
    id: '1',
    title: 'Santorini Sunset Retreat',
    location: 'Santorini, Greece',
    category: 'Beach',
    rating: 4.9,
    description: 'Iconic white-washed buildings overlooking the Aegean Sea with world-famous sunset views.',
  },
  {
    id: '2',
    title: 'Kyoto Cultural Discovery',
    location: 'Kyoto, Japan',
    category: 'Cultural',
    rating: 4.8,
    description: 'Explore historic temples, serene bamboo groves, and traditional tea houses.',
  },
  {
    id: '3',
    title: 'Swiss Alps Hiking Expedition',
    location: 'Interlaken, Switzerland',
    category: 'Mountain',
    rating: 4.95,
    description: 'Dramatic alpine scenery, crisp mountain air, and year-round outdoor sports.',
  },
  {
    id: '4',
    title: 'Manhattan Skyline Escape',
    location: 'New York City, USA',
    category: 'City',
    rating: 4.7,
    description: 'Immerse yourself in vibrant arts, world-class dining, and non-stop energy.',
  },
  {
    id: '5',
    title: 'Patagonia Wilderness Trek',
    location: 'Torres del Paine, Chile',
    category: 'Adventure',
    rating: 4.9,
    description: 'Rugged granite peaks, pristine glaciers, and breathtaking trekking routes.',
  },
];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');

  // States for API search results & loading status
  const [apiResults, setApiResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced API fetch wrapped inside useEffect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setApiResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/Destinations?query=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setApiResults(data.destinations || []);
      } catch (err) {
        console.error('Failed to fetch locations', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter destinations based exclusively on the search query
  const filteredDestinations = useMemo(() => {
    const sourceData = apiResults.length > 0 ? apiResults : SAMPLE_DESTINATIONS;

    if (!searchQuery.trim()) return sourceData;

    return sourceData.filter((dest) => {
      const title = dest.title || dest.name || '';
      const location = dest.location || dest.city || '';
      const description = dest.description || '';

      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [apiResults, searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-notoSerifBalinese text-gray-900 sm:text-4xl">
          Explore Destinations
        </h1>
        <p className="mt-2 text-gray-600">
          Find top spots for your next trip.
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, country, or keyword..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-notoSerifBalinese"
          />
        </div>
      </div>

      {/* Grid Results */}
      {isLoading ? (
        <div className="text-center py-16 text-gray-500">Loading destinations...</div>
      ) : filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id || dest._id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                {dest.category && (
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gray-800 z-10">
                    {dest.category}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center text-xs text-gray-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" />
                      {dest.location}
                    </span>
                    <span className="flex items-center text-xs font-semibold text-gray-700">
                      <Star className="w-3.5 h-3.5 mr-1 fill-amber-400 text-amber-400" />
                      {dest.rating}
                    </span>
                  </div>

                  <h2 className="text-lg font-notoSerifBalinese text-gray-900 group-hover:text-blue-600 transition-colors">
                    {dest.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-end">
                  <button className="flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    <Calendar className="w-4 h-4" />
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
}