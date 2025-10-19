'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '../../hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription as AlertDesc, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Star, MapPin, AlertTriangle, CheckCircle2, Phone, Clock, Navigation, Search, Filter, Zap,
    Calendar as CalendarIcon, User, Mail, Video, PhoneOff, Mic, MicOff, VideoOff
} from 'lucide-react';
import dynamic from 'next/dynamic';
import type { EnrichedDoctor } from '../../lib/types';

// Dynamically import components that use Agora SDK
const VideoCallModal = dynamic(() => import('../../components/video-call-modal'), { 
  ssr: false,
  loading: () => <div>Loading video call...</div>
});

type ConsultationType = 'In-Person' | 'Video Call' | 'Phone Call';

interface AppointmentDetails {
  doctorName: string;
  specialty: string;
  patientName: string;
  date: Date;
  time: string;
  consultationType: ConsultationType;
}

// --- MAIN PAGE COMPONENT ---
export default function ConsultPage() {
  const [allDoctors, setAllDoctors] = useState<EnrichedDoctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<EnrichedDoctor[]>([]);
  const [specialty, setSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  
  const [selectedDoctor, setSelectedDoctor] = useState<EnrichedDoctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState<AppointmentDetails | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      // Only run on client side
      if (typeof window === 'undefined') return;
      
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setIsLoading(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          fetchDoctors(latitude, longitude);
        },
        () => {
          setError("Location access denied. Using default location.");
          fetchDoctors(21.3361, 83.6263); // Bargarh, Odisha coordinates
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    };
    getLocation();
  }, []);
  
  const fetchDoctors = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await fetch(`/api/nearby-doctors?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('Failed to fetch doctors data.');
      const data: EnrichedDoctor[] = await response.json();
      
      const enrichedData = data.map((doc, index) => ({
        ...doc,
        isOnline: Math.random() > 0.5,
        phone: `+917684940568${index % 10}`,
        hospital: doc.location // Use location as hospital for now
      }));

      setAllDoctors(enrichedData);
      setFilteredDoctors(enrichedData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const specialties = useMemo(() => ['All', ...new Set(allDoctors.map((doc) => doc.specialty))], [allDoctors]);

  useEffect(() => {
    let filtered = allDoctors;
    
    if (specialty !== 'All') {
      filtered = filtered.filter(doc => doc.specialty === specialty);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.specialty.toLowerCase().includes(query) ||
        doc.hospital?.toLowerCase().includes(query) ||
        doc.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredDoctors(filtered);
  }, [specialty, searchQuery, allDoctors]);

  const handleBookClick = (doctor: EnrichedDoctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };
  
  const handleStartVideoCall = (doctor: EnrichedDoctor) => {
    setSelectedDoctor(doctor);
    setIsVideoCallModalOpen(true);
  };
  
  const handleStartPhoneCall = (phone: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleBookingSuccess = (details: AppointmentDetails) => {
    setConfirmationDetails(details);
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
    setTimeout(() => setIsConfirmationOpen(true), 300);
  };

  const handleRetryLocation = () => {
    setError(null);
    setIsLoading(true);
    if (userLocation) {
      fetchDoctors(userLocation.lat, userLocation.lon);
    } else {
        fetchDoctors(21.3361, 83.6263);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <DoctorCardSkeleton key={i} />)}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="max-w-2xl mx-auto rounded-xl border-red-200 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <AlertTitle className="text-red-800">Location Access Error</AlertTitle>
              <AlertDesc className="text-red-700 flex flex-col gap-4 mt-2">
                <p>{error}</p>
                <Button onClick={handleRetryLocation} className="w-fit bg-red-600 hover:bg-red-700 text-white">
                  <Navigation className="h-4 w-4 mr-2" />
                  Retry Location
                </Button>
              </AlertDesc>
            </div>
          </div>
        </Alert>
      );
    }

    if (filteredDoctors.length === 0) {
      return (
        <div className="text-center py-16 bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20">
          <Search className="h-16 w-16 text-muted-foreground/60 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground/70 mb-2">No doctors found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onBookClick={handleBookClick}
            onVideoCallClick={handleStartVideoCall}
            onPhoneCallClick={handleStartPhoneCall}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl shadow-sm">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Find Your Doctor
          </h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Connect instantly via call or video, or book an appointment with top-rated specialists.
        </p>
      </header>

      <div className="mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search doctors, specialties..."
              className="pl-10 pr-4 h-12 rounded-xl border-2 border-muted/50 focus:border-primary/30 shadow-sm focus:shadow-md transition-all duration-300 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading || !!error}
            />
          </div>
          
          <div className="w-full sm:w-64">
            <Select onValueChange={setSpecialty} defaultValue="All" disabled={isLoading || !!error}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-muted/50 focus:border-primary/30 shadow-sm focus:shadow-md transition-all duration-300 bg-background">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2">
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec} className="text-sm rounded-lg">{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {userLocation && !error && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              Showing doctors near your location
            </p>
          </div>
        )}
      </div>
      
      {renderContent()}

      {selectedDoctor && (
        <>
          <BookingModal
            doctor={selectedDoctor}
            isOpen={isBookingModalOpen}
            onClose={handleCloseBookingModal}
            onBookingSuccess={handleBookingSuccess}
          />
          {typeof window !== 'undefined' && (
            <VideoCallModal 
              doctor={selectedDoctor}
              isOpen={isVideoCallModalOpen}
              onClose={() => setIsVideoCallModalOpen(false)}
            />
          )}
        </>
      )}

      {confirmationDetails && (
        <ConfirmationDialog
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          details={confirmationDetails}
        />
      )}
    </div>
  );
}

// --- DOCTOR CARD COMPONENT ---
function DoctorCard({ doctor, onBookClick, onVideoCallClick, onPhoneCallClick }: { 
    doctor: EnrichedDoctor; 
    onBookClick: (doctor: EnrichedDoctor) => void;
    onVideoCallClick: (doctor: EnrichedDoctor) => void;
    onPhoneCallClick: (phone: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="w-full flex flex-col overflow-hidden transition-all duration-300 ease-out group hover:shadow-xl border border-muted/50 hover:border-primary/30 bg-card rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex items-center flex-col p-6 pb-4 text-center relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="relative mb-4">
          <Avatar className="h-20 w-20 border-3 border-background shadow-md group-hover:scale-105 group-hover:border-primary/40 transition-all duration-300 z-10">
            <AvatarImage src={doctor.image} alt={doctor.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {doctor.isOnline && (
            <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 border-2 border-background ring-1 ring-green-500/50 z-20" title="Online now" />
          )}
        </div>
        
        <div className="flex-1 z-10 w-full">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">{doctor.name}</CardTitle>
          <CardDescription className="text-sm mt-1 font-medium text-muted-foreground">{doctor.specialty}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-6 pt-0 text-center space-y-3 z-10">
        <div className="flex items-center justify-center gap-2">
            <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 transition-transform duration-300 ${ i < Math.round(doctor.rating) ? 'fill-current group-hover:scale-110' : 'text-muted-foreground/30' }`} />
                ))}
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">({doctor.reviews} reviews)</span>
        </div>
        
        {(doctor.hospital || doctor.location) && (
          <div className="flex items-center justify-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{doctor.hospital || doctor.location}</span>
          </div>
        )}
        
        {doctor.distance && (
          <div className="flex items-center justify-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
            <Navigation className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{doctor.distance} km away</span>
          </div>
        )}
        
        <div className="flex items-center justify-center text-sm text-green-600 font-medium">
          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>Available Today</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-4 z-10 flex-col space-y-3">
        <div className="flex w-full gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onVideoCallClick(doctor)} 
              disabled={!doctor.isOnline} 
              className="h-11 w-11 flex-shrink-0 rounded-xl border-2 disabled:opacity-30 enabled:hover:bg-primary/10 enabled:hover:text-primary enabled:hover:border-primary/20 transition-all shadow-sm"
            >
                <Video className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onPhoneCallClick(doctor.phone!)} 
              disabled={!doctor.isOnline || !doctor.phone} 
              className="h-11 w-11 flex-shrink-0 rounded-xl border-2 disabled:opacity-30 enabled:hover:bg-primary/10 enabled:hover:text-primary enabled:hover:border-primary/20 transition-all shadow-sm"
            >
                <Phone className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => onBookClick(doctor)} 
              className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 group-hover:shadow-md active:scale-[0.98] font-semibold shadow-sm" 
              size="lg"
            >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Book
            </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {doctor.isOnline ? 'Call & Video available now' : 'Instant call is offline'}
        </p>
      </CardFooter>
    </Card>
  );
}

