"use client";

import React, { useState, useMemo } from 'react';
import { wellnessContentData, WellnessContent } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Video, FileText } from 'lucide-react';

const CATEGORY_FILTERS = ['All', 'Nutrition', 'Sleep', 'Health & Safety', 'Development'];
const AGE_FILTERS = ['All Ages', 'Newborn (0-3m)', 'Infant (4-12m)', 'Toddler (1-3y)'];

export default function WellnessHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAge, setActiveAge] = useState('All Ages');
  const [selectedItem, setSelectedItem] = useState<WellnessContent | null>(null);

  const filteredContent = useMemo(() => {
    return wellnessContentData.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesAge = activeAge === 'All Ages' || item.ageGroup === activeAge;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesAge && matchesSearch;
    });
  }, [searchQuery, activeCategory, activeAge]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Parenting Wellness Hub</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Your trusted resource for tips, guides, and expert advice on nurturing a healthy, happy baby.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="my-8 flex flex-col gap-6 p-6 bg-muted/50 rounded-lg border">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for topics like 'sleep', 'feeding', 'safety'..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-semibold mr-2">Category:</span>
            {CATEGORY_FILTERS.map(filter => (
              <Button
                key={filter}
                size="sm"
                variant={activeCategory === filter ? 'default' : 'outline'}
                onClick={() => setActiveCategory(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-semibold mr-2">Age:</span>
            {AGE_FILTERS.map(filter => (
              <Button
                key={filter}
                size="sm"
                variant={activeAge === filter ? 'default' : 'outline'}
                onClick={() => setActiveAge(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.length > 0 ? (
          filteredContent.map(item => (
            <Card 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="flex flex-col h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <img src={item.thumbnail} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 p-1 rounded bg-black/50">
                    {item.type === 'video' ? <Video className="h-5 w-5 text-white"/> : <FileText className="h-5 w-5 text-white"/>}
                  </div>
                </div>
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardContent className="p-0 flex-grow">
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
                <CardFooter className="p-0 pt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge variant="outline">{item.ageGroup}</Badge>
                </CardFooter>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg font-medium">No Content Found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Modal for Viewing Content */}
      <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">{selectedItem.category}</Badge>
                    <Badge variant="outline">{selectedItem.ageGroup}</Badge>
                </div>
              </DialogHeader>
              {selectedItem.type === 'video' ? (
                <div className="aspect-video mt-4">
                  <iframe
                    className="w-full h-full"
                    src={selectedItem.content}
                    title={selectedItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="prose dark:prose-invert mt-4" dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
