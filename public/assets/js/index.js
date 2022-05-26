// Sets up some variables that will be given values later
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// If the Notes page is displayed, these variables will be given DOM references
if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element - used with the save button
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element - used with the save button
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// GET fetch request
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// POST fetch request
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

// DELETE fetch request
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Function for displaying the active note in the right column
const renderActiveNote = () => {
  hide(saveNoteBtn);

  // If there is an active note (i.e. a note in the left column that was clicked on)
  if (activeNote.id) {
    // The note will display in the right column, but it cannot be modified
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
    // If there is no active note, the readonly attribute will be removed from the right column so that it can be edited by entering a new note
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// Handler function for when the save button is pressed
const handleNoteSave = () => {
  // Creates an object consisting of the note title and text
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  // Runs a POST fetch request with the note object as a parameter, saving it in the database
  saveNote(newNote).then(() => {
    // Updates the left and right columns
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  // Retrieves the note id
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  // If the deleted note is being displayed, activeNote will be reassigned
  if (activeNote.id === noteId) {
    activeNote = {};
  }

  // Runs a DELETE fetch request with the retrieved note id as the parameter
  deleteNote(noteId).then(() => {
    // Updates the left and right columns
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote (by retrieving it from the data attribute) and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

// The save button will only display if a note has both a title and text - it's a sort of validation so that the API routes won't need to validate input
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  // These event listeners listen for a key release in association with their respective fields. The purpose is to only display the save button if text has been entered into both
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
