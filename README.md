# Senior-Project-
This semester, I have the opportunity to develop a project of my choice. Building on my summer research on deepfake image detection, I plan to develop a related system that expands my knowledge and skills in artificial intelligence.

**Renee Ngari** | University of North Carolina at Charlotte  
College of Computing and Informatics | Undergraduate Research

## Overview
This project is a browser extension designed to help users identify manipulated or AI-generated images while browsing social media. The extension can be used across different social media platforms and allows users to check an image without leaving the website they are currently using.

The goal is to make deepfake and image manipulation detection easier and more accessible to everyday users. Instead of requiring users to upload an image to a separate website, the extension can analyze an image directly from a social media page and provide a simple result indicating whether the image is likely authentic, AI-generated, or manipulated.

### Key Features

Key Features
Image Detection: Uses a deepfake detection model to analyze images.
Browser Integration: Allows users to check images directly while browsing social media.
Authenticity Score: Provides a percentage-based prediction such as “82% likely AI-generated.”
Visual Feedback: Highlights areas of an image that may contain signs of manipulation.
Simple Results: Uses clear indicators such as Likely Authentic, Uncertain, or Likely Manipulated.

---

## Technology Stack

Python — AI model and image analysis
TensorFlow / PyTorch — Deepfake detection model
JavaScript — Browser extension functionality
HTML/CSS — Extension interface
Chrome Extension API — Browser integration
Computer Vision / Image Processing — Image preprocessing and analysis

---

## How It Works

1. Image Selection

When a user encounters an image on a supported social media website, they can right-click the image or select the Reality Check extension.

2. Image Preprocessing

The extension captures the selected image and prepares it for the detection model. The image can be resized, normalized, and processed to match the model's required input format.

3. Deepfake Detection

The processed image is sent to the AI detection model. The model analyzes visual patterns that may indicate that the image was generated or manipulated.
