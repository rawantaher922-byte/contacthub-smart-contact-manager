# contacthub-smart-contact-manager
ContactHub is a front-end contact management CRUD application built with HTML, CSS, and vanilla JavaScript. It allows users to manage personal contacts, search records, organize favorites and emergency contacts, and save contact data using Local Storage.
## Features
Contact Management (CRUD)
- Create: Add new contacts with name, phone number, email, address, group, and notes.
- Read: Display contacts and view their details.
- Update: Edit existing contact information.
- Delete: Remove contacts with a confirmation dialog.
Search & Organization
- Search contacts by name, phone number, or email.
- Mark and unmark contacts as favorites.
- Mark and unmark contacts as emergency contacts.
- Organize contacts into groups:
  - Family
  - Friends
  - Work
  - School
  - Other
- View total contacts, favorites, and emergency contacts.
- Quick access to favorite and emergency contacts.
Form Validation
- Full name: 2–50 characters, English letters and spaces only.
- Phone number: Valid Egyptian mobile number.
- Email: Optional, but must be valid when provided.
Data Persistence
- Uses Local Storage to save contact information.
- Automatically loads saved contacts when reopening the application.
- No backend or database required.
## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5
- Font Awesome
- SweetAlert2
- Google Fonts (Inter)
  
##  Project Structure

```text
contacthub/
│
├── index.html
│
├── css/
│   ├── all.min.css
│   ├── bootstrap.min.css
│   └── style.css
│
├── js/
│   ├── bootstrap.bundle.min.js
│   └── index.js
│
└── images/
    └── avatar-4.jpg
```

## Getting Started
1. Clone the repository:
git clone git clone https://github.com/rawantaher922-byte/contacthub-smart-contact-manager.git
2. Navigate to the project folder:
cd contacthub-crud-system
3. Open index.html in your browser.

You can also use the Live Server extension in Visual Studio Code.
## Data Storage
ContactHub uses browser Local Storage with the key contacts to store contact records.

Contact information remains saved in the same browser and device, even after closing and reopening the application.

Note: Clearing browser site data may delete saved contacts. Data is not synchronized between devices.

## Validation Rules
Field	Validation
Full Name	2–50 characters, English letters and spaces
Phone	Valid Egyptian mobile number
Email	Optional, valid email format if provided

## How to Use
1. Open the application in your browser.
2. Select Add Contact and fill in the required name and phone number.
3. Add optional contact details and choose a group.
4. Select the favorite or emergency options if needed, then save.
5. Search for a contact using their name, phone number, or email address.
6. Use the edit action to update a contact.
7. Use the delete action and confirm to remove a contact.
8. Toggle the favorite and emergency actions directly from a contact card.
Validation Details
Field	Rule
Full name	2–50 characters; English letters and spaces only
Phone number	Valid Egyptian mobile number
Email	Optional; valid email format when provided


## Important Notes
- Contact data is saved in Local Storage, so it is tied to the browser and device where it was entered. It is not synchronized between devices.
- Clearing the browser's site data may remove the saved contacts.
- Phone-number validation is specific to Egyptian mobile numbers.
- The supplied JavaScript uses Date.now() to generate contact IDs.
- SweetAlert2 is used for success and delete-confirmation dialogs. The HTML loads external libraries, so an internet connection may be needed when those dependencies are served from CDNs.
- Font Awesome


Made with ❤️ using HTML, CSS, and JavaScript.
- SweetAlert2
- Google Fonts – Inter