// --- BOOKING MODAL & FORM ---
function BookingModal({ doctor, isOpen, onClose, onBookingSuccess }: { doctor: EnrichedDoctor; isOpen: boolean; onClose: () => void; onBookingSuccess: (details: AppointmentDetails) => void; }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl border-2">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Avatar className="h-12 w-12 border-2">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="font-medium">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold">Book with {doctor.name}</div>
              <div className="text-sm font-normal text-muted-foreground">{doctor.specialty}</div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-left pt-2">
            Please fill in your details below to schedule your consultation.
          </DialogDescription>
        </DialogHeader>
        <BookingForm doctor={doctor} onClose={onClose} onBookingSuccess={onBookingSuccess} />
      </DialogContent>
    </Dialog>
  );
}

function BookingForm({ doctor, onClose, onBookingSuccess }: { doctor: EnrichedDoctor; onClose: () => void; onBookingSuccess: (details: AppointmentDetails) => void; }) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState('');
  const [patientName, setPatientName] = React.useState('');
  const [patientContact, setPatientContact] = React.useState('');
  const [consultationType, setConsultationType] = React.useState<ConsultationType>('In-Person');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !patientName || !patientContact) {
      toast({ 
        title: "Missing Information", 
        description: "Please fill out all fields to book your appointment.", 
        variant: "destructive" 
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          doctorId: doctor.id, 
          doctorName: doctor.name, 
          date: date.toISOString().split('T')[0],
          time, 
          patientName, 
          patientContact, 
          consultationType,
        }),
      });

      if (!response.ok) throw new Error('Failed to book appointment');
      
      onBookingSuccess({
        doctorName: doctor.name, 
        specialty: doctor.specialty, 
        patientName,
        date: date!, 
        time, 
        consultationType,
      });

    } catch (error) {
      toast({ 
        title: "Booking Failed", 
        description: "Could not book appointment. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 py-4">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />Full Name
          </Label>
          <Input 
            id="name" 
            value={patientName} 
            onChange={(e) => setPatientName(e.target.value)} 
            className="h-12 rounded-xl border-2" 
            placeholder="Enter your full name" 
            disabled={isLoading} 
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="contact" className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />Contact Information
          </Label>
          <Input 
            id="contact" 
            value={patientContact} 
            onChange={(e) => setPatientContact(e.target.value)} 
            className="h-12 rounded-xl border-2" 
            placeholder="Your phone number or email" 
            disabled={isLoading} 
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm font-medium flex items-center gap-2">Consultation Type</Label>
        <RadioGroup 
          defaultValue="In-Person" 
          className="grid grid-cols-3 gap-3" 
          onValueChange={(value: ConsultationType) => setConsultationType(value)}
        >
          <div>
            <RadioGroupItem value="In-Person" id="r1" className="peer sr-only" />
            <Label 
              htmlFor="r1" 
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer text-center text-sm"
            >
              In-Person
            </Label>
          </div>
          <div>
            <RadioGroupItem value="Video Call" id="r2" className="peer sr-only" />
            <Label 
              htmlFor="r2" 
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer text-center text-sm"
            >
              Video Call
            </Label>
          </div>
          <div>
            <RadioGroupItem value="Phone Call" id="r3" className="peer sr-only" />
            <Label 
              htmlFor="r3" 
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer text-center text-sm"
            >
              Phone Call
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />Appointment Date
          </Label>
          <div className="flex justify-center border-2 rounded-xl p-4 bg-muted/10">
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={setDate} 
              className="rounded-md" 
              disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))} 
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />Preferred Time
          </Label>
          <Select onValueChange={setTime} value={time} disabled={isLoading}>
            <SelectTrigger className="h-12 rounded-xl border-2">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              {doctor.availability.map(slot => (
                <SelectItem key={slot} value={slot} className="text-sm rounded-lg">
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="h-12 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md active:scale-[0.98] font-semibold shadow-sm"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Booking...
          </>
        ) : (
          'Confirm Booking'
        )}
      </Button>
    </form>
  );
}

