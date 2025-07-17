# Image Updates for Divasity Frontend

## Image Replacement Instructions

To fix the missing images in the Divasity Frontend project, follow these steps:

### Step 1: Download the Images

Download the following images from Pinterest and save them to the `src/assets` folder:

1. **Onboarding Images**:
   - Onboarding1.png: https://i.pinimg.com/originals/8e/54/9f/8e549f6d4f5a39c1f4ad8a48e0c4f656.png
   - Onboarding2.png: https://i.pinimg.com/originals/8c/0a/6e/8c0a6e01f6b74405a9a6b9dce7e5d608.png
   - Onboarding3.png: https://i.pinimg.com/originals/0d/e4/1c/0de41cd926fd329a7f8739d877c4b1ca.png

2. **Background Images**:
   - LoginBg.jpg: https://i.pinimg.com/originals/a8/c8/ec/a8c8eca928c4c53c73c562eac8b9e8fa.jpg
   - SignupBg.jpg: https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg
   - DashboardHero.jpg: https://i.pinimg.com/originals/0e/94/36/0e9436c7cf5d9ac7e4f11135d2c4dcc1.jpg
   - ProfileBanner.jpg: https://i.pinimg.com/originals/9e/a0/e9/9ea0e9e7911d571cbb733cc5a01d6b9b.jpg

3. **Project Images**:
   - ProjectPlaceholder.jpg: https://i.pinimg.com/originals/d5/55/d9/d555d9deb0d93b02f36f5e2e2ecc8f9e.jpg
   - TechProject.jpg: https://i.pinimg.com/originals/1d/64/c7/1d64c7b9d80a1b4e9c1757f896cb5887.jpg
   - BusinessProject.jpg: https://i.pinimg.com/originals/2c/e0/0e/2ce00e5f0f436afa36b909c5e2ea6673.jpg
   - FarmingPost.jpg: https://i.pinimg.com/originals/b5/63/69/b56369777a659536b03d3902661207bd.jpg

### Step 2: Update the Image References

The `images.ts` file has already been updated to use the new image filenames. Make sure the file contains the following imports:

```typescript
import Logo from "../assets/divasityIcon.png"
import Onboarding1 from "../assets/Onboarding1.png"
import Onboarding2 from "../assets/Onboarding2.png"
import Onboarding3 from "../assets/Onboarding3.png"
import GoogleIcon from "../assets/google-icon.svg"
import ProjectPlaceholder from "../assets/ProjectPlaceholder.jpg"
import TechProject from "../assets/TechProject.jpg"
import BusinessProject from "../assets/BusinessProject.jpg"
import DashboardHero from "../assets/DashboardHero.jpg"
import ProfileBanner from "../assets/ProfileBanner.jpg"
import FarmingPost from "../assets/FarmingPost.jpg"
import LoginBg from "../assets/LoginBg.jpg"
import SignupBg from "../assets/SignupBg.jpg"
```

### Step 3: Restart the Development Server

After downloading the images and ensuring the references are correct, restart your development server:

```bash
pnpm dev
```

## Image Usage in Components

These images are used in the following components:

1. **Onboarding.tsx**: Uses Onboarding1.png, Onboarding2.png, and Onboarding3.png for the onboarding slides.

2. **Login.tsx**: Uses LoginBg.jpg for the login page background and Logo for the Divasity logo.

3. **Signup.tsx**: Uses SignupBg.jpg for the signup page background and Logo for the Divasity logo.

4. **Dashboard.tsx**: Uses DashboardHero.jpg for the dashboard hero section background.

5. **Profile.tsx**: Uses ProfileBanner.jpg for the profile banner background.

6. **Projects.tsx**: Uses TechProject.jpg, BusinessProject.jpg, and FarmingPost.jpg for project thumbnails.

7. **NewsFeed.tsx**: Uses Logo for news thumbnails.

## Troubleshooting

If images are still not displaying correctly:

1. Check that the image files are in the correct location (`src/assets` folder)
2. Verify that the filenames match exactly with the imports in `src/constants/images.ts`
3. Clear your browser cache and restart the development server
4. Check the browser console for any errors related to image loading
5. Make sure the image URLs are accessible and the images can be downloaded