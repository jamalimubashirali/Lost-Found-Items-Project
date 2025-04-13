import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, ArrowUpRight, Clock, CheckCircle, AlertTriangle, Bell, Filter, MoreHorizontal, Search, ArrowRight, Calendar, MapPin } from 'lucide-react';

const DashboardPage = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [quickReportOpen, setQuickReportOpen] = useState(false);

  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', lost: 24, found: 18 },
    { name: 'Feb', lost: 18, found: 22 },
    { name: 'Mar', lost: 28, found: 19 },
    { name: 'Apr', lost: 32, found: 24 },
    { name: 'May', lost: 26, found: 29 },
    { name: 'Jun', lost: 22, found: 20 },
    { name: 'Jul', lost: 30, found: 28 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Accessories', value: 25 },
    { name: 'Documents', value: 20 },
    { name: 'Keys', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const locationData = [
    { name: 'Library', count: 18 },
    { name: 'Cafeteria', count: 15 },
    { name: 'Parking', count: 12 },
    { name: 'Classrooms', count: 9 },
    { name: 'Gym', count: 6 },
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'lost', 
      item: 'Black Wallet', 
      user: 'John Smith', 
      time: '30 minutes ago',
      location: 'Main Library',
      status: 'pending'
    },
    { 
      id: 2, 
      type: 'found', 
      item: 'iPhone 14 Pro', 
      user: 'Emily Chen', 
      time: '2 hours ago',
      location: 'Student Center',
      status: 'claimed'
    },
    { 
      id: 3, 
      type: 'matched', 
      item: 'Car Keys', 
      user: 'Michael Brown', 
      time: '5 hours ago',
      location: 'Parking Lot B',
      status: 'matched'
    },
    { 
      id: 4, 
      type: 'lost', 
      item: 'Textbook - Economics 101', 
      user: 'Sarah Johnson', 
      time: '1 day ago',
      location: 'Lecture Hall 3',
      status: 'pending'
    },
    { 
      id: 5, 
      type: 'found', 
      item: 'Blue Backpack', 
      user: 'David Wilson', 
      time: '1 day ago',
      location: 'Cafeteria',
      status: 'pending'
    },
  ];

  const matchAlerts = [
    {
      id: 1,
      lostItem: 'Gold Watch',
      foundItem: 'Watch (possibly gold)',
      confidence: 'High',
      location: 'Arts Building',
      dateReported: '2025-04-10',
    },
    {
      id: 2,
      lostItem: 'Dell Laptop',
      foundItem: 'Laptop Computer',
      confidence: 'Medium',
      location: 'Student Center',
      dateReported: '2025-04-09',
    },
    {
      id: 3,
      lostItem: 'Prescription Glasses',
      foundItem: 'Reading Glasses',
      confidence: 'Medium',
      location: 'Library',
      dateReported: '2025-04-08',
    },
  ];

  // Helper function for status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100">Pending</Badge>;
      case 'claimed':
        return <Badge className="bg-black text-white">Claimed</Badge>;
      case 'matched':
        return <Badge className="bg-black text-white">Matched</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Helper function for activity icon
  const getActivityIcon = (type) => {
    switch(type) {
      case 'lost':
        return <div className="p-2 rounded-full bg-gray-100"><Search className="h-4 w-4" /></div>;
      case 'found':
        return <div className="p-2 rounded-full bg-gray-100"><CheckCircle className="h-4 w-4" /></div>;
      case 'matched':
        return <div className="p-2 rounded-full bg-gray-100"><ArrowUpRight className="h-4 w-4" /></div>;
      default:
        return <div className="p-2 rounded-full bg-gray-100"><Clock className="h-4 w-4" /></div>;
    }
  };

  // Custom pie chart colors (black and white theme)
  const COLORS = ['#000000', '#333333', '#555555', '#777777', '#999999', '#BBBBBB'];

  return (
    <div className="container py-8 space-y-8">
      {/* Header section with Quick Report button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Dialog open={quickReportOpen} onOpenChange={setQuickReportOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="mr-2 h-4 w-4" />
              Quick Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report an Item</DialogTitle>
              <DialogDescription>
                Quickly report a lost or found item
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="lost">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="lost">Lost Item</TabsTrigger>
                <TabsTrigger value="found">Found Item</TabsTrigger>
              </TabsList>
              <TabsContent value="lost" className="space-y-2">
                <p className="text-sm">Report an item you've lost</p>
                <div className="h-20 bg-gray-50 rounded-md flex items-center justify-center">
                  <p className="text-sm text-gray-500">Form fields would go here</p>
                </div>
              </TabsContent>
              <TabsContent value="found" className="space-y-2">
                <p className="text-sm">Report an item you've found</p>
                <div className="h-20 bg-gray-50 rounded-md flex items-center justify-center">
                  <p className="text-sm text-gray-500">Form fields would go here</p>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setQuickReportOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">248</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-black font-medium">↑ 12% </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Items Reunited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">86</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-black font-medium">↑ 18% </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">34.7%</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-black font-medium">↑ 5% </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">162</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-black font-medium">91 lost, </span>
              <span className="text-gray-600">71 found</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reports</CardTitle>
            <CardDescription>Lost vs. found items reported by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }} />
                  <Legend />
                  <Bar dataKey="lost" fill="#000000" name="Lost Items" />
                  <Bar dataKey="found" fill="#888888" name="Found Items" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Item Categories</CardTitle>
            <CardDescription>Distribution of items by category</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Success rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    {month: 'Jan', rate: 28},
                    {month: 'Feb', rate: 30},
                    {month: 'Mar', rate: 26},
                    {month: 'Apr', rate: 32},
                    {month: 'May', rate: 35},
                    {month: 'Jun', rate: 33},
                    {month: 'Jul', rate: 40},
                  ]}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#000000" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    name="Success Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 pt-0">
            Percentage of items successfully returned to owners
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
            <CardDescription>Most common places items are lost or found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }} />
                  <Bar dataKey="count" fill="#333333" name="Number of Items" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 pt-0">
            Based on reported location data from the last 30 days
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity and Matching Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Activity</CardTitle>
                <Tabs 
                  value={currentTab} 
                  onValueChange={setCurrentTab}
                  className="w-auto"
                >
                  <TabsList className="grid w-[300px] grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="lost">Lost</TabsTrigger>
                    <TabsTrigger value="found">Found</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>Latest reported items and matches</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-1">
                {recentActivities
                  .filter(activity => currentTab === 'all' || activity.type === currentTab)
                  .map((activity, index) => (
                    <div key={activity.id}>
                      <div className="flex items-start p-3 hover:bg-gray-50 rounded-md">
                        {getActivityIcon(activity.type)}
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium">{activity.item}</p>
                              <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                            </div>
                            {getStatusBadge(activity.status)}
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.location}
                          </div>
                        </div>
                      </div>
                      {index < recentActivities.length - 1 && <Separator />}
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full text-sm">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Matching Alerts</CardTitle>
                <Badge className="bg-black text-white">New</Badge>
              </div>
              <CardDescription>Potential matches between lost and found items</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-1">
                {matchAlerts.map((alert, index) => (
                  <div key={alert.id}>
                    <div className="flex items-start p-3 hover:bg-gray-50 rounded-md">
                      <div className="p-2 rounded-full bg-gray-100">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">
                              <span className="text-gray-800">Lost:</span> {alert.lostItem}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-800">Found:</span> {alert.foundItem}
                            </p>
                          </div>
                          <Badge 
                            variant={alert.confidence === 'High' ? 'default' : 'outline'}
                            className={alert.confidence === 'High' ? 'bg-black text-white' : ''}
                          >
                            {alert.confidence}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alert.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(alert.dateReported).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < matchAlerts.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex flex-col space-y-2">
              <Button className="w-full bg-black text-white hover:bg-gray-800 text-sm">
                Review All Matches
              </Button>
              <Button variant="outline" className="w-full text-sm">
                Configure Matching
                <Filter className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Summary Card */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-1 mb-4 md:mb-0">
              <h3 className="text-lg font-medium">Today's Summary</h3>
              <p className="text-sm text-gray-500">Sunday, April 13, 2025</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs font-medium text-gray-500">New Reports</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Matches</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Reunited</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
