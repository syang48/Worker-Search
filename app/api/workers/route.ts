import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  // 1. Paste your connection string from Atlas here
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "URI is empty" }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // 2. Double check these match your Atlas 'Browse Collections' view
    const db = client.db("test"); 
    const collection = db.collection("workers");

    const workers = await collection.find({}).toArray();
    
    // Log to terminal so you can verify without the browser
    console.log(`Successfully fetched ${workers.length} workers from MongoDB`);

    return NextResponse.json({ workers });
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // 3. Close the connection to free up memory
    await client.close();
  }
}