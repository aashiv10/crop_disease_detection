
package app.lovable.plantdiseasedetector;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.google.android.material.tabs.TabLayout;

public class ResultsActivity extends AppCompatActivity {
    
    // Sample disease data arrays
    private final String[] diseaseNames = {
        "Tomato Late Blight", 
        "Powdery Mildew", 
        "Black Spot"
    };
    
    private final String[] scientificNames = {
        "Phytophthora infestans",
        "Various fungi, including Erysiphe spp.",
        "Diplocarpon rosae"
    };
    
    private final String[] descriptions = {
        "A destructive disease affecting tomatoes and potatoes. It causes dark, water-soaked spots on leaves that rapidly enlarge and turn brown.",
        "A fungal disease that affects a wide range of plants, causing a white powdery coating on leaves, stems, and sometimes fruits.",
        "A common fungal disease primarily affecting roses, causing black spots on leaves and eventual defoliation."
    };
    
    private final String[][] symptoms = {
        {
            "Dark brown spots on leaves with pale green borders",
            "White fungal growth on undersides of leaves in humid conditions",
            "Brown lesions on stems",
            "Firm, dark, greasy-looking spots on fruits"
        },
        {
            "White powdery patches on leaf surfaces",
            "Yellowing or browning of leaves",
            "Stunted or distorted new growth",
            "Premature leaf drop"
        },
        {
            "Circular black spots with fringed margins on leaves",
            "Yellowing of leaves around the spots",
            "Premature leaf drop",
            "Reduced plant vigor and flowering"
        }
    };
    
    private final String[][] organicTreatments = {
        {
            "Remove and destroy infected plants",
            "Apply copper-based fungicides",
            "Use compost tea spray",
            "Rotate crops annually"
        },
        {
            "Spray with diluted milk solution (1:10 ratio)",
            "Apply neem oil or potassium bicarbonate",
            "Use sulfur-based organic fungicides",
            "Spray with compost tea"
        },
        {
            "Apply compost tea as a preventative",
            "Spray with baking soda solution (1 tsp in 1 quart water with drops of soap)",
            "Use neem oil treatments",
            "Apply sulfur-based organic fungicides"
        }
    };
    
    private final String[][] conventionalTreatments = {
        {
            "Apply chlorothalonil fungicide",
            "Use mancozeb or maneb sprays",
            "Apply metalaxyl-based fungicides",
            "Treat with azoxystrobin for control"
        },
        {
            "Apply triadimefon fungicide",
            "Use myclobutanil sprays",
            "Treat with propiconazole products",
            "Apply trifloxystrobin for severe cases"
        },
        {
            "Treat with chlorothalonil fungicide",
            "Apply myclobutanil products",
            "Use trifloxystrobin fungicides",
            "Spray with tebuconazole for control"
        }
    };
    
    private final String[][] preventionTips = {
        {
            "Space plants for good air circulation",
            "Water at the base of plants, not the leaves",
            "Remove lower leaves that touch the ground",
            "Use disease-resistant varieties when available"
        },
        {
            "Ensure good air circulation around plants",
            "Avoid overhead watering",
            "Remove and destroy infected plant parts",
            "Choose resistant varieties when possible"
        },
        {
            "Remove fallen leaves promptly",
            "Prune for good air circulation",
            "Water at the base, avoiding leaf wetness",
            "Plant resistant rose varieties"
        }
    };
    
    private TextView diseaseNameTextView;
    private TextView scientificNameTextView;
    private TextView descriptionTextView;
    private CardView organicTreatmentsCard;
    private CardView conventionalTreatmentsCard;
    private TextView[] organicTreatmentViews = new TextView[4];
    private TextView[] conventionalTreatmentViews = new TextView[4];
    private TextView[] preventionTipViews = new TextView[4];

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_results);
        
        // Get disease index from intent
        int diseaseIndex = getIntent().getIntExtra("DISEASE_INDEX", 0);
        
        // Initialize views
        Button backButton = findViewById(R.id.backButton);
        diseaseNameTextView = findViewById(R.id.diseaseNameTextView);
        scientificNameTextView = findViewById(R.id.scientificNameTextView);
        descriptionTextView = findViewById(R.id.descriptionTextView);
        
        TabLayout treatmentTabs = findViewById(R.id.treatmentTabs);
        organicTreatmentsCard = findViewById(R.id.organicTreatmentsCard);
        conventionalTreatmentsCard = findViewById(R.id.conventionalTreatmentsCard);
        
        // Initialize treatment text views
        for (int i = 0; i < 4; i++) {
            int organicId = getResources().getIdentifier("organicTreatment" + (i+1), "id", getPackageName());
            int conventionalId = getResources().getIdentifier("conventionalTreatment" + (i+1), "id", getPackageName());
            int preventionId = getResources().getIdentifier("preventionTip" + (i+1), "id", getPackageName());
            
            organicTreatmentViews[i] = findViewById(organicId);
            conventionalTreatmentViews[i] = findViewById(conventionalId);
            preventionTipViews[i] = findViewById(preventionId);
        }
        
        // Display disease information
        displayDiseaseInfo(diseaseIndex);
        
        // Set up treatment tabs
        treatmentTabs.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if (tab.getPosition() == 0) {
                    organicTreatmentsCard.setVisibility(View.VISIBLE);
                    conventionalTreatmentsCard.setVisibility(View.GONE);
                } else {
                    organicTreatmentsCard.setVisibility(View.GONE);
                    conventionalTreatmentsCard.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {}

            @Override
            public void onTabReselected(TabLayout.Tab tab) {}
        });
        
        // Set up back button
        backButton.setOnClickListener(v -> finish());
    }
    
    private void displayDiseaseInfo(int index) {
        // Set disease details
        diseaseNameTextView.setText(diseaseNames[index]);
        scientificNameTextView.setText(scientificNames[index]);
        descriptionTextView.setText(descriptions[index]);
        
        // Set treatments
        for (int i = 0; i < 4; i++) {
            organicTreatmentViews[i].setText(organicTreatments[index][i]);
            conventionalTreatmentViews[i].setText(conventionalTreatments[index][i]);
            preventionTipViews[i].setText(preventionTips[index][i]);
        }
    }
}
