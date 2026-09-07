"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, BookOpen, Activity, ArrowUpRight, Search } from "lucide-react";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, name: "Alice Cooper", email: "alice@example.com", role: "Student", joined: "Aug 1, 2026" },
  { id: 2, name: "Bob Builder", email: "bob@example.com", role: "Student", joined: "Jul 28, 2026" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", role: "Admin", joined: "Jan 15, 2026" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Student", joined: "Jul 10, 2026" },
  { id: 5, name: "Evan Wright", email: "evan@example.com", role: "Instructor", joined: "May 2, 2026" },
];

export default function AdminDashboardPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-white p-6 sm:p-10 text-neutral-900">
      <div className="space-y-8 max-w-6xl mx-auto pb-10">
        <div className="border-b border-neutral-100 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Admin Dashboard</h1>
          <p className="text-neutral-500 text-sm">Platform overview, user management, and analytics.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-none border-neutral-200 bg-[#F7F7F5] rounded-md transition-colors cursor-default">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
              <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Users</CardTitle>
              <div className="text-neutral-500">
                <Users className="size-4" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight text-neutral-900">1,248</div>
              <p className="text-[13px] font-medium text-neutral-500 mt-1 flex items-center">
                <ArrowUpRight className="size-3 mr-1" /> +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-none border-neutral-200 bg-[#F7F7F5] rounded-md transition-colors cursor-default">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
              <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Active Courses</CardTitle>
              <div className="text-neutral-500">
                <BookOpen className="size-4" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight text-neutral-900">24</div>
              <p className="text-[13px] font-medium text-neutral-500 mt-1 flex items-center">
                3 courses added this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-none border-neutral-200 bg-[#F7F7F5] rounded-md transition-colors cursor-default">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
              <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Daily Active</CardTitle>
              <div className="text-neutral-500">
                <Activity className="size-4" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight text-neutral-900">482</div>
              <p className="text-[13px] font-medium text-neutral-500 mt-1 flex items-center">
                <ArrowUpRight className="size-3 mr-1" /> +5% from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-3">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">User Management</h2>
              <p className="text-sm text-neutral-500 mt-0.5">Filter members and manage access permissions.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="pl-9 h-8 bg-[#F7F7F5] border-neutral-200 text-xs shadow-none rounded"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-8 bg-[#F7F7F5] border border-neutral-200 rounded px-2.5 text-xs font-medium text-neutral-700 cursor-pointer"
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="border border-neutral-200 rounded-md overflow-hidden bg-white shadow-none">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50/50 hover:bg-neutral-50/50 border-b border-neutral-200">
                  <TableHead className="h-10 text-xs font-medium text-neutral-500">Name</TableHead>
                  <TableHead className="h-10 text-xs font-medium text-neutral-500">Email</TableHead>
                  <TableHead className="h-10 text-xs font-medium text-neutral-500">Role</TableHead>
                  <TableHead className="h-10 text-xs font-medium text-neutral-500">Joined</TableHead>
                  <TableHead className="h-10 text-xs font-medium text-neutral-500 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-neutral-50/50 border-b border-neutral-100 last:border-0 transition-colors">
                      <TableCell className="font-medium text-sm text-neutral-900 py-3">{user.name}</TableCell>
                      <TableCell className="text-neutral-500 text-sm py-3">{user.email}</TableCell>
                      <TableCell className="py-3">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                          user.role === 'Admin' ? 'bg-neutral-100 text-neutral-900 border-neutral-300 font-semibold' :
                          user.role === 'Instructor' ? 'bg-neutral-50 text-neutral-800 border-neutral-200' :
                          'bg-transparent text-neutral-600 border-neutral-200'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-neutral-500 text-sm py-3">{user.joined}</TableCell>
                      <TableCell className="text-right py-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const nextRole = user.role === 'Student' ? 'Instructor' : 'Student';
                            setUsers(users.map(u => u.id === user.id ? { ...u, role: nextRole } : u));
                            toast.success(`Role updated: ${user.name} is now ${nextRole}`);
                          }}
                          className="h-7 px-2.5 text-xs border-neutral-200 hover:bg-neutral-100 rounded text-neutral-700"
                        >
                          Toggle Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-neutral-500 text-sm">
                      No users match search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
