# Bonus

- In the My listings screen, two additional graphs were added:
    * The first graph shows the amount of bookings the listing received each month of the current year
    * The second graph shows how much profit the specific listing made during each month of the current year
- When listing cards are being loaded, placeholders with glowing animations are shown to indicate the loading status. Each loading placeholder is replaced by a loaded card as listings get progressively loaded.
- Extensive JSON schema validation is performed when attempting to upload a JSON file as a listing. The `ajv` library was used and a JSON schema was designed to validate all keys and values at all levels of listings to a high degree. For example, when specifying amenities the JSON file can only include amenities that exists as variants in the enum schema, otherwise it will not be valid.
- Extensive date validation was done client-side when entering date ranges for bookings/availabilities. For example, start dates cannot be after end dates, start dates cannot be in the past, etc.
- Login and register were made modals instead of pages. This means that the user can log in from any page. For example, they can visit http://localhost:3000/listing/235477925/login while viewing listing 235477925, then on successful login will be returned to the listing page and immediately see their booking requests/etc
- Booking requests are sorted by date so that the owner of a listing is less prone to human error (double bookings, etc) when accepting/denying requests.
- Although not a spec requirement, the user can search by as many search fields/filters as they like.
- Although not a spec requirement, the user can upload property images at the create stage (rather than only the edit stage as specified in the spec)
- If a user has X accepted booking requests, Y accepted requests and Z declined requests, then X, Y, and Z are all shown on the landing page.
- Users are made aware if a listing on the landing page is theirs.
- 2.6.1 advanced review tooltip is viewable from the landing page cards, my listing cards, or the individual listing pages

