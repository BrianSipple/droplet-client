export default {

  /**
   * Handle GETs for notes that are querying by `ownerId`
   */
  get(db, request) {
    const userId = request.queryParams.owner;

    // return db.notes.where({ ownerId: userId });
    return db.notes.where(note => {
      const notebook = db.notebooks.find(note.notebookId);
      return notebook.ownerId === userId;
    });
  }
};
