import React, { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Package,
  Search,
  MoreVertical,
  AlertTriangle,
  Ban,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Settings,
  PieChart,
  ArrowUpRight,
} from "lucide-react";
import itemsService from "@/services/items.services";
import userServices from "@/services/user.services";

const AdminPanelPage = () => {
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [isDeleteItemOpen, setIsDeleteItemOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("all");
  const [totalItems, setTotalItems] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await itemsService.getAllItems();
      if (response?.items?.length > 0) {
        setTotalItems(response.items);
      }
      const userResponse = await userServices.getAllUsers();
      if (userResponse?.users?.length > 0) {
        setTotalUsers(userResponse.users);
      }
    })();
  }, []);


  const stats = {
    totalItems: totalItems.length,
    pendingItems: totalItems.filter((item) => item.status === "Pending").length,
    completedItems: totalItems.filter((item) => item.status === "Resolved")
      .length,
    totalUsers: totalUsers.length,
    topCategories: [
      { name: "Electronics", count: 36 },
      { name: "Bags", count: 24 },
      { name: "Keys", count: 18 },
      { name: "Books", count: 15 },
    ],
  };

  let filteredItems =
    searchQuery.trim() === ""
      ? totalItems
      : totalItems.filter((item) =>
          item?.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        );

  if (statusQuery === "all") {
    filteredItems = filteredItems;
  } else if (statusQuery === "pending") {
    filteredItems = filteredItems.filter((item) => item?.status === "Pending");
  } else if (statusQuery === "reunited") {
    filteredItems = filteredItems.filter((item) => item?.status === "Resolved");
  }

  const filteredUsers =
    userSearchQuery.trim() === ""
      ? totalUsers
      : totalUsers.filter((user) =>
          user?.name.toLowerCase().includes(userSearchQuery.toLowerCase())
        );

  // const handleViewUser = (user) => {
  //   setSelectedUser(user);
  //   setIsViewUserOpen(true);
  // };

  // const handleDeleteItem = (item) => {
  //   setSelectedItem(item);
  //   setIsDeleteItemOpen(true);
  // };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">
                {Math.round((stats.completedItems / stats.totalItems) * 100)}%{" "}
              </span>
              reunion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">
                +5% {" "} 
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="items" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="items" className="text-center">
            Items
          </TabsTrigger>
          <TabsTrigger value="users" className="text-center">
            Users
          </TabsTrigger>
          <TabsTrigger value="statistics" className="text-center">
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Lost and Found Items</CardTitle>
              <CardDescription>
                Manage all reported lost and found items in the system.
              </CardDescription>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search items..."
                      className="pl-8"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    defaultValue="all"
                    onValueChange={(e) => setStatusQuery(e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reunited">Reunited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Add Item</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item?.itemName}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item?.itemType === "lost"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {item?.itemType === "lost" ? "Lost" : "Found"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item?.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item?.status === "Pending" ? "outline" : "success"
                          }
                        >
                          {item?.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item?.location}</TableCell>
                      <TableCell>{item?.userId?.name}</TableCell>
                      <TableCell>
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              // onClick={() => handleDeleteItem(item)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all registered users in the system.
              </CardDescription>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-8" onChange = {(e) => setUserSearchQuery(e.target.value)} />
                  </div>
                </div>
                <Button>Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/api/placeholder/32/32`} />
                            <AvatarFallback>
                              {user?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {user?.name}
                        </div>
                      </TableCell>
                      <TableCell>{user?.username}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>
                        <Badge variant={"success"}>{user?.phone}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Item Status</CardTitle>
                <CardDescription>
                  Overview of lost and found items by status
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Pending Items</span>
                      <span className="text-sm font-medium">
                        {stats.pendingItems}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${
                            (stats.pendingItems / stats.totalItems) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Reunited Items</span>
                      <span className="text-sm font-medium">
                        {stats.completedItems}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${
                            (stats.completedItems / stats.totalItems) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">Item Type Distribution</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Badge variant="destructive" className="mb-2">
                            Lost
                          </Badge>
                          <p className="text-2xl font-bold">68</p>
                          <p className="text-sm text-muted-foreground">items</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Badge className="mb-2">Found</Badge>
                          <p className="text-2xl font-bold">52</p>
                          <p className="text-sm text-muted-foreground">items</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>
                  Most common item categories reported
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  {stats.topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">
                          {category.count}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                              ? "bg-indigo-500"
                              : index === 2
                              ? "bg-violet-500"
                              : "bg-purple-500"
                          }`}
                          style={{
                            width: `${
                              (category.count / stats.topCategories[0].count) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          iPhone reunited with owner
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded-full bg-blue-100">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          New item reported: Leather Wallet
                        </p>
                        <p className="text-xs text-muted-foreground">
                          5 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded-full bg-yellow-100">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Report flagged: Suspicious description
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  System activity over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <PieChart className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Chart visualization placeholder
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            New Reports
                          </p>
                          <p className="text-2xl font-bold">42</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-full">
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      <p className="text-xs text-green-500 mt-2">
                        +18% from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Reunions
                          </p>
                          <p className="text-2xl font-bold">28</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-full">
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      <p className="text-xs text-green-500 mt-2">
                        +12% from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            New Users
                          </p>
                          <p className="text-2xl font-bold">15</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-full">
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      <p className="text-xs text-green-500 mt-2">
                        +5% from last week
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog for viewing user details */}
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Detailed information about this user.
            </DialogDescription>
          </DialogHeader>
          {/* {selectedUser && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/api/placeholder/80/80`} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <Badge
                  variant={
                    selectedUser.status === "Active" ? "success" : "secondary"
                  }
                >
                  {selectedUser.status}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm text-muted-foreground">Username:</p>
                  <p className="text-sm font-medium">{selectedUser.username}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm text-muted-foreground">Email:</p>
                  <p className="text-sm font-medium">{selectedUser.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm text-muted-foreground">
                    Items Reported:
                  </p>
                  <p className="text-sm font-medium">{selectedUser.items}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm text-muted-foreground">Join Date:</p>
                  <p className="text-sm font-medium">
                    {new Date(selectedUser.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )} */}
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>
              Close
            </Button>
            <Button>View Activity</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for confirming item deletion */}
      <Dialog open={isDeleteItemOpen} onOpenChange={setIsDeleteItemOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {/* {selectedItem && (
            <div>
              <p className="mb-4">
                You are about to delete:{" "}
                <span className="font-medium">{selectedItem.name}</span>
              </p>
              <div className="bg-red-50 p-3 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-600">
                  Deleting this item will permanently remove it from the
                  database and any associated matches.
                </p>
              </div>
            </div>
          )} */}
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              // onClick={() => setIsDeleteItemOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive">Delete Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanelPage;
