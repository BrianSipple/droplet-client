export default {

  /**
   * Handle GETs for notebooks that are querying by `ownerId`
   */
  get(db, request) {
    const userId = request.queryParams.owner;

    return db.notebooks.where({ ownerId: userId });
  }
};
