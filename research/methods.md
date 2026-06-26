# 3D Reconstruction Methods Comparison

## Introduction

As part of my PreserveMy.World learning journey, I researched different 3D reconstruction techniques and completed a practical Tiny NeRF experiment. I also explored the Structure from Motion (SfM) pipeline to understand how classical computer vision differs from modern AI-based reconstruction.

---

# 1. Structure from Motion (SfM)

### What is it?

Structure from Motion (SfM) is a traditional computer vision technique that reconstructs a 3D scene from multiple overlapping images.

### How it works

1. Detect important features in each image.
2. Match the same features across different images.
3. Estimate the camera positions.
4. Triangulate the matched points to build a sparse 3D point cloud.

### Advantages

* Works well with ordinary photographs.
* Faster than deep learning methods.
* Widely used in archaeology, mapping, and surveying.

### Limitations

* Reconstruction quality depends on accurate feature matching.
* Does not produce highly realistic novel views.

---

# 2. Neural Radiance Fields (NeRF)

### What is it?

NeRF is a deep learning approach that represents an entire 3D scene using a neural network instead of a mesh or point cloud.

### How it works

1. Capture many images of the same object or scene.
2. Use known camera positions.
3. Train a neural network to predict color and density at every point in 3D space.
4. Use volume rendering to generate new views of the scene.

### My Experiment

I successfully ran the Tiny NeRF notebook in Google Colab.

The experiment included:

* Positional Encoding
* Neural Network Training
* Ray Sampling
* Volume Rendering
* Rendering a 360° video of the reconstructed scene

### Advantages

* Produces highly realistic rendered images.
* Can generate viewpoints that were never photographed.

### Limitations

* Requires GPU acceleration.
* Training is much slower than traditional methods.

---

# 3. Gaussian Splatting

### What is it?

Gaussian Splatting is a modern 3D reconstruction technique that represents a scene using thousands of small 3D Gaussian primitives.

Instead of training a neural network for every query like NeRF, it stores the scene directly as Gaussian points, making rendering much faster.

### Advantages

* Real-time rendering.
* Excellent visual quality.
* Faster than NeRF after reconstruction.

### Limitations

* Still requires multiple images.
* More advanced implementation compared to SfM.

---

# Comparison

| Feature  | SfM                       | NeRF                        | Gaussian Splatting            |
| -------- | ------------------------- | --------------------------- | ----------------------------- |
| Approach | Classical Computer Vision | Deep Learning               | Gaussian Scene Representation |
| Input    | Multiple Images           | Images + Camera Poses       | Multiple Images               |
| Output   | Sparse 3D Point Cloud     | Neural Scene Representation | 3D Gaussian Model             |
| Speed    | Fast                      | Slow Training               | Fast Rendering                |
| Hardware | CPU/GPU                   | GPU Recommended             | GPU Recommended               |
| Best For | Mapping & Reconstruction  | Photorealistic Rendering    | Interactive 3D Viewing        |

---

# What I Learned

From this week's work I learned that:

* SfM reconstructs geometry using image feature matching.
* NeRF learns an entire scene using a neural network.
* Gaussian Splatting is a newer technique that focuses on fast rendering while maintaining high visual quality.
* Different reconstruction methods are suitable for different applications depending on speed and quality requirements.

---

# Application to PreserveMy.World

These techniques can help PreserveMy.World digitally preserve historical buildings, monuments, and cultural heritage sites.

* **SfM** can generate an initial 3D model from photographs.
* **NeRF** can create highly realistic views of heritage sites.
* **Gaussian Splatting** can allow visitors to explore reconstructed sites interactively in real time.
