
import React from 'react';
import wedding from '../assets/images/wedding.jpg';

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      {}
      <section className="bg-pink-500 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Your trusted partner in making your special day unforgettable.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src= {wedding}
              alt="Our Mission"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-semibold mb-4 text-pink-500">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At Wedding Services Bookings, our mission is to provide couples with a seamless and enjoyable experience in planning their dream weddings. We curate a network of top-notch service providers to ensure that every aspect of your special day is handled with care and professionalism.
            </p>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-pink-500">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "Wedding Services Bookings made planning our wedding so easy! From finding the perfect photographer to booking the best venue, everything was seamless."
              </p>
              <div className="flex items-center">
                <img
                  src="https://source.unsplash.com/50x50/?person"
                  alt="Client 1"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">Emily Clark</h4>
                  <p className="text-gray-600">Bride</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "The team at Wedding Services Bookings went above and beyond to ensure our special day was perfect. Highly recommend their services!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://source.unsplash.com/50x50/?person"
                  alt="Client 2"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">Daniel Martinez</h4>
                  <p className="text-gray-600">Groom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-pink-500 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold mb-4">Ready to Plan Your Dream Wedding?</h2>
          <p className="text-lg mb-6">
            Let us help you bring your vision to life with our comprehensive wedding services.
          </p>
          <a
            href="/Home"
            className="inline-block bg-white text-pink-500 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </a>
          
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
