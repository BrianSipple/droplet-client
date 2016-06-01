import Ember from 'ember';

const { A } = Ember;


export default A([
  { label: 'Recently Created', code: 'createdAtDesc', properties: 'createdAt:desc,title:asc' },
  { label: 'Recently Updated', code: 'lastUpdatedAtDesc', properties: 'lastUpdatedAt:desc,title:asc' },
  { label: 'Alphabetical (A-Z)', code: 'titleAsc', properties: 'title:asc' },
  { label: 'Alphabetical (Z-A)', code: 'titleDesc', properties: 'title:desc' },
  { label: 'Collaborator Count', code: 'collaboratorCountDesc', properties: 'collaboratorCount:Desc,title:asc' },
]);
