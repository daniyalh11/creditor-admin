
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ClipboardList, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';

const PlansSettings = () => {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Plans" 
        description="Manage subscription plans and monitor active users"
        icon={<ClipboardList className="h-6 w-6 text-primary" />}
      />
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="border-b">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center px-4 bg-white">
                <TabsList className="bg-transparent h-12 p-0 w-full justify-start">
                  <TabsTrigger
                    value="status"
                    className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                  >
                    Status
                  </TabsTrigger>
                  <TabsTrigger
                    value="active-learners"
                    className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                  >
                    Active learners
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>

          {activeTab === 'status' && (
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-gray-600">Trial: Free for the next 104 days</p>
                <p className="text-gray-600">This month: 290 active learners</p>
              </div>
              
              <div className="bg-blue-500 text-white p-6 rounded-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="bg-pink-400 w-24 h-32 rounded-md"></div>
                    <div className="bg-yellow-400 w-24 h-32 rounded-md"></div>
                    <div className="bg-teal-400 w-24 h-32 rounded-md"></div>
                  </div>
                </div>
                
                <div className="absolute right-0 bottom-0">
                  <svg className="h-24 w-24 text-blue-300 opacity-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3L4 13 7 16 17 6 14 3Z" fill="currentColor"></path>
                    <path d="M17 6L14 3 16 1 19 4 17 6Z" fill="currentColor"></path>
                    <path d="M7 16L4 13 3 17 7 16Z" fill="currentColor"></path>
                  </svg>
                </div>
                
                <div className="relative z-10 max-w-2xl">
                  <p className="text-xl font-medium mb-6 mt-4">Enjoy the benefits of MATRIX with a <span className="font-bold">subscription</span>. Get in touch with one of our sales representatives and receive a <span className="font-bold">personalized quote</span> for your organization's needs.</p>
                  
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white border-none">
                    Request a quote
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-medium">What is included in a MATRIX subscription?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <LinkIcon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">Full technical support and access to our Help Center</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Unlimited storage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Learning paths</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Adaptive learning</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Customizable portal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Organizations and teams</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-2">And more. See a full list of <a href="#" className="text-blue-500 hover:underline">features included in a subscription</a>.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-medium">Get access to edtech services</h2>
                <p className="text-gray-600">Our team of edtech specialists is ready to assist you with a range of services for setting up the platform and implementing best practices.</p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Training</h3>
                      <p className="text-gray-600 mt-1">We deliver on-site and online training depending on your organization's needs. All our instructors are experts with our platform, and the training includes plenty of hands-on experience for you and your staff.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Implementation</h3>
                      <p className="text-gray-600 mt-1">Our EdTech team can help with every aspect of the implementation process, such as users and content migration, setting up your portal, creating accounts, setting up courses, and more.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Customization</h3>
                      <p className="text-gray-600 mt-1">We can help you customize many aspects of your portal to give it a more personalized look that matches your organization's identity.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white border-none">
                    Request a quote
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-medium">How do we charge?</h2>
                <p className="text-gray-600">
                  An active learner is a learner that logs into the LMS during the current monthly billing period. We only consider learner accounts, so instructor, manager and administrator accounts are not counted. If you go over your plan limit for the month, you can pay for each extra learner or upgrade your plan during the month to avoid over-plan charges.
                </p>
                
                <h2 className="text-2xl font-medium">Premium add-ons</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-pink-50 rounded-md p-2">
                        <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Skills development</h3>
                      <p className="text-gray-600 mt-1">Promote the mastery of skills and better learning outcomes using our intelligent features such as learning goals, recommendations, automation, and analytics.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-pink-50 rounded-md p-2">
                        <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Mastery & Skills</h3>
                      <p className="text-gray-600 mt-1">Comprehensive support for competency-based learning. Tag content with the competencies they teach, tag assessments with the competencies they measure, then track learner mastery across all courses.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-pink-50 rounded-md p-2">
                        <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">E-commerce</h3>
                      <p className="text-gray-600 mt-1">Our platform offers all the e-commerce tools you need to sell online courses, learning paths, digital media items, and more.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-pink-50 rounded-md p-2">
                        <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">SIS integration</h3>
                      <p className="text-gray-600 mt-1">Integrate with a wide variety of learner information systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'active-learners' && (
            <div className="p-6 space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Period</TableHead>
                    <TableHead className="w-1/3 text-center">Count</TableHead>
                    <TableHead className="w-1/3 text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Current</TableCell>
                    <TableCell className="text-center">290</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="text-sm text-gray-500 flex justify-between items-center p-4 border-t">
            <div>Contact</div>
            <div>Powered by CYPHER Learning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSettings;
