
package app.lovable.plantdiseasedetector;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    private static final int REQUEST_IMAGE_CAPTURE = 1;
    private static final int REQUEST_PICK_IMAGE = 2;
    private static final int PERMISSION_REQUEST_CAMERA = 100;
    private static final int PERMISSION_REQUEST_STORAGE = 101;
    
    private ImageView plantImageView;
    private Button cameraButton;
    private Button galleryButton;
    private Button analyzeButton;
    private TextView statusTextView;
    private Bitmap selectedImage;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize views
        plantImageView = findViewById(R.id.plantImageView);
        cameraButton = findViewById(R.id.cameraButton);
        galleryButton = findViewById(R.id.galleryButton);
        analyzeButton = findViewById(R.id.analyzeButton);
        statusTextView = findViewById(R.id.statusTextView);
        
        // Set up click listeners
        cameraButton.setOnClickListener(view -> {
            if (checkCameraPermission()) {
                openCamera();
            } else {
                requestCameraPermission();
            }
        });
        
        galleryButton.setOnClickListener(view -> {
            if (checkStoragePermission()) {
                openGallery();
            } else {
                requestStoragePermission();
            }
        });
        
        analyzeButton.setOnClickListener(view -> {
            if (selectedImage != null) {
                analyzeImage();
            } else {
                Toast.makeText(MainActivity.this, "Please select an image first", Toast.LENGTH_SHORT).show();
            }
        });
        
        // Initially disable analyze button
        analyzeButton.setEnabled(false);
    }
    
    private boolean checkCameraPermission() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
    }
    
    private void requestCameraPermission() {
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, PERMISSION_REQUEST_CAMERA);
    }
    
    private boolean checkStoragePermission() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) == PackageManager.PERMISSION_GRANTED;
        } else {
            return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
        }
    }
    
    private void requestStoragePermission() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_MEDIA_IMAGES}, PERMISSION_REQUEST_STORAGE);
        } else {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, PERMISSION_REQUEST_STORAGE);
        }
    }
    
    private void openCamera() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }
    
    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, REQUEST_PICK_IMAGE);
    }
    
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case PERMISSION_REQUEST_CAMERA:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    openCamera();
                } else {
                    Toast.makeText(this, "Camera permission is required", Toast.LENGTH_SHORT).show();
                }
                break;
            case PERMISSION_REQUEST_STORAGE:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    openGallery();
                } else {
                    Toast.makeText(this, "Storage permission is required", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            if (requestCode == REQUEST_IMAGE_CAPTURE && data != null) {
                Bundle extras = data.getExtras();
                if (extras != null) {
                    selectedImage = (Bitmap) extras.get("data");
                    plantImageView.setImageBitmap(selectedImage);
                    analyzeButton.setEnabled(true);
                    statusTextView.setText("Image captured. Ready to analyze.");
                }
            } else if (requestCode == REQUEST_PICK_IMAGE && data != null) {
                Uri selectedImageUri = data.getData();
                try {
                    selectedImage = MediaStore.Images.Media.getBitmap(this.getContentResolver(), selectedImageUri);
                    plantImageView.setImageBitmap(selectedImage);
                    analyzeButton.setEnabled(true);
                    statusTextView.setText("Image selected. Ready to analyze.");
                } catch (IOException e) {
                    e.printStackTrace();
                    Toast.makeText(this, "Failed to load image", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
    
    private void analyzeImage() {
        statusTextView.setText("Analyzing image...");
        analyzeButton.setEnabled(false);
        
        // Simulate analysis delay
        plantImageView.postDelayed(() -> {
            // Open results activity
            Intent intent = new Intent(MainActivity.this, ResultsActivity.class);
            // We would typically pass the image and analysis data here
            // For simplicity, we'll just pass a random disease index
            int randomDiseaseIndex = (int) (Math.random() * 3); // 0-2 for our sample diseases
            intent.putExtra("DISEASE_INDEX", randomDiseaseIndex);
            startActivity(intent);
            
            // Re-enable button
            analyzeButton.setEnabled(true);
            statusTextView.setText("Ready to analyze another image");
        }, 2000);
    }
}
