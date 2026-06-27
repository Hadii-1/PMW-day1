# Tiny Structure from Motion (SfM) Experiment

## What I Did

Ran a simple Structure from Motion (SfM) pipeline in Google Colab using OpenCV and a pair of sample images.

---

## How it Works

1. Loads two images of the same scene.
2. Detects key feature points using the ORB feature detector.
3. Matches corresponding features between the images.
4. Estimates the camera's relative movement using the Essential Matrix.
5. Triangulates the matched points to generate a sparse 3D point cloud.

---

## Result

Successfully:

- Detected feature points in both images.
- Matched corresponding features.
- Estimated camera pose.
- Generated a sparse 3D point cloud representing the scene.

---

## Key Learning

- Structure from Motion reconstructs 3D geometry using multiple 2D images.
- Feature detection and matching are essential for accurate reconstruction.
- Camera pose estimation allows the system to understand where each image was captured.
- Triangulation converts matched image points into 3D coordinates.
- SfM is a classical computer vision technique and does not require training a neural network.

---

## Output

- Feature detection completed.
- Feature matching visualization generated.
- Camera pose estimated.
- Sparse 3D point cloud successfully reconstructed.

---

## Connection to PreserveMy.World

Structure from Motion can be used to reconstruct historical buildings and cultural heritage sites from ordinary photographs. It provides a practical and accessible way to create digital 3D models for preservation without requiring specialized scanning equipment.

# youtube videos link :

https://youtu.be/Fs5-AaDO21k?si=sbyzmPKSlYwEz5zf

https://youtu.be/i7ierVkXYa8?si=pt2QRje6zRXXj-dq