
# Plant Disease Detector - Android App

This is a native Android application that allows users to identify plant diseases by taking or uploading photos of affected plants. The app analyzes the images and provides diagnoses along with treatment recommendations.

## Features

- Take photos using the device camera
- Upload images from the gallery
- Analyze plant images to detect diseases
- View detailed disease information and symptoms
- Get both organic and conventional treatment recommendations
- View prevention tips to avoid future infections

## Setup Instructions

1. Clone this repository
2. Open the project in Android Studio
3. Sync Gradle files
4. Run the app on an emulator or physical device

## Requirements

- Android Studio Iguana (2023.2.1) or newer
- Minimum SDK version: 24 (Android 7.0 Nougat)
- Target SDK version: 34 (Android 14)

## Project Structure

- `MainActivity.java`: Handles the image capture and upload functionality
- `ResultsActivity.java`: Displays the analysis results and treatment options
- `res/layout`: XML layout files for the UI
- `res/drawable`: Various drawable resources including icons and backgrounds
- `res/values`: Colors, strings, and themes

## Permissions

The app requires the following permissions:
- Camera access for taking photos
- Storage access for reading images from the gallery
