# UI/UX

- **Alignment**: responsive grids and flexboxes were used to make elements (such as Cards, and their child) aligned and easier to read.
- **Fonts**: fonts were consistent throughout the website.
- **Colors**: complementary and simple colors were used.
- **Visual hierarchy**: important actions and information were made to stand out to the user in order to be perceived first. For example, the user is likely going to be interested in the price of a listing so that element was given additional styling. Also, the order of elements was chosen so that important information is presented first. For example, the City/State/Country was presented before the exact street address because a user is more likely concerned with the general location of a listing. This also promotes a good UX.
- **Affordances:** Many pattern affordances can be seen throughout the app. For example, in the listing cards the rating is underlined and followed by a dropdown icon to indicate to the user that it can be hovered on. Also, cards were made to change color on hover/focus to indicate that they can be clicked on. Image carousels were given icons to indicate their controls, and more. Buttons were decorated with recognisable icons as well.
- **User agenda:** More common user actions were made easily accessible by users in the fewest clicks possible. For example, hosts will likely be frequently wanting to view their hosted listings and so the button to do so was added directly onto the Navbar rather than placing it a Navbar dropdown (requiring 1 click instead of 2).

* When the user is in the middle of a process, titles are always shown to indicate the step of the process.
* **Action acknowledgement:** When an action is completed such as publishing a listing, creating a listing, a toast is shown to give the user feedback and confirmation.
* **Loading placeholders:** When HTTP requests are sent to the backend, placeholders with active animations are shown on the screen to indicate that something is happening in the background instead of having a blank page that may appear confusing.
  - When listings are loaded they are shown on screen immediately and placeholders are removed accordingly until all listings are loaded. This feels intuitive for a user.
* **Form validation:** Erroneous input is recognied and the user is given toasts or invalid form feedback.
* Navigation controls are visible on all pages
* For amenities, we have a Show more/less button to limit the amount of clutter on the page.
* In cases where there is nothing to be shown (no amenities, no listings, etc) we render an appropriate message on the page rather than leaving it blank which may confuse the user.
* **Microinteractions:** For example, when leaving a review, hovering over the stars animates their changes in size.

# Accessibility

- Legible text with high contrast
- `tabIndex` attributes were added to various interactive elements so that they are accessible to non-keyboard users. Enter and Space keys were made to select these interactive elements once focused.
  - For example, listing cards can be tabbed through and Enter/Space can be used to naviate to that listing's page.
- Form submit events were used instead of button onClick events so that if a user hits Enter while focused on an input, then the form is submitted, making it more accessible for keyboard users.
- Inputs are labelled appropriately. ie. clicking the label focuses/selects/etc the field
- Input min/max/pattern attributes were enforced where necessary (eg. min price of 0)
  - When entering date ranges for bookings/availabilities, various validation was added in markup (eg start < end)
- Useful error messages and success messages were added to enforce **understandability**.

## ARIA

Many global ARIA attributes were added to various elements to improve accessibility and work with assistive technologies.

Some of these included:

- `aria-pressed`: added to toggle-buttons to indicate the "pressed" state. Can be seen in the `SearchForm` toggle button, the Create/Edit Listing Property Type field, and more.
- `aria-controls`: added to elements that control the presence of other elements.
- `aria-label`: added to buttons with only an icon and no text. Can be seen in `SearchForm` toggle button, listing cards and close buttons.
- `aria-hidden`: added to icons (decorative) within buttons that contain text that already sufficiently describe the button to remove redudancy.
- `aria-haspopup`: added to elements that trigger a popup such as a dialog.
- `aria-disabled`: added to disabled interactive elements.
- `aria-modal`: added by Bootstrap's `Modal` components, etc.
- `aria-expanded` added by Bootstrap's dropdown components, etc.
- and more, ...
