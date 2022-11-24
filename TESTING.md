# Testing Rationale

## Component Testing

## UI Testing

### Happy Path

1. Registers successfully
   - this is to test that client can successsfully register as a new user
   - so that new users can start to create listings/make bookings
2. Creates a new listing successfully
   - this is to test that user can successfully create a new listing
   - so that user can create listing for others to book
3. Updates the thumbnail and title of the listing successfully
   - this is to test that user can successfully update the listing create in step 2
   - so that user can update their listing in case it's outdated
4. Publish a listing successfully
   - this is to test that user can publish the listing
   - so that user can publish the listing to officially let other users see
5. Unpublish a listing successfully
   - this is to test that user can unpublish the listing that was published in step 4
   - so that user can take down a listing to prevent other users from booking it
6. Make a booking successfully
   - this is to test that user can book another user's listing
7. Logs out of the application successfully
   - this is to test that user can log out successfully
   - so that users can end the session
8. Logs back into the application successfully
   - this is to test that user can log back in with their credentials from step 1
   - so that returning users can access their listings and booking
