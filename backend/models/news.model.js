import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
  },

  { timestamps: true }
);

// Pre-save middleware to generate and validate unique slug
newsSchema.pre("save", async function (next) {
  const news = this; // This refers to the document being saved

  // Generate a basic slug from title (replace with your desired logic)
  let slug = news.title.toLowerCase().replace(/\s+/g, "-");

  // Append a number if a duplicate slug is found
  let count = 1;
  try {
    const existingNews = await this.constructor.findOne({ slug }); // Await for findone
    if (existingNews) {
      slug = `${slug}-${count++}`;
      const duplicateCheck = await this.constructor.findOne({ slug }); // Recursively check again with await
      if (duplicateCheck) {
        // Handle potential infinite loop scenario (consider a more robust strategy)
        throw new Error("Failed to generate unique slug");
      }
    }
  } catch (err) {
    return next(err);
  }

  news.slug = slug; // Set unique slug on the document
  next();
});

const News = mongoose.model("News", newsSchema);

export default News;
