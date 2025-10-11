import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Path to the JSON file that acts as a simple database
const dataFilePath = path.join(process.cwd(), "data/reminders.json");

// Helper function to read data from the file
async function getRemindersData() {
  try {
    const fileContents = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    // If the file doesn't exist or is empty, create it with a default structure
    const defaultData = { mother: [], child: [] };
    await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

// --- GET Handler ---
export async function GET() {
  try {
    const data = await getRemindersData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch reminders." }, { status: 500 });
  }
}

// --- POST Handler ---
export async function POST(request: Request) {
  try {
    const { category, name, time } = await request.json();

    if (!category || !name || !time || !['mother', 'child'].includes(category)) {
      return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
    }

    const allReminders = await getRemindersData();
    const newReminder = { id: Date.now(), name, time };
    allReminders[category].push(newReminder);

    await fs.writeFile(dataFilePath, JSON.stringify(allReminders, null, 2));

    return NextResponse.json({ message: "Reminder added successfully", reminder: newReminder }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to add reminder." }, { status: 500 });
  }
}

// --- DELETE Handler ---
export async function DELETE(request: Request) {
  try {
    const { category } = await request.json();

    if (!category || !['mother', 'child'].includes(category)) {
      return NextResponse.json({ error: "Invalid category provided" }, { status: 400 });
    }

    const allReminders = await getRemindersData();
    allReminders[category] = []; // Reset the array for the specified category

    await fs.writeFile(dataFilePath, JSON.stringify(allReminders, null, 2));

    return NextResponse.json({ message: `${category} reminders cleared successfully` }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to clear reminders." }, { status: 500 });
  }
}