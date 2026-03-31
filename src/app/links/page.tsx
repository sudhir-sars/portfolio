"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  Copy,
  ExternalLink,
  Trash2,
  Plus,
  Link as LinkIcon,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";

export default function LinksPage() {
  const links = useQuery(api.links.list);
  const createLink = useMutation(api.links.create);
  const removeLink = useMutation(api.links.remove);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ slug: "", destination: "", label: "" });
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    if (!form.slug.trim() || !form.destination.trim()) {
      setError("Slug and destination are required.");
      return;
    }

    setCreating(true);
    setError("");

    try {
      await createLink({
        slug: form.slug.trim(),
        destination: form.destination.trim(),
        label: form.label.trim(),
      });

      setForm({ slug: "", destination: "", label: "" });
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create link.");
    } finally {
      setCreating(false);
    }
  }

  function timeAgo(ts: number) {
    const d = Date.now() - ts;
    if (d < 60000) return "just now";
    if (d < 3600000) return `${Math.round(d / 60000)}m ago`;
    if (d < 86400000) return `${Math.round(d / 3600000)}h ago`;
    return `${Math.round(d / 86400000)}d ago`;
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  const totalClicks = links?.reduce((a, b) => a + b.totalClicks, 0) || 0;
  const topLink =
    links?.length ? [...links].sort((a, b) => b.totalClicks - a.totalClicks)[0] : null;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Links</h1>
          <p className="text-muted-foreground mt-2">
            Create, manage and track your short links
          </p>
        </div>

        <Button onClick={() => setOpen(true)} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          New Link
        </Button>
      </div>

      {/* STATS */}
      {links && links.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Links</p>
              <p className="text-2xl font-semibold">{links.length}</p>
            </div>
            <LinkIcon className="h-6 w-6 opacity-60" />
          </Card>

          <Card className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-semibold">
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <MousePointerClick className="h-6 w-6 opacity-60" />
          </Card>

          <Card className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Top Link</p>
              <p className="text-sm font-mono truncate">
                {topLink?.slug || "—"}
              </p>
            </div>
            <TrendingUp className="h-6 w-6 opacity-60" />
          </Card>
        </div>
      )}

      {/* TABLE */}
      <Card className="border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {links === undefined ? (
            <div className="py-24 text-center text-muted-foreground">
              Loading links...
            </div>
          ) : links.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="text-muted-foreground text-lg">
                No links yet
              </p>
              <Button onClick={() => setOpen(true)}>
                Create your first link
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Link</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Last</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {links.map((link) => (
                  <TableRow key={link._id} className="hover:bg-muted/40 transition">
                    
                    <TableCell>
                      <Link
                        href={`/links/${link.slug}`}
                        className="font-mono font-medium hover:underline"
                      >
                        /{link.slug}
                      </Link>
                    </TableCell>

                    <TableCell className="max-w-[280px] truncate text-muted-foreground">
                      {link.destination}
                    </TableCell>

                    <TableCell>
                      {link.label ? (
                        <Badge variant="secondary">{link.label}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell className="font-mono">
                      {link.totalClicks.toLocaleString()}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {link.lastClickedAt
                        ? timeAgo(link.lastClickedAt)
                        : "Never"}
                    </TableCell>

                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost">
                        <Copy
                          className="h-4 w-4"
                          onClick={() =>
                            copy(`${window.location.origin}/${link.slug}`)
                          }
                        />
                      </Button>

                      <Button size="icon" variant="ghost" asChild>
                        <a href={link.destination} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          if (confirm(`Delete /${link.slug}?`)) {
                            removeLink({ id: link._id as Id<"links"> });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Link</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
                placeholder="my-link"
              />
            </div>

            <div>
              <Label>Destination URL</Label>
              <Input
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label>Label</Label>
              <Input
                value={form.label}
                onChange={(e) =>
                  setForm({ ...form, label: e.target.value })
                }
                placeholder="Optional tag"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={creating}>
              {creating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}