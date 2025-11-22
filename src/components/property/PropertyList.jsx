import React from 'react';
import PropertyCard from './PropertyCard';

// Responsive property list for displaying multiple listings
const PropertyList = ({ properties = [], onContact }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {properties.length === 0 ? (
      <div className="text-center text-gray-500 py-8">No properties found.</div>
    ) : (
      properties.map(property => (
        <PropertyCard key={property.id} {...property} onContact={() => onContact(property)} />
      ))
    )}
  </div>
);

export default PropertyList;