// --- CONFIRMATION DIALOG ---
function ConfirmationDialog({ isOpen, onClose, details }: { isOpen: boolean, onClose: () => void, details: AppointmentDetails }) {
  const formattedDate = new Date(details.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md mx-auto rounded-2xl border-2">
        <AlertDialogHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-green-600 animate-scale-in" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-foreground">
              Appointment Confirmed!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-muted-foreground">
              Your appointment has been successfully booked. Details below.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        
        <div className="my-6 space-y-4">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 space-y-3 border">
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />Patient:
              </span>
              <span className="font-semibold text-foreground">{details.patientName}</span>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Phone className="h-4 w-4" />Doctor:
              </span>
              <span className="font-semibold text-foreground text-right">
                {details.doctorName}
                <br/>
                <span className="text-sm text-muted-foreground">{details.specialty}</span>
              </span>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Zap className="h-4 w-4" />Type:
              </span>
              <span className="font-semibold text-foreground">{details.consultationType}</span>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />Date:
              </span>
              <span className="font-semibold text-foreground">{formattedDate}</span>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />Time:
              </span>
              <span className="font-semibold text-foreground">{details.time}</span>
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onClose} 
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md active:scale-[0.98] font-semibold shadow-sm"
          >
            Got it!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// --- SKELETON LOADER ---
function DoctorCardSkeleton() {
  return (
    <Card className="w-full flex flex-col animate-pulse border-2 border-muted/30 rounded-2xl overflow-hidden">
      <CardHeader className="flex items-center flex-col p-6 pb-4 text-center space-y-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-6 w-3/4 mx-auto rounded-lg" />
          <Skeleton className="h-4 w-1/2 mx-auto rounded-lg" />
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-6 pt-0 text-center space-y-3">
        <Skeleton className="h-5 w-32 mx-auto rounded-lg" />
        <Skeleton className="h-4 w-44 mx-auto rounded-lg" />
        <Skeleton className="h-4 w-36 mx-auto rounded-lg" />
      </CardContent>
      
      <CardFooter className="p-6 pt-4">
        <Skeleton className="h-11 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
}