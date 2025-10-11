import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Clock, MessageCircle, Heart, Shield } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      {/* Enhanced Header Section */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
      
       
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Information Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Support Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">24/7 Support</p>
                  <p className="text-xs text-blue-700">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Email Response</p>
                  <p className="text-xs text-blue-700">Within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact Card */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Quick Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-sm text-green-900 mb-1">Email Support</p>
                <a 
                  href="mailto:support@swasthai.example" 
                  className="text-green-700 hover:text-green-800 transition-colors text-sm underline"
                >
                  support@swasthai.example
                </a>
              </div>
              <div>
                <p className="font-semibold text-sm text-green-900 mb-1">Emergency</p>
                <p className="text-green-700 text-sm">For urgent health matters</p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Your Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700">
                We take your privacy seriously. All information shared is encrypted and protected.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div className="lg:col-span-2">
          <CardContent>
              <ContactForm />
            </CardContent>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mt-12 lg:mt-16 border-t pt-8 lg:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm sm:text-base">
                For technical support, partnership inquiries, or general questions, 
                our team is always ready to assist you.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Response Time</p>
                <p className="text-sm">We typically respond to all inquiries within 24 hours.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="font-medium">Technical Support</span>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="font-medium">Feature Requests</span>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="font-medium">General Inquiries</span>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}