export default {

  get: function notebooksHandler(db, request) {
    const userId = request.queryParams.owner;

    return db.notebook.where({ ownerId: userId });
  },

}
