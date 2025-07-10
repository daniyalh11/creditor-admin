import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { Pencil, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AboutSettings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your about settings have been updated successfully."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 animate-fade-in">
          <PageHeader 
            title="About Settings" 
            description="Manage institution information and details"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold text-gray-900">Institution Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative max-w-md mx-auto md:mx-0">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-24 rounded-t-xl flex items-center justify-center shadow-sm">
                      <div className="text-white text-xl font-bold">Creditor Academy</div>
                    </div>
                    <div className="border border-t-0 rounded-b-xl p-6 bg-white">
                      <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-xl w-24 h-24 flex items-center justify-center -mt-16 border-4 border-white shadow-lg">
                          <div className="text-2xl font-bold text-blue-600">CA</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-medium">
                          <a href="https://www.creditoracademy.com" className="flex items-center hover:text-blue-700 transition-colors">
                            <Globe className="h-4 w-4 mr-2" />
                            creditoracademy.com
                          </a>
                          <div className="text-xs text-gray-500 mt-1">(original url)</div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold text-gray-900">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="text-gray-700">
                      <span className="font-medium text-gray-900">Portal ID:</span>
                      <span className="ml-2">30389</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900 text-lg">Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-sm font-medium text-gray-700">Language</Label>
                        <Input id="language" defaultValue="English (US)" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-sm font-medium text-gray-700">Time zone</Label>
                        <Input id="timezone" defaultValue="(GMT-08:00) Pacific Time (US & Canada)" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-lg">Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                        <Input id="email" placeholder="Enter contact email" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fax" className="text-sm font-medium text-gray-700">Fax</Label>
                        <Input id="fax" placeholder="Enter fax number" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
                        <Input id="address" defaultValue="WA, United States" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end border-t border-gray-100">
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-sm border border-gray-200 rounded-xl h-fit">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Edtech Support', 'Farah Javed', 'PaulMichael Rowland', 'Samir Kumar', 'counselor Creditor'].map((admin, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                        <span className="font-medium text-sm text-white">
                          {admin.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{admin}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;