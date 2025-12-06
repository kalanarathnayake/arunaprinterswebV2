# Background Image Guide

## Current Setup

I've added a background image to your landing page with:
- A professional printing/paper texture image (placeholder from Unsplash)
- A semi-transparent white overlay (75% opacity) to keep your content readable
- Fixed background attachment for a parallax effect

## How to Use Your Own Background Image

### Option 1: Use an Image URL

Edit `src/styles/App.css` and replace the `background-image` URL:

```css
background-image: url('YOUR_IMAGE_URL_HERE');
```

### Option 2: Use a Local Image

1. **Add your image to the project:**
   - Place your image in `public/` folder (e.g., `public/background.jpg`)
   - OR place it in `src/assets/` folder (e.g., `src/assets/background.jpg`)

2. **Update the CSS:**

   If image is in `public/`:
   ```css
   background-image: url('/background.jpg');
   ```

   If image is in `src/assets/`:
   ```css
   background-image: url('../assets/background.jpg');
   ```

### Option 3: Adjust the Overlay Opacity

To make the background more or less visible, adjust the overlay opacity in `src/styles/App.css`:

```css
.main-content::before {
  background: rgba(255, 255, 255, 0.75); /* Change 0.75 to adjust opacity */
}
```

- `0.0` = No overlay (background fully visible)
- `0.5` = 50% overlay (medium visibility)
- `0.75` = 75% overlay (current - good readability)
- `0.9` = 90% overlay (background barely visible)

### Option 4: Change Overlay Color

You can use a different overlay color:

```css
.main-content::before {
  background: rgba(0, 0, 0, 0.3); /* Dark overlay */
  /* OR */
  background: rgba(79, 70, 229, 0.2); /* Purple tint */
}
```

## Recommended Image Specifications

- **Format:** JPG or PNG
- **Size:** 1920x1080px or larger (for high-resolution displays)
- **File Size:** Under 500KB (for fast loading)
- **Content:** Printing-related images, paper textures, or abstract patterns work well

## Remove Background Image

To remove the background image and go back to a solid color:

1. Remove or comment out the `background-image` line in `src/styles/App.css`
2. The page will use the default `background-color: #f5f5f5`

## Example: Printing-Related Background Ideas

- Paper texture
- Printing press machinery
- Colorful ink patterns
- Typography/letterpress
- Abstract geometric patterns
- Subtle gradient overlays

