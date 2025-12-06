# Gallery Images Guide

## Current Setup

The gallery now displays 12 offset printing-related images. These are placeholder images that you can easily replace with your own.

## How to Add Your Own Images from Google Images

### Step 1: Find Images on Google Images

1. Go to [Google Images](https://www.google.com/imghp)
2. Search for "offset printing" or related terms
3. Right-click on an image you want to use
4. Select "Copy image address" or "Copy image link"
5. You'll get a URL like: `https://example.com/image.jpg`

### Step 2: Update the Gallery

Edit `src/components/PhotoGallery.js` and replace the URLs in the `hardcodedPhotos` array:

```javascript
const hardcodedPhotos = [
  {
    id: 1,
    src: 'PASTE_YOUR_IMAGE_URL_HERE',
    title: 'Your Image Title'
  },
  // ... more images
];
```

### Step 3: Important Notes

⚠️ **Copyright Warning:** 
- Make sure you have permission to use images from Google Images
- Many images are copyrighted
- Best practice: Use your own photos or images with proper licensing

### Better Options for Images:

1. **Use Your Own Photos:**
   - Take photos of your actual printing work
   - Upload to a hosting service (Imgur, Cloudinary, etc.)
   - Use those URLs

2. **Free Stock Images:**
   - [Unsplash](https://unsplash.com) - Free, high-quality photos
   - [Pexels](https://pexels.com) - Free stock photos
   - [Pixabay](https://pixabay.com) - Free images

3. **Upload to Your Server:**
   - Add images to `public/images/` folder
   - Reference as: `/images/your-image.jpg`

## Example: Using Local Images

1. Create folder: `public/images/gallery/`
2. Add your images there
3. Update the code:

```javascript
{
  id: 1,
  src: '/images/gallery/offset-press-1.jpg',
  title: 'Offset Printing Press'
}
```

## Current Image URLs

The gallery currently uses Unsplash images. You can:
- Keep them as placeholders
- Replace with your own images
- Mix both (some placeholder, some your own)

## Quick Replace Example

To quickly replace all images with your own:

```javascript
const hardcodedPhotos = [
  {
    id: 1,
    src: 'https://your-image-host.com/image1.jpg',
    title: 'Offset Printing Press'
  },
  {
    id: 2,
    src: 'https://your-image-host.com/image2.jpg',
    title: 'Business Cards'
  },
  // ... add more
];
```

