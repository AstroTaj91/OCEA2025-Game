// In emailCollection.js

const EmailCollectionManager = {
    init: function()  {
        // Set up initial form validation
        this.setupFormValidation();
        
        // Initialize localStorage if needed
        if (!localStorage.getItem('aiDefenderEmails')) {
            localStorage.setItem('aiDefenderEmails', JSON.stringify([]));
        }
    },
    
    setupFormValidation: function() {
        // Your existing validation code can remain
    },
    
    submitEmail: function(name, email, newsletter) {
        // Store in localStorage (keep this for backward compatibility)
        const emailData = JSON.parse(localStorage.getItem('aiDefenderEmails') || '[]');
        const newEntry = {
            name: name,
            email: email,
            newsletter: newsletter,
            date: new Date().toISOString()
        };
        emailData.push(newEntry);
        localStorage.setItem('aiDefenderEmails', JSON.stringify(emailData));
        
        // Send to Formspree (new server-side storage)
        this.sendToFormspree(newEntry);
        
        return true;
    },
    
    sendToFormspree: function(data) {
        // Replace YOUR_FORMSPREE_ENDPOINT with your actual endpoint from Step 1
        const formspreeEndpoint = 'https://formspree.io/f/xyzwybly';
        
        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(response => {
            if (response.ok) {
                console.log('Email successfully submitted to Formspree');
            } else {
                console.error('Formspree submission failed');
            }
        })
        .catch(error => {
            console.error('Error submitting to Formspree:', error);
        });
    }
};
