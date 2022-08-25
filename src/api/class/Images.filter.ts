// Create image files filter
import FilterBuilder from '../../FilterBuilder';

export const IMAGE_FILES_FILTER = new FilterBuilder();
IMAGE_FILES_FILTER.eq('state', 'READY');
IMAGE_FILES_FILTER.in('mimetype', [
  'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'
]);
IMAGE_FILES_FILTER.notlike('name', 'action-%%');
