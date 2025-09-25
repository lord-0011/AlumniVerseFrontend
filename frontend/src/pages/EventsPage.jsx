import React from 'react';
import { mockEvents } from '../mockEvents';

// 1. Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EventsPage = () => {
  // Let's assume the first two events are "featured"
  const featuredEvents = mockEvents.slice(0, 2);
  const otherEvents = mockEvents.slice(2);

  return (
    <div className="space-y-10">
      {/* ## NEW: Featured Events Slider ## */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Featured Events</h1>
        <Swiper
          // 2. Configure Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="rounded-lg shadow-lg"
        >
          {featuredEvents.map(event => (
            <SwiperSlide key={event.id}>
              <div className="relative bg-white rounded-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={`${event.name} banner`} 
                  className="w-full h-64 object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h2 className="text-3xl font-bold">{event.name}</h2>
                  <p className="mt-2 text-lg">{event.date}</p>
                  <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition mt-4 self-start">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ## All Events Section ## */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">All Upcoming Events</h2>
        <div className="space-y-8">
          {mockEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
              <img 
                src={event.image} 
                alt={`${event.name} banner`} 
                className="w-full md:w-1/3 h-48 md:h-auto object-cover" 
              />
              <div className="p-6 flex flex-col flex-grow">
                <div>
                  <p className="text-sm font-semibold text-blue-600">{event.type}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{event.name}</h3>
                  <div className="mt-2 text-gray-600">
                    <p><strong>Date:</strong> {event.date} ({event.time})</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                  <p className="text-gray-700 mt-3">
                    {event.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 text-right">
                    <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition whitespace-nowrap">
                        RSVP Now
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;