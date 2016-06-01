const properties = {
  RECENTLY_CREATED: 'createdAt:desc,title:asc',
  RECENTLY_UPDATED: 'lastUpdatedAt:desc,title:asc',
  ALPHABETICAL_AZ: 'title:asc',
  ALPHABETICAL_ZA: 'title:desc',
  COLLABORATOR_COUNT: 'collaboratorCount:Desc,title:asc'
};

const queryParamCodes = {
  RECENTLY_CREATED: 'createdAtDesc',
  RECENTLY_UPDATED: 'lastUpdatedAtDesc',
  ALPHABETICAL_AZ: 'titleAsc',
  ALPHABETICAL_ZA: 'titleDesc',
  COLLABORATOR_COUNT: 'collaboratorCountDesc'
};


export default {
  properties,

  queryParamCodes,

  options: [
    { label: 'Recently Created', code: queryParamCodes.RECENTLY_CREATED, properties: properties.RECENTLY_CREATED },
    { label: 'Recently Updated', code: queryParamCodes.RECENTLY_UPDATED, properties: properties.RECENTLY_UPDATED },
    { label: 'Alphabetical (A-Z)', code: queryParamCodes.ALPHABETICAL_AZ, properties: properties.ALPHABETICAL_AZ },
    { label: 'Alphabetical (Z-A)', code: queryParamCodes.ALPHABETICAL_ZA, properties: properties.ALPHABETICAL_ZA },
    { label: 'Collaborator Count', code: queryParamCodes.COLLABORATOR_COUNT, properties: properties.COLLABORATOR_COUNT }
  ]
};
