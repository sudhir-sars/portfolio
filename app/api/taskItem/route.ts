import connectDb from "@/middleware/mongoose";
import ListItem from "@/models/taskItem";

export const POST = connectDb(async (req) => {
  try {
    const { title, color, status } = await req.json();

    const newItem = new ListItem({
      title,
      color,
      status,
    });

    await newItem.save();

    return new Response(JSON.stringify({ success: true, data: newItem }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding item:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to add item" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

export const GET = connectDb(async (req) => {
  try {
    const items = await ListItem.find({});

    return new Response(JSON.stringify({ success: true, data: items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch items" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

export const DELETE = connectDb(async (req) => {
  try {
    const { id } = await req.json();

    const deletedItem = await ListItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return new Response(JSON.stringify({ success: false, error: "Item not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: deletedItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to delete item" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

export const PATCH = connectDb(async (req) => {
  try {
    const { id } = await req.json();
    const { color } = await req.json(); // Add this line to get the color from the request body

    const updatedItem = await ListItem.findByIdAndUpdate(id, { color }, { new: true });

    if (!updatedItem) {
      return new Response(JSON.stringify({ success: false, error: "Item not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: updatedItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating item color:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to update item color" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});