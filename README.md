# contacthub-smart-contact-manager
ContactHub is a browser-based contact management system that lets users create, view, update, and delete contact records. It also includes search, favorites, emergency-contact marking, form validation, and browser-based data persistence using Local Storage.
✨ Features
Contact CRUD
- Create new contacts with a name, phone number, email, address, group, and notes.
- Read and display saved contacts in contact cards.
- Update existing contact details through the edit form.
- Delete contacts with a confirmation dialog.
Contact Organization
- Mark and unmark contacts as Favorites.
- Mark and unmark contacts as Emergency contacts.
- Assign contacts to groups: Family, Friends, Work, School, or Other.
- View separate quick-access lists for favorites and emergency contacts.
- View dashboard counts for total contacts, favorites, and emergency contacts.
Search and Validation
- Search contacts by name, phone number, or email address.
- Validate names (2–50 letters and spaces).
- Validate Egyptian mobile numbers.
- Validate email addresses when an email is provided.
- Show validation messages beside invalid fields.
Data Persistence
- Save contact records in the browser's Local Storage.
- Load saved contacts when the application is opened again.
🛠️ Built With
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5

 ## Project Structure
 contacthub/
├── index.html
├── css/
│   ├── all.min.css
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── bootstrap.bundle.min.js
│   └── index.js
└── images/
    └── avatar-4.jpg
    
Use the actual folder and file locations from your project when arranging the repository. The JavaScript file must be placed at the path referenced by the script tag in index.html.
 
## Getting Started
1. Clone the repository:
   git clone https://github.com/your-username/contacthub-crud-system.git
2. Open the project directory:
   cd contacthub-crud-system
3. Make sure the HTML file and all referenced CSS, JavaScript, and image assets are present.
4. Open index.html in your browser. You can also use the Live Server extension in Visual Studio Code.
No build step or package installation is required by the supplied source.

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

Made with ❤️ using HTML, CSS, and JavaScript.

- Font Awesome
- SweetAlert2
- Google Fonts – Inter
