document.addEventListener('DOMContentLoaded', function () {
    const joinButton = document.getElementById('joinClubBtn');
    const setBookBtn = document.getElementById('setBookBtn');
    const setBookForm = document.getElementById('setBookForm');

    if (joinButton) { 
        joinButton.addEventListener('click', function () {
            const clubId = this.getAttribute('data-club-id');

            fetch(`/api/clubs/join/${clubId}`, { method: 'POST' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to join club');
                return response.json();
            })
            .then(data => {
                alert(data.message);  // Show success message
            })
            .catch(error => {
                console.error('Error joining club:', error);
                alert('Error joining club: ' + error.message);
            });
        });
    };

    if (setBookBtn) {
        setBookBtn.addEventListener('click', function () {
            setBookForm.style.display = 'block';
        });
    }
});