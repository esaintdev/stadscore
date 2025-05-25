import mongoose, { Document, Schema } from 'mongoose';

export interface IComment {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar?: string;
  date: Date;
}

export interface IPost extends Document {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  image: string;
  author: mongoose.Types.ObjectId;
  comments: IComment[];
  likes: mongoose.Types.ObjectId[];
  tags: string[];
  isPublished: boolean;
  publishedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now }
    }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

// Create slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
