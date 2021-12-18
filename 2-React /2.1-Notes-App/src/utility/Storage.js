class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  getNoteId = (note) => {
    return Object.keys(note)[0] === "id" ? note.id : Object.keys(note)[0];
  };
  getAllNotes() {
    const storedNotesList = {};
    return this.storage
      .iterate((value, key) => {
        storedNotesList[key] = value[key];
      })
      .then(() => storedNotesList);
  }

  saveNote(note, storage = this.storage) {
    storage.setItem(this.getNoteId(note), note).catch((e) => console.log(e));
  }
  deleteNote(id, storage = this.storage) {
    storage.removeItem(id).catch((e) => console.log(e));
  }
  updateNote(note, storage = this.storage) {
    const id = this.getNoteId(note);
    storage
      .removeItem(id)
      .then(() => this.storage.setItem(id, note))
      .catch((e) => console.log(e));
  }
  transferToOtherStorage(note, finalStorage) {
    this.deleteNote(this.getNoteId(note), this.storage);
    this.saveNote(note, finalStorage);
  }
}
export default Storage;
