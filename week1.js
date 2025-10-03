    const { MongoClient } = require("mongodb");

// 🔑 Replace with your MongoDB Atlas URI
const uri = "mongodb+srv://eutycus-36:mash2022@cluster0.ufcucmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    // 1. Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Choose database and collection
    const db = client.db("library");
    const books = db.collection("books");

    // 2. CREATE - Insert a document
    const newBook = { title: "MongoDB for Beginners", author: "John Doe", year: 2024, genre: "Technology" };
    await books.insertOne(newBook);
    console.log("📚 Book inserted!");

    // 3. READ - Find all books
    const allBooks = await books.find().toArray();
    console.log("📖 All books:", allBooks);

    // 4. READ with filter - Find by author
    const johnBooks = await books.find({ author: "John Doe" }).toArray();
    console.log("📖 Books by John Doe:", johnBooks);

    // 5. UPDATE - Update one document
    await books.updateOne({ author: "John Doe" }, { $set: { year: 2025 } });
    console.log("✏️ Book updated!");

    // 6. DELETE - Delete one document
    await books.deleteOne({ author: "John Doe" });
    console.log("❌ Book deleted!");

    // 7. AGGREGATION - Count books per genre
    const agg = await books.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]).toArray();
    console.log("📊 Books per genre:", agg);

    // 8. INDEXING - Create index on title
    await books.createIndex({ title: 1 });
    console.log("⚡ Index created on title!");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();0
