
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // In a real app, you would send this data to your backend
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We'll respond as soon as possible.",
    });
    
    // Reset the form
    (event.target as HTMLFormElement).reset();
  };
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
      <p className="text-lg text-muted-foreground">
        Have questions, feedback, or suggestions? We'd love to hear from you.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Get In Touch</CardTitle>
            <CardDescription>Fill out the form below to send us a message.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" rows={5} placeholder="Your message..." required />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
            <CardDescription>Connect with us through multiple channels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-base">Email</h3>
                <p className="text-muted-foreground">support@stadscore.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-base">Customer Support</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground text-sm mt-1">Monday to Friday: 9am - 5pm</p>
              </div>
              <div>
                <h3 className="font-semibold text-base">Office Address</h3>
                <p className="text-muted-foreground">
                  123 Football Street<br />
                  Scoretown, SC 12345<br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-base">Social Media</h3>
                <div className="flex gap-4 mt-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">X</Button>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">F</Button>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">I</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How often are live scores updated?</h3>
              <p className="text-muted-foreground">Our live scores are updated in near real-time, with delays typically under 30 seconds.</p>
            </div>
            <div>
              <h3 className="font-semibold">Which leagues do you cover?</h3>
              <p className="text-muted-foreground">We cover all major football leagues worldwide, including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and many more.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is Stadscore available as a mobile app?</h3>
              <p className="text-muted-foreground">Currently, Stadscore is available as a mobile-optimized website. We're working on dedicated iOS and Android apps coming soon.</p>
            </div>
            <div>
              <h3 className="font-semibold">How can I advertise on Stadscore?</h3>
              <p className="text-muted-foreground">For advertising inquiries, please contact us at advertising@stadscore.com with details about your company and goals.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
