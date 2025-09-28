import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../api';
import { PlusCircle } from 'lucide-react';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getEvents(token);
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const latestEvents = events.slice(0, 3);

  return (
    <div className="space-y-12">
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Events & Reunions</h1>
          <p className="text-gray-600 mt-2">Connect with the community at our upcoming events.</p>
        </div>
        {userRole === 'alumni' && (
          <Link to="/events/add" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            <PlusCircle size={20} className="mr-2" />
            Add Event
          </Link>
        )}
      </div>

      {loading ? <p>Loading events...</p> : (
        <>
          {latestEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Events</h2>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="rounded-lg shadow-lg"
              >
                {latestEvents.map(event => (
                  <SwiperSlide key={event._id}>
                    <div className="relative bg-white rounded-lg overflow-hidden">
                      <img src={event.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865'} alt={event.name} className="w-full h-64 object-cover" />
                      <div className="absolute bottom-0 w-full p-8 text-white bg-gradient-to-t from-black via-black/70 to-transparent">
                        <h2 className="text-3xl font-bold">{event.name}</h2>
                        <p className="mt-2 text-lg">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">All Upcoming Events</h2>
            {events.length > 0 ? (
              <div className="space-y-8">
                {events.map(event => (
                  <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={event.image || 'https://images.unsplash.com/photo-1556761175-b413da4baf72'} alt={event.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <p className="text-sm font-semibold text-blue-600">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <h2 className="text-2xl font-bold text-gray-800 mt-1">{event.name}</h2>
                      <p className="text-gray-600 font-semibold">{event.location}</p>
                      <p className="text-gray-700 mt-4">{event.description}</p>
                      <div className="mt-4 text-right">
                        <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg">RSVP Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white text-center p-8 rounded-lg shadow-md">
                <p className="text-gray-600">There are no upcoming events at this time.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EventsPage;