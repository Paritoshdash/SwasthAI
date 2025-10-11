"use client";

import { useState } from "react";
import { pregnancyCareContent, pregnancyDosAndDonts } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle2, XCircle } from "lucide-react";

type Content = typeof pregnancyCareContent[0];

/**
 * A component that provides a comprehensive guide for pregnancy, 
 * including do's and don'ts, and resources filtered by trimester.
 */
export function PregnancyGuide() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredContent = pregnancyCareContent.filter(
    (item) => activeTab === "All" || item.trimester === activeTab || item.trimester === "All"
  );

  /**
   * Renders a card for a given content item (video or article).
   * @param item - The content item to render.
   */
  const renderContentCard = (item: Content) => {
    if (item.type === 'video') {
      return (
        <Card key={item.id} className="w-full overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
            <CardDescription className="text-xs line-clamp-2">{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={item.source}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md w-full h-full"
              ></iframe>
            </AspectRatio>
          </CardContent>
        </Card>
      );
    }
    return (
      <Card key={item.id} className="w-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{item.content}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Your Pregnancy Care Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Find trusted resources, tutorials, and support for every stage of your pregnancy journey.
        </p>
      </header>
      
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Essential Do's and Don'ts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/50 bg-green-50/20 dark:bg-green-900/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-400">
                        <CheckCircle2 /> What you should do
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {pregnancyDosAndDonts.dos.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card className="border-red-500/50 bg-red-50/20 dark:bg-red-900/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-red-700 dark:text-red-400">
                        <XCircle /> What to avoid
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {pregnancyDosAndDonts.donts.map((item, index) => (
                             <li key={index} className="flex items-start gap-3">
                                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Resources by Trimester</h2>
        <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="First Trimester">First Trimester</TabsTrigger>
            <TabsTrigger value="Second Trimester">Second Trimester</TabsTrigger>
            <TabsTrigger value="Third Trimester">Third Trimester</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
             {/* Changed grid columns and gap for smaller cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredContent.length > 0 ? (
                    filteredContent.map(renderContentCard)
                ) : (
                    <p className="col-span-full text-center text-muted-foreground py-10">
                        No resources available for this trimester yet.
                    </p>
                )}
             </div>
          </div>
        </Tabs>
      </section>
    </div>
  );
}