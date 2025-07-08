
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Send, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmailSettings = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const { toast } = useToast();
  
  const handleDisable = () => {
    toast({
      title: "Email integration disabled",
      description: "The email integration has been disabled successfully.",
      duration: 3000,
    });
  };
  
  const handleSendTest = () => {
    toast({
      title: "Test message sent",
      description: "A test email has been sent to your configured address.",
      duration: 3000,
    });
  };
  
  const handleClear = () => {
    toast({
      title: "Statistics cleared",
      description: "Email statistics have been reset successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Email" 
        description="Configure email settings and connections"
      />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex space-x-2 p-2 bg-gray-50 border-b border-gray-100 rounded-t-lg">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger 
                value="summary" 
                className="rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger 
                value="configure" 
                className="rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Configure
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="summary" className="mt-0 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Status</h3>
                <p>Integration with your own email server is currently enabled.</p>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleDisable}
                >
                  <X className="h-4 w-4" /> Disable
                </Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Alerts</h3>
                <Card className="p-4 border-l-4 border-amber-500 bg-amber-50">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Your POP3 integration has been automatically disabled because of the large number of read errors. 
                      This indicates that your POP3 settings are not correct. To re-enable your POP3 integration, update the settings to their correct values.
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Statistics</h3>
                <p>Here are your email statistics.</p>
                
                <div className="space-y-2">
                  <p className="text-sm">Statistics started at: Thu Apr 3, 1:51 am</p>
                  <p className="text-sm">Emails sent: 7696</p>
                  <p className="text-sm">Email sent errors: 14839</p>
                  <p className="text-sm">Email retries: 85646</p>
                  <p className="text-sm">Last sent at: Mon May 19, 3:03 am</p>
                  <p className="text-sm">Last error for email sent at: Mon May 19, 3:26 am</p>
                  <p className="text-sm">Last error for email sent: Net::SMTPAuthenticationError: 454-4.7.0 Too many login attempts, please try again later. For more information, [/home/edu20/rbenv/versions/2.4.10/lib/ruby/2.4.0/net/smtp.rb:981:in `check_auth_response' /home/edu20/rbenv/versions/2.4.10/lib/ruby/2.4.0/net/smtp.rb:736:in `auth_plain' /home/edu20/rbenv/versions/2.4.10/lib/ruby/2.4.0/net/smtp.rb:728:in `authenticate'...</p>
                  <p className="text-sm">Emails read: 0</p>
                  <p className="text-sm">Email read errors: 0</p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" /> Clear
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 flex justify-between items-center pt-6 border-t border-gray-100">
                <div>Contact</div>
                <div>Powered by CYPHER Learning</div>
              </div>
            </TabsContent>
            
            <TabsContent value="configure" className="mt-0">
              <h2 className="text-xl font-medium mb-6">Configure</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md">
                  <div className="font-medium">Setting</div>
                  <div className="font-medium">Value</div>
                  
                  <div>Delivery Method</div>
                  <div>SMTP</div>
                  
                  <div>User</div>
                  <div>arya</div>
                  
                  <div>Password</div>
                  <div>******************</div>
                  
                  <div>Domain</div>
                  <div>creditoracademy.com</div>
                  
                  <div>SMTP server</div>
                  <div>smtp.gmail.com</div>
                  
                  <div>SMTP port</div>
                  <div>25</div>
                  
                  <div>SMTP authentication</div>
                  <div>Plain</div>
                  
                  <div>Use TLS for SMTP?</div>
                  <div className="text-green-500">✓</div>
                  
                  <div>Supports address tags?</div>
                  <div className="text-green-500">✓</div>
                  
                  <div>POP3 User</div>
                  <div>arya</div>
                  
                  <div>POP3 Password</div>
                  <div>******************</div>
                  
                  <div>POP3 Domain</div>
                  <div>creditoracademy.com</div>
                  
                  <div>POP3 Server</div>
                  <div>pop.gmail.com</div>
                  
                  <div>POP3 Port</div>
                  <div>995</div>
                  
                  <div>POP3 Polling</div>
                  <div>5 minutes</div>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleDisable}>
                    <X className="h-4 w-4" /> Disable
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleSendTest}>
                    <Send className="h-4 w-4" /> Send test message
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500 flex justify-between items-center pt-6 border-t border-gray-100">
                  <div>Contact</div>
                  <div>Powered by CYPHER Learning</div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailSettings;
