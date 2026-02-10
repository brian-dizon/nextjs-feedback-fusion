"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "./ui/badge";
import { Edit, Save, ThumbsUp, User, X, Clock, CheckCheck, Eye, ListCheck } from "lucide-react";
import { STATUS_GROUPS, STATUS_ORDER } from "@/app/data/status-data";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import type { posts, users, votes } from "@prisma/client";

// Define our strong types
type PostWithRelations = posts & {
  users: users;
  votes: votes[];
};

export default function AdminFeedbackTable({ initialPosts }: { initialPosts: PostWithRelations[] }) {
  const [posts, setPosts] = useState<PostWithRelations[]>(initialPosts);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const startEditing = (post: PostWithRelations) => {
    setEditingPostId(post.id);
    setSelectedStatus(post.status);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setSelectedStatus("");
  };

  const saveStatus = async (postId: number) => {
    const loadingToast = toast.loading("Updating status...");
    console.log(`Submitting status update for post ${postId}:`, selectedStatus);
    
    try {
      const response = await fetch(`/api/feedback/${postId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) throw new Error("Update failed");

      toast.dismiss(loadingToast);
      toast.success("Status updated successfully");

      // Update local state
      setPosts(prev => 
        prev.map(p => p.id === postId ? { ...p, status: selectedStatus as any } : p)
      );
      setEditingPostId(null);
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Failed to update status");
    }
  };

  const getStatusIcon = (status: string) => {
    const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
    if (!group) return null;
    const Icon = group.icon;
    return <Icon className="h-4 w-4 mr-2" />;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-muted/30">
        <CardTitle>Manage Feedback</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Feedback Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => {
              const isEditing = editingPostId === post.id;
              const cat = getCategoryDesign(post.category);
              const CatIcon = cat.icon;

              return (
                <TableRow key={post.id} className="transition-colors">
                  <TableCell className="font-semibold align-middle truncate max-w-[300px]">
                    {post.title}
                  </TableCell>
                  <TableCell className="align-middle">
                    <Badge variant="outline" className={`${cat.text} ${cat.border} flex w-fit items-center gap-1 shadow-none`}>
                      <CatIcon className="h-3 w-3" />
                      {post.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <ThumbsUp className="h-4 w-4" />
                      {post.votes.length}
                    </div>
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{post.users?.name || "Anonymous"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle">
                    {isEditing ? (
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-[180px] h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_ORDER.map((status) => {
                            const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
                            const StatusIcon = group.icon;
                            return (
                              <SelectItem key={status} value={status}>
                                <div className="flex items-center">
                                  <StatusIcon className="mr-2 h-4 w-4" />
                                  {group.title}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="secondary" className={`${STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS]?.countColor} shadow-none`}>
                        {getStatusIcon(post.status)}
                        {STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS]?.title}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right align-middle">
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => saveStatus(post.id)} className="h-8 w-8 p-0">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={cancelEditing} className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => startEditing(post)} className="h-8 gap-1.5">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
