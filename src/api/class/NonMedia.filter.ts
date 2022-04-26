// Create non-media files filter
import FilterBuilder from "../../FilterBuilder";

export const NON_MEDIA_FILES_FILTER = new FilterBuilder();
NON_MEDIA_FILES_FILTER.eq('state', 'READY');
NON_MEDIA_FILES_FILTER.notin('mimetype', [
  // no images
  'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',

  // no videos
  'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
]);
