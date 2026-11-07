
var fullNameElement = document.getElementById('fullName');
var phoneNumberElement = document.getElementById('phoneNumber');
var emailAddressElement = document.getElementById('emailAddress');
var addressElement = document.getElementById('address');
var notesElement = document.getElementById('notes');
var groupElement = document.getElementById('group');
var isFavoriteElement = document.getElementById('isFavorite');
var isEmergencyElement = document.getElementById('isEmergency');

var totalContactsElement = document.getElementById('totalCount');
var favoritesCountElement = document.getElementById('favoriteCount');
var emergencyCountElement = document.getElementById('emergencyCount');

var rowData = document.getElementById('contactsContainer');
var emergencyList = document.getElementById('emergencyContainer');
var favoritesList = document.getElementById('favoritesContainer');
var modal = document.getElementById('addContactModal');
var saveContactBtn = document.getElementById('saveContactBtn');
var updateContactBtn = document.getElementById('updateContactBtn');

var searchInput = document.getElementById('searchInput');
var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
var updateId = -1;
var searchTimer;


/* ------------------------------validation---------------------------------*/

function showValidationError(input, message) {
    clearFieldError(input);

    input.classList.add('is-invalid');

    var errorMessage = document.createElement('div');
    errorMessage.className = 'validation-message';
    errorMessage.textContent = message;

    input.insertAdjacentElement('afterend', errorMessage);
}

function clearFieldError(input) {
    input.classList.remove('is-invalid');

    var nextElement = input.nextElementSibling;

    if (nextElement && nextElement.classList.contains('validation-message')) {
        nextElement.remove();
    }
}

function clearValidationErrors() {
    clearFieldError(fullNameElement);
    clearFieldError(phoneNumberElement);
    clearFieldError(emailAddressElement);
}


function validateName() {
    var name = fullNameElement.value.trim();

    if (!/^[a-zA-Z\s]{2,50}$/.test(name)) {
        showValidationError(
            fullNameElement,
            'Name should contain only letters and spaces (2-50 characters).'
        );

        return false;
    }

    clearFieldError(fullNameElement);
    return true;
}

function validatePhoneNumber() {
    var phone = phoneNumberElement.value.trim();
    var cleanPhone = phone.replace(/[\s()-]/g, '');
    var egyptianNumber =
        /^(01[0125][0-9]{8}|\+201[0125][0-9]{8}|00201[0125][0-9]{8})$/;

    if (phone === '' || !egyptianNumber.test(cleanPhone)) {
        showValidationError(
            phoneNumberElement,
            'Please enter a valid Egyptian number.'
        );

        return false;
    }

    clearFieldError(phoneNumberElement);
    return true;
}

function validateEmail() {
    var email = emailAddressElement.value.trim();

    if (email !== '' && !emailAddressElement.checkValidity()) {
        showValidationError(
            emailAddressElement,
            'Please enter a valid email address.'
        );

        return false;
    }

    clearFieldError(emailAddressElement);
    return true;
}


function validateContactForm() {
    var nameIsValid = validateName();
    var phoneIsValid = validatePhoneNumber();
    var emailIsValid = validateEmail();

    if (!nameIsValid) {
        fullNameElement.focus();
        return false;
    }

    if (!phoneIsValid) {
        phoneNumberElement.focus();
        return false;
    }

    if (!emailIsValid) {
        emailAddressElement.focus();
        return false;
    }

    return true;
}



fullNameElement.addEventListener('input', function() {
    validateName();
});
phoneNumberElement.addEventListener('input', function() {
    validatePhoneNumber();
});
emailAddressElement.addEventListener('input', function() {
    validateEmail();
});


displayContacts(contacts);

function saveContact() {
    if (!validateContactForm()) {
        return;
    }

    var newContact = {
        id: Date.now(),
        fullName: fullNameElement.value.trim(),
        phoneNumber: phoneNumberElement.value.trim(),
        emailAddress: emailAddressElement.value.trim(),
        address: addressElement.value.trim(),
        notes: notesElement.value.trim(),
        group: groupElement.value,
        isFavorite: isFavoriteElement.checked,
        isEmergency: isEmergencyElement.checked
    };

    contacts.push(newContact);

    saveToLocalStorage(contacts);
    displayContacts(contacts);
    closeModal();

    Swal.fire({
        title: 'Contact Saved!',
        icon: 'success'
    });
}

