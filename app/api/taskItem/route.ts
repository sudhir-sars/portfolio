import { NextResponse, NextRequest } from 'next/server';
import connectDb from "@/middleware/mongoose";
import ListItem from "@/models/taskItem";



export const GET = connectDb(async (req: NextRequest) => {
  try {
    const items = await ListItem.find({});
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
});

export const POST = connectDb(async (req: NextRequest) => {
  try {
    const { title, color, status } = await req.json();
    const newItem = new ListItem({
      title,
      color,
      status,
    });
    await newItem.save();
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ success: false, error: "Failed to add item" }, { status: 500 });
  }
});

export const DELETE = connectDb(async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    const deletedItem = await ListItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
});

export const PATCH = connectDb(async (req: NextRequest) => {
  try {
    const { id, color } = await req.json();
    const updatedItem = await ListItem.findByIdAndUpdate(id, { color }, { new: true });
    if (!updatedItem) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating item color:", error);
    return NextResponse.json({ success: false, error: "Failed to update item color" }, { status: 500 });
  }
});