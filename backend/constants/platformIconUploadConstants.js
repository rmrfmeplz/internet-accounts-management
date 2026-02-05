const ALLOWED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/x-icon']
const ALLOWED_IMAGE_SUFFIXS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'ico']
const ALLOWED_IMAGE_SIZE = 2 * 1024 * 1024
const ALLOWED_IMAGE_BASE64_SIZE = Math.floor(ALLOWED_IMAGE_SIZE * 1.33 * 1.1)

module.exports = {
    ALLOWED_IMAGE_TYPES,
    ALLOWED_IMAGE_SUFFIXS,
    ALLOWED_IMAGE_SIZE,
    ALLOWED_IMAGE_BASE64_SIZE
}