function clearForm() {
    fullNameElement.value = '';
    phoneNumberElement.value = '';
    emailAddressElement.value = '';
    addressElement.value = '';
    notesElement.value = '';
    groupElement.value = '';

    isFavoriteElement.checked = false;
    isEmergencyElement.checked = false;

    clearValidationErrors();
}

function closeModal() {
    clearForm();

    var modalDiv = bootstrap.Modal.getInstance(modal);

    if (modalDiv) {
        modalDiv.hide();
    }

    saveContactBtn.classList.remove('d-none');
    updateContactBtn.classList.add('d-none');

    updateId = -1;
}


function saveToLocalStorage(data) {
    localStorage.setItem('contacts', JSON.stringify(data));
}


/*-----------------------------display contact------------------------------------------- */

function displayContacts(data) {
    totalContactsElement.innerHTML = contacts.length;

    var favCount = 0;
    var emergCount = 0;

    var box = '';
    var favBox = '';
    var emergBox = '';

    for (var i = 0; i < data.length; i++) {
        var contact = data[i];

        box += `
        <div class="col-md-6">
            <div class="contact-card">

                <div class="contact-header">
                    <div class="contact-avatar ${contact.isFavorite ? 'favorite' : ''} ${contact.isEmergency ? 'emergency' : ''}">
                        ${contact.fullName.trim().charAt(0).toUpperCase()}
                    </div>

                    <div class="contact-info">
                        <h4>${contact.fullName}</h4>
                    </div>
                </div>

                <div class="contact-details">
                    <div class="contact-detail phone">
                        <i class="fas fa-phone"></i>
                        <span>${contact.phoneNumber}</span>
                    </div>

                    <div class="contact-detail email">
                        <i class="fas fa-envelope"></i>
                        <span>${contact.emailAddress || ''}</span>
                    </div>

                    <div class="contact-detail address">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${contact.address || ''}</span>
                    </div>
                </div>

                <div class="contact-tags">
                    ${contact.group ? `<span class="tag ${contact.group}">${contact.group}</span>` : ''}

                    ${contact.isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ''}

                    ${contact.isFavorite ? '<span class="tag favorites"><i class="fas fa-heart"></i> Favorite</span>' : ''}
                </div>

                <div class="contact-actions">

                    <a class="contact-action call"
                       title="Call"
                       href="tel:${contact.phoneNumber}">
                        <i class="fas fa-phone"></i>
                    </a>

                    ${contact.emailAddress ? `
                    <a class="contact-action email"
                       title="Email"
                       href="mailto:${contact.emailAddress}">
                        <i class="fas fa-envelope"></i>
                    </a>` : ''}

                    <button onclick="toggleFavorite(${contact.id})"
                        class="contact-action ${contact.isFavorite ? 'active' : ''} favorite"
                        title="Favorite"
                        type="button">
                        <i class="far fa-star"></i>
                    </button>

                    <button onclick="toggleEmergency(${contact.id})"
                        class="contact-action ${contact.isEmergency ? 'active' : ''} emergency"
                        title="Emergency"
                        type="button">
                        <i class="far fa-heart"></i>
                    </button>

                    <button data-bs-toggle="modal"
                        data-bs-target="#addContactModal"
                        class="contact-action"
                        title="Edit"
                        type="button"
                        onclick="getContactForUpdate(${contact.id})">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button onclick="deleteContact(${contact.id})"
                        class="contact-action delete"
                        title="Delete"
                        type="button">
                        <i class="fas fa-trash"></i>
                    </button>

                </div>
            </div>
        </div>
        `;

        if (contact.isFavorite) {
            favBox += `
            <div class="sidebar-contact-card">

                <div class="sidebar-contact-avatar">
                    ${contact.fullName.trim().charAt(0).toUpperCase()}
                </div>

                <div class="sidebar-contact-info">
                    <h5>${contact.fullName}</h5>
                    <p>${contact.phoneNumber}</p>
                </div>

                <a class="sidebar-call-btn favorites-call"
                   href="tel:${contact.phoneNumber}">
                    <i class="fas fa-phone"></i>
                </a>

            </div>
            `;

            favCount++;
        }

        if (contact.isEmergency) {
            emergBox += `
            <div class="sidebar-contact-card">

                <div class="sidebar-contact-avatar">
                    ${contact.fullName.trim().charAt(0).toUpperCase()}
                </div>

                <div class="sidebar-contact-info">
                    <h5>${contact.fullName}</h5>
                    <p>${contact.phoneNumber}</p>
                </div>

                <a class="sidebar-call-btn favorites-call"
                   href="tel:${contact.phoneNumber}">
                    <i class="fas fa-phone"></i>
                </a>

            </div>
            `;

            emergCount++;
        }
    }


    if (data.length === 0) {
        rowData.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-address-book"></i>
                </div>

                <h4>No contacts found</h4>
                <p>Click "Add Contact" to get started</p>
            </div>
        `;
    } else {
        rowData.innerHTML = box;
    }

    
    favoritesList.innerHTML = favBox || '<p>No favorites yet</p>';
    emergencyList.innerHTML = emergBox || '<p>No emergency contacts</p>';


    favoritesCountElement.innerHTML = favCount;
    emergencyCountElement.innerHTML = emergCount;
}


/*-------------------------delete---------------------------------------- */

function deleteContact(id) {
    Swal.fire({
        title: 'Are you sure you want to delete this contact? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#606773',
        confirmButtonText: 'Yes, delete it!'
    }).then(function(result) {
        if (result.isConfirmed) {
            var temp = getContactById(id);
            var index = contacts.indexOf(temp);

            if (index !== -1) {
                contacts.splice(index, 1);

                saveToLocalStorage(contacts);
                displayContacts(contacts);
            }

            Swal.fire({
                title: 'Deleted!',
                text: 'Your contact has been deleted.',
                icon: 'success'
            });
        }
    });
}


function getContactForUpdate(id) {
    updateId = id;

    var currentContact = getContactById(id);

    if (currentContact === null) {
        return;
    }

    clearValidationErrors();

    fullNameElement.value = currentContact.fullName;
    phoneNumberElement.value = currentContact.phoneNumber;
    emailAddressElement.value = currentContact.emailAddress || '';
    groupElement.value = currentContact.group || '';
    notesElement.value = currentContact.notes || '';
    addressElement.value = currentContact.address || '';

    isFavoriteElement.checked = currentContact.isFavorite;
    isEmergencyElement.checked = currentContact.isEmergency;

    saveContactBtn.classList.add('d-none');
    updateContactBtn.classList.remove('d-none');
}


/*-------------------------------update--------------------------------------- */

function updateContact() {
    if (!validateContactForm()) {
        return;
    }

    var updatedContact = {
        fullName: fullNameElement.value.trim(),
        phoneNumber: phoneNumberElement.value.trim(),
        emailAddress: emailAddressElement.value.trim(),
        group: groupElement.value,
        notes: notesElement.value.trim(),
        address: addressElement.value.trim(),
        isFavorite: isFavoriteElement.checked,
        isEmergency: isEmergencyElement.checked
    };

    var temp = getContactById(updateId);
    var index = contacts.indexOf(temp);

    if (index === -1) {
        return;
    }

    contacts[index] = {
        ...contacts[index],
        ...updatedContact
    };

    saveToLocalStorage(contacts);
    displayContacts(contacts);
    closeModal();

    Swal.fire({
        title: 'Updated!',
        text: 'Your contact has been updated.',
        icon: 'success'
    });
}


/*-------------------------------search ---------------------- */
function searchContacts(input) {
    setTimeout(() => {
        var filterdData = [];

        for (var i = 0; i < contacts.length; i++) {
            if (
                contacts[i].fullName.toLowerCase().includes(input.toLowerCase()) ||
                contacts[i].phoneNumber.includes(input) ||
                (contacts[i].emailAddress || '').toLowerCase().includes(input.toLowerCase())
            ) {
                filterdData.push(contacts[i]);
            }
        }

        displayContacts(filterdData);

    }, 1000);
}


function toggleFavorite(id) {
    var temp = getContactById(id);

    if (temp !== null) {
        temp.isFavorite = !temp.isFavorite;

        saveToLocalStorage(contacts);
        displayContacts(contacts);
    }
}


/*--------------------------  emergency---------------------- */

function toggleEmergency(id) {
    var temp = getContactById(id);

    if (temp !== null) {
        temp.isEmergency = !temp.isEmergency;

        saveToLocalStorage(contacts);
        displayContacts(contacts);
    }
}


function getContactById(id) {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            return contacts[i];
        }
    }

    return null;
}