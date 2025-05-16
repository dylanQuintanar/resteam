// Implement dark mode toggle and set default
document.body.classList.add('dark-mode'); // Add dark mode by default

document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Save notes to localStorage
const notesTextarea = document.getElementById('notes');

// Load saved notes
notesTextarea.value = localStorage.getItem('userNotes') || '';

// Save notes when content changes
notesTextarea.addEventListener('input', function() {
    localStorage.setItem('userNotes', this.value);
});

// Add Copy and Clear functionality
document.getElementById('copyNotes').addEventListener('click', function() {
    const notesContent = notesTextarea.value;
    navigator.clipboard.writeText(notesContent).then(() => {
        alert('Notes copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy notes: ', err);
    });
});

document.getElementById('clearNotes').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all notes?')) {
        notesTextarea.value = '';
        localStorage.removeItem('userNotes');
    }
});

// Modal functionality
function setupModalLinks() {
    const modal = document.getElementById('linkModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeButton = document.querySelector('.close-button');

    // Get all links with the specific class 'modal-link'
    const links = document.querySelectorAll('main a.modal-link');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modalIframe.src = this.href;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal with X button
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// Save and restore sections state
function setupSectionStateManagement() {
    const details = document.querySelectorAll('details');
    
    // Restore saved states on load
    details.forEach(detail => {
        const id = detail.querySelector('summary').textContent.trim();
        const isOpen = localStorage.getItem(`section_${id}`) === 'true';
        detail.open = isOpen;
    });

    // Save state when toggled
    details.forEach(detail => {
        detail.addEventListener('toggle', () => {
            const id = detail.querySelector('summary').textContent.trim();
            localStorage.setItem(`section_${id}`, detail.open);
        });
    });
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    setupModalLinks();
    setupSectionStateManagement();
});

// Render Glean App
document.addEventListener('DOMContentLoaded', () => 
    EmbeddedSearch.renderChat(document.getElementById('glean-app'), { applicationId: "eip4morbcxo0rs4s" })
    )
//window.EmbeddedSearch.renderChat(glean-search)


function render() {
    const container = document.getElementById('app')
    GleanWebSDK.renderChat(container, {
      /**
       * (Optional) ID of the application used to configure the underlying chat behaviour.
       * An Application ID can be created from the AI App builder.
       * @type {string=}
       */
      applicationId: undefined,
  
      /**
       * (Optional) Opaque id that stores the context 
       * of the current / new chat for the current session.
       * @type {string=}
       */
      chatId: undefined,
  
      /**
       * (Optional) style customizations
       * @type {ChatCustomizations=}
       */
      customizations: {
        container: {
          border: 'none',
          borderRadius: undefined,
          // Box shadow for the chat container
          // Note: Use horizontal/vertical margins when using this.
          boxShadow: undefined,
          // Margin to the left and right of the container
          horizontalMargin: undefined,
          // Margin to the left and right of the container
          verticalMargin: undefined,
        },
      },
  
      /**
       * (Optional) specify an initial message to start the chat
       * @type {string=} [initialMessage]
       */
      initialMessage: undefined,
      /**
       * (Optional) Enable flow to request the user for access if third-party 
       * cookies are blocked. If true, the user will be prompted to allow cookie 
       * access for Glean when they try to login.
       *
       * Note: This flag will have no impact on the login flow if third-party cookies 
       * are already allowed.
       *
       * Refer to https://developers.glean.com/docs/browser_api/third_party_cookies for details
       */
      enable3PCookieAccessRequest: true
    })
  }
  
  document.addEventListener('DOMContentLoaded', render)

