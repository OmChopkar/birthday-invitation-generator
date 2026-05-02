        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('invitationForm');
            const generateBtn = document.getElementById('generateBtn');
            const invitationCard = document.getElementById('invitationCard');
            
            // Final invitation elements
            const finalName = document.getElementById('finalName');
            const finalDateTime = document.getElementById('finalDateTime');
            const finalVenue = document.getElementById('finalVenue');
            const invitationPhoto = document.getElementById('invitationPhoto');
            
            // Error elements
            const nameError = document.getElementById('nameError');
            const dateError = document.getElementById('dateError');
            const timeError = document.getElementById('timeError');
            const venueError = document.getElementById('venueError');
            
            // Generate invitation
            generateBtn.addEventListener('click', function() {
                // Reset errors
                nameError.style.display = 'none';
                dateError.style.display = 'none';
                timeError.style.display = 'none';
                venueError.style.display = 'none';
                
                // Get values
                const name = document.getElementById('name').value.trim();
                const date = document.getElementById('date').value;
                const time = document.getElementById('time').value;
                const venue = document.getElementById('venue').value.trim();
                const photoFile = document.getElementById('photo').files[0];
                
                // Validate
                let isValid = true;
                
                if (!name) {
                    nameError.style.display = 'block';
                    isValid = false;
                }
                
                if (!date) {
                    dateError.style.display = 'block';
                    isValid = false;
                }
                
                if (!time) {
                    timeError.style.display = 'block';
                    isValid = false;
                }
                
                if (!venue) {
                    venueError.style.display = 'block';
                    isValid = false;
                }
                
                if (!isValid) return;
                
                // Format date
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                // Format time
                const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                
                // Set final invitation values
                finalName.textContent = name;
                finalDateTime.textContent = `${formattedDate} at ${formattedTime}`;
                finalVenue.textContent = venue;
                
                // Handle photo for final invitation
                if (photoFile) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        invitationPhoto.src = e.target.result;
                    };
                    reader.readAsDataURL(photoFile);
                } else {
                    // Use a placeholder image if no photo uploaded
                    invitationPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="%23f1f2f6" stroke="%23ddd" stroke-width="2"/><text x="100" y="110" font-family="Arial" font-size="18" fill="%23747d8c" text-anchor="middle">NO IMAGE</text></svg>';
                }
                
                // Show invitation card
                invitationCard.style.display = 'block';
                
                // Scroll to invitation card
                invitationCard.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Reset form when reset button is clicked
            form.addEventListener('reset', function() {
                // Hide errors
                nameError.style.display = 'none';
                dateError.style.display = 'none';
                timeError.style.display = 'none';
                venueError.style.display = 'none';
                
                // Hide invitation card
                invitationCard.style.display = 'none';
            });
        });