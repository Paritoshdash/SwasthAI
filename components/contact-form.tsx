"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, User, Mail, MessageSquare, FileText, CheckCircle2, Loader2 } from "lucide-react";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Simulate API call with loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }
      
      toast.success("Message sent successfully! We will get back to you soon.");
      setIsSubmitted(true);
      form.reset();
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-2 border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-green-600 animate-scale-in" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-green-600">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-muted/50 bg-gradient-to-b from-background to-muted/20">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Get In Touch
        </CardTitle>
        <CardDescription className="text-base">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
        
      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name please"
                        {...field}
                        className="h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary group-hover:shadow-md"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="email please" 
                        {...field}
                        className="h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary group-hover:shadow-md"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Regarding project query..." 
                      {...field}
                      className="h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary group-hover:shadow-md"
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    Your Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can help you with your health journey..."
                      className="resize-none rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary group-hover:shadow-md min-h-[120px] text-sm"
                      rows={5}
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
              size="lg"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Query
                </>
              )}
            </Button>
            
            {/* Character count for message */}
            <div className="text-right">
              <p className={`text-xs ${
                form.watch("message")?.length < 10 
                  ? "text-muted-foreground" 
                  : "text-green-600 font-medium"
              }`}>
                {form.watch("message")?.length || 0} / 10 characters minimum
              </p>
            </div>
          </form>
        </Form>
        
        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Quick Response</h4>
              <p className="text-xs text-muted-foreground">Within 24 hours</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Support</h4>
              <p className="text-xs text-muted-foreground">24/7 available</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Privacy</h4>
              <p className="text-xs text-muted-foreground">Your data is secure</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}