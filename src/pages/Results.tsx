
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, ArrowLeft, Syringe, Check, Info, ThumbsUp } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface DiseaseData {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  organicTreatments: string[];
  conventionalTreatments: string[];
  preventionTips: string[];
}

interface LocationState {
  image: string;
  diseaseData: DiseaseData;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, diseaseData } = (location.state as LocationState) || { image: null, diseaseData: null };

  // If no data is passed, redirect to home
  if (!image || !diseaseData) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-green-100 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-300">
                Your Plant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={image} 
                alt="Uploaded plant" 
                className="w-full h-64 object-contain rounded-lg border border-green-200 dark:border-green-800"
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg border-green-100 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-300">
                Diagnosis Results
              </CardTitle>
              <CardDescription>
                We've analyzed your plant image
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/50">
                <h3 className="font-bold text-lg text-green-800 dark:text-green-300 mb-1">
                  {diseaseData.name}
                </h3>
                <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-2">
                  {diseaseData.scientificName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {diseaseData.description}
                </p>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Info className="mr-2 h-4 w-4" />
                    View Symptoms
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Symptoms of {diseaseData.name}</SheetTitle>
                    <SheetDescription>
                      Common signs to look for
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {diseaseData.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p>{symptom}</p>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-lg border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-300">
              Treatment Options
            </CardTitle>
            <CardDescription>
              Choose between organic and conventional treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="organic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="organic">
                  <Leaf className="mr-2 h-4 w-4" />
                  Organic Solutions
                </TabsTrigger>
                <TabsTrigger value="conventional">
                  <Syringe className="mr-2 h-4 w-4" />
                  Conventional Solutions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="organic">
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h3 className="font-medium text-green-700 dark:text-green-300">Benefits of Organic Treatment</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Organic treatments are environmentally friendly, generally safer for beneficial insects, and don't leave harmful chemical residues.
                    </p>
                  </div>

                  <h3 className="font-medium text-green-700 dark:text-green-300 mt-4">Recommended Organic Treatments:</h3>
                  <ul className="space-y-3">
                    {diseaseData.organicTreatments.map((treatment, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="conventional">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-medium text-blue-700 dark:text-blue-300">About Conventional Treatments</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Conventional treatments often work more quickly and may be more effective for severe infestations. Always follow label instructions carefully.
                    </p>
                  </div>

                  <h3 className="font-medium text-blue-700 dark:text-blue-300 mt-4">Recommended Conventional Treatments:</h3>
                  <ul className="space-y-3">
                    {diseaseData.conventionalTreatments.map((treatment, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-3">Prevention Tips:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {diseaseData.preventionTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Results;
