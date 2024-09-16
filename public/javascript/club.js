document.addEventListener('DOMContentLoaded', function () {
    const joinButton = document.getElementById('joinClubBtn');
    const setBookBtn = document.getElementById('setBookBtn');
    const setBookForm = document.getElementById('setBookForm');
    const setDiscussionDateBtn = document.getElementById('setDiscussionDateBtn');
    const setDiscussionForm = document.getElementById('setDiscussionForm');
    const discussionDatetime = document.getElementById('discussionDatetime');

    if (joinButton) { 
        joinButton.addEventListener('click', function () {
            const clubId = this.getAttribute('data-club-id');

            fetch(`/api/clubs/join/${clubId}`, { method: 'POST' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to join club');
                return response.json();
            })
            .then(data => {
                joinButton.textContent = 'You are a member of this club';
                joinButton.classList.remove('btn-sucess');
                joinButton.classList.add('btn-secondary');
                joinButton.disabled = true;
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

    const currentBookNameEle = document.querySelector('.book-details h3');

    if (currentBookNameEle) {
        const currentBookName = currentBookNameEle.innerText;
        console.log('Book title:', currentBookName);
        fetchBookCover(currentBookName);
    } else {
        console.log('No book found.')
    }

    function fetchBookCover(bookTitle) {
        const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(bookTitle)}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('OpenLibrary data:', data);

                if (data.docs && data.docs.length > 0) {
                    const doc = data.docs[0];
                    let coverUrl = '';

                    if (doc.cover_edition_key) {
                        coverUrl = `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-L.jpg`;
                    } else if (doc.cover_i) {
                        coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
                    } else {
                        coverUrl = '/images/default-cover.jpg'; // Optional default cover
                    }
                    
                    document.getElementById('bookCover').src = coverUrl;
                } else {
                    document.getElementById('bookCover').src = '/images/default-cover.jpg';
                }
            })
            .catch(error => {
                console.error('Error fetching book cover:', error);
                document.getElementById('bookCover').src = '/images/default-cover.jpg'
            })
    }

    if (setDiscussionDateBtn) {
        setDiscussionDateBtn.addEventListener('click', function () {
            setDiscussionForm.style.display = 'block';
        })
    };

    if (discussionDatetime) {
        flatpickr(discussionDatetime, {
            enableTime: true,
            dateFormat: 'Y-m-d H:i'
        })
    }
});