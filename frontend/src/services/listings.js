import api from './api';

export const getListings = () => {
  return api.get('listings');
};

export const createListing = (title, address, price, thumbnail, metadata) => {
  return api.post('listings/new', {
    title,
    address,
    price,
    thumbnail,
    metadata,
  });
};

export const getListing = (listingId) => {
  return api.get('listings/' + listingId);
};

// TODO: optional parameters
export const updateListing = (
  listingId,
  title,
  address,
  price,
  thumbnail,
  metadata
) => {
  return api.put('listings/' + listingId, {
    title,
    address,
    price,
    thumbnail,
    metadata,
  });
};

export const deleteListing = (listingId) => {
  return api.delete('listings/' + listingId);
};

export const publishListing = (listingId, availability) => {
  return api.put('listings/publish/' + listingId, {
    availability,
  });
};

export const unpublishListing = (listingId) => {
  return api.put('listings/unpublish/' + listingId);
};

export const reviewListing = (listingId, bookingId, review) => {
  return api.put('listings/' + listingId + '/review/' + bookingId, {
    review,
  });
};
