document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('invitationForm');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const invitationCard = document.getElementById('invitationCard');
            
    const finalName = document.getElementById('finalName');
    const finalDateTime = document.getElementById('finalDateTime');
    const finalVenue = document.getElementById('finalVenue');
    const invitationPhoto = document.getElementById('invitationPhoto');
            
    const nameError = document.getElementById('nameError');
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');
    const venueError = document.getElementById('venueError');
            
    generateBtn.addEventListener('click', function() {
        // Reset errors[cite: 2]
        [nameError, dateError, timeError, venueError].forEach(err => err.style.display = 'none');
                
        const name = document.getElementById('name').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const venue = document.getElementById('venue').value.trim();
        const photoFile = document.getElementById('photo').files[0];
                
        // Validation[cite: 2]
        let isValid = true;
        if (!name) { nameError.style.display = 'block'; isValid = false; }
        if (!date) { dateError.style.display = 'block'; isValid = false; }
        if (!time) { timeError.style.display = 'block'; isValid = false; }
        if (!venue) { venueError.style.display = 'block'; isValid = false; }
                
        if (!isValid) return;
                
        // Formatting[cite: 2]
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
                
        const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric', minute: '2-digit', hour12: true
        });
                
        finalName.textContent = name;
        finalDateTime.textContent = `${formattedDate} at ${formattedTime}`;
        finalVenue.textContent = venue;
                
        // Photo Handling[cite: 2]
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                invitationPhoto.src = e.target.result;
            };
            reader.readAsDataURL(photoFile);
        } else {
            invitationPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="%23f1f2f6" stroke="%23ddd" stroke-width="2"/><text x="100" y="110" font-family="Arial" font-size="18" fill="%23747d8c" text-anchor="middle">NO IMAGE</text></svg>';
        }
                
        invitationCard.style.display = 'block';
        invitationCard.scrollIntoView({ behavior: 'smooth' });
    });

    // FIXED DOWNLOAD LOGIC FOR LOCAL FILES[cite: 2]
    downloadBtn.addEventListener('click', function() {
        // Hide button during capture
        downloadBtn.style.visibility = 'hidden';

        html2canvas(invitationCard, {
            useCORS: true,      
            allowTaint: true,   // Allows local file access
            scale: 2,           // High quality
            logging: true,      
            backgroundColor: null 
        }).then(canvas => {
            try {
                // Convert to DataURL and trigger download
                const link = document.createElement('a');
                link.download = `Invitation_${finalName.textContent || 'Birthday'}.png`;
                link.href = canvas.toDataURL("image/png");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error("Export Error:", err);
                alert("Security block: To download, please run this using 'Live Server' in VS Code or upload it to a host like GitHub Pages.");
            }
            
            downloadBtn.style.visibility = 'visible';
        }).catch(err => {
            console.error("Capture Error: ", err);
            downloadBtn.style.visibility = 'visible';
        });
    });
            
    form.addEventListener('reset', function() {
        [nameError, dateError, timeError, venueError].forEach(err => err.style.display = 'none');
        invitationCard.style.display = 'none';
    });
});