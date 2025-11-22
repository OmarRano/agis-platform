import React from 'react';

// Responsive property card for real estate listings
const PropertyCard = ({
  image,
  title,
  price,
  location,
  size,
  status,
  dealInitiator,
  onContact,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row max-w-full md:max-w-2xl mx-auto mb-4">
    <img
      src={image || '/default-property.jpg'}
      alt={title}
      className="w-full md:w-1/3 h-48 object-cover md:h-auto"
    />
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{location} • {size}</p>
        <p className="text-xl font-semibold text-green-700 mb-2">₦{price}</p>
        <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${status === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{status}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-2">
        <div className="text-xs text-gray-600">Deal Initiator: <span className="font-bold">{dealInitiator}</span></div>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 text-xs"
          onClick={onContact}
        >
          Contact Deal Initiator
        </button>
      </div>
    </div>
  </div>
);

export default PropertyCard;
