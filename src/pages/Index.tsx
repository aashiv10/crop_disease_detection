
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, FileImage, Info, Leaf } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the results page with the image data
      navigate("/results", { 
        state: { 
          image: selectedImage,
          // For demo purposes, we're sending a random disease from our sample data
          diseaseData: sampleDiseases[Math.floor(Math.random() * sampleDiseases.length)]
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
              <Leaf className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-400 mb-2">Plant Disease Detector</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Upload a photo of your plant to identify potential diseases and get treatment recommendations.
          </p>
        </header>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card className="shadow-lg border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-center text-xl text-green-700 dark:text-green-300">
                  Upload Plant Image
                </CardTitle>
                <CardDescription className="text-center">
                  Take a clear photo of the affected plant part for best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedImage ? (
                  <div className="relative border-2 border-dashed rounded-lg p-2 border-green-300 dark:border-green-700">
                    <img 
                      src={selectedImage} 
                      alt="Selected plant" 
                      className="w-full h-64 object-contain rounded-lg"
                    />
                    <Button 
                      className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 border-green-300 dark:border-green-700 text-center">
                    <div className="flex justify-center mb-4">
                      <FileImage className="h-12 w-12 text-green-500 opacity-70" />
                    </div>
                    <p className="text-green-700 dark:text-green-300 mb-2">Drag and drop an image, or click below</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Supports JPG, PNG and GIF (max 5MB)</p>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="w-full"
                    >
                      <FileImage className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => toast({
                      title: "Camera feature",
                      description: "The camera feature would be implemented in a real mobile app.",
                    })}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={analyzeImage}
                  disabled={!selectedImage || isLoading}
                >
                  {isLoading ? "Analyzing..." : "Analyze Plant"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="shadow-lg border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-center text-xl text-green-700 dark:text-green-300">
                  About Plant Disease Detector
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">How it works</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our app uses computer vision to identify common plant diseases from images. Simply upload a clear photo of the affected plant part, and we'll analyze it for potential issues.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">Supported Plants</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We currently can identify diseases in tomatoes, potatoes, peppers, corn, and several other common garden plants. More plants are being added regularly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Sample data for demonstration purposes
const sampleDiseases = [
  {
    id: 1,
    name: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    description: "A destructive disease affecting tomatoes and potatoes. It causes dark, water-soaked spots on leaves that rapidly enlarge and turn brown.",
    symptoms: [
      "Dark brown spots on leaves with pale green borders",
      "White fungal growth on undersides of leaves in humid conditions",
      "Brown lesions on stems",
      "Firm, dark, greasy-looking spots on fruits"
    ],
    organicTreatments: [
      "Remove and destroy infected plants",
      "Apply copper-based fungicides",
      "Use compost tea spray",
      "Rotate crops annually"
    ],
    conventionalTreatments: [
      "Apply chlorothalonil fungicide",
      "Use mancozeb or maneb sprays",
      "Apply metalaxyl-based fungicides",
      "Treat with azoxystrobin for control"
    ],
    preventionTips: [
      "Space plants for good air circulation",
      "Water at the base of plants, not the leaves",
      "Remove lower leaves that touch the ground",
      "Use disease-resistant varieties when available"
    ]
  },
  {
    id: 2,
    name: "Powdery Mildew",
    scientificName: "Various fungi, including Erysiphe spp.",
    description: "A fungal disease that affects a wide range of plants, causing a white powdery coating on leaves, stems, and sometimes fruits.",
    symptoms: [
      "White powdery patches on leaf surfaces",
      "Yellowing or browning of leaves",
      "Stunted or distorted new growth",
      "Premature leaf drop"
    ],
    organicTreatments: [
      "Spray with diluted milk solution (1:10 ratio)",
      "Apply neem oil or potassium bicarbonate",
      "Use sulfur-based organic fungicides",
      "Spray with compost tea"
    ],
    conventionalTreatments: [
      "Apply triadimefon fungicide",
      "Use myclobutanil sprays",
      "Treat with propiconazole products",
      "Apply trifloxystrobin for severe cases"
    ],
    preventionTips: [
      "Ensure good air circulation around plants",
      "Avoid overhead watering",
      "Remove and destroy infected plant parts",
      "Choose resistant varieties when possible"
    ]
  },
  {
    id: 3,
    name: "Black Spot",
    scientificName: "Diplocarpon rosae",
    description: "A common fungal disease primarily affecting roses, causing black spots on leaves and eventual defoliation.",
    symptoms: [
      "Circular black spots with fringed margins on leaves",
      "Yellowing of leaves around the spots",
      "Premature leaf drop",
      "Reduced plant vigor and flowering"
    ],
    organicTreatments: [
      "Apply compost tea as a preventative",
      "Spray with baking soda solution (1 tsp in 1 quart water with a few drops of soap)",
      "Use neem oil treatments",
      "Apply sulfur-based organic fungicides"
    ],
    conventionalTreatments: [
      "Treat with chlorothalonil fungicide",
      "Apply myclobutanil products",
      "Use trifloxystrobin fungicides",
      "Spray with tebuconazole for control"
    ],
    preventionTips: [
      "Remove fallen leaves promptly",
      "Prune for good air circulation",
      "Water at the base, avoiding leaf wetness",
      "Plant resistant rose varieties"
    ]
  }
];

export default Index;
