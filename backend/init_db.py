from pymongo import MongoClient
from datetime import datetime
import asyncio

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["blog"]

# Sample blog posts
initial_posts = [
    {
        "title": "The Future of Artificial Intelligence",
        "content": "<p><strong>Exploring AI's Impact on Society</strong></p>\n<div>\n<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quidem voluptatum dolorem enim, dolores quod inventore repellat sapiente iusto dicta, excepturi asperiores tenetur cum! Doloribus dolore perspiciatis, eligendi illum ullam voluptatum vero cupiditate aliquam sed ducimus fugiat soluta enim? Alias dolores corrupti iure ipsa officia at, nemo vero tempore commodi eveniet quae. Beatae dolorum, expedita deleniti quidem cumque error eum! Voluptatibus ea doloribus, laborum dolores accusantium vel nesciunt facilis voluptatem necessitatibus repudiandae, quibusdam delectus laboriosam. Fugiat quisquam eveniet perspiciatis delectus expedita aspernatur, reiciendis odio corrupti magnam doloribus quas veritatis sapiente laboriosam.</div>\n</div>",
        "author": "admin",
        "image": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        "created_at": datetime.now()
    },
    {
        "title": "Modern Web Development Trends",
        "content": "<p><strong>Latest Innovations in Web Tech</strong></p>\n<div>\n<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quidem voluptatum dolorem enim, dolores quod inventore repellat sapiente iusto dicta, excepturi asperiores tenetur cum! Doloribus dolore perspiciatis, eligendi illum ullam voluptatum vero cupiditate aliquam sed ducimus fugiat soluta enim? Alias dolores corrupti iure ipsa officia at, nemo vero tempore commodi eveniet quae. Beatae dolorum, expedita deleniti quidem cumque error eum! Voluptatibus ea doloribus, laborum dolores accusantium vel nesciunt facilis voluptatem necessitatibus repudiandae, quibusdam delectus laboriosam. Fugiat quisquam eveniet perspiciatis delectus expedita aspernatur, reiciendis odio corrupti magnam doloribus quas veritatis sapiente laboriosam, nobis eaque minus, facilis labore facere exercitationem mollitia debitis eligendi accusamus odit quam?</div>\n</div>",
        "author": "admin",
        "image": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
        "created_at": datetime.now()
    },
    {
        "title": "Sustainable Software Engineering",
        "content": "<p><strong>Building Eco-Friendly Applications</strong></p>\n<div>\n<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quidem voluptatum dolorem enim, dolores quod inventore repellat sapiente iusto dicta, excepturi asperiores tenetur cum! Doloribus dolore perspiciatis, eligendi illum ullam voluptatum vero cupiditate aliquam sed ducimus fugiat soluta enim? Alias dolores corrupti iure ipsa officia at, nemo vero tempore commodi eveniet quae. Beatae dolorum, expedita deleniti quidem cumque error eum! Voluptatibus ea doloribus, laborum dolores accusantium vel nesciunt facilis voluptatem necessitatibus repudiandae, quibusdam delectus laboriosam. Fugiat quisquam eveniet perspiciatis delectus expedita aspernatur, reiciendis odio corrupti magnam doloribus quas veritatis sapiente laboriosam, nobis eaque minus, facilis labore facere exercitationem mollitia debitis eligendi accusamus odit quam? Magnam unde exercitationem earum consequatur mollitia ipsa, laboriosam repellat architecto similique.</div>\n</div>",
        "author": "admin",
        "image": "https://images.pexels.com/photos/3912948/pexels-photo-3912948.jpeg",
        "created_at": datetime.now()
    }
]

def init_db():
    # Clear existing posts
    db.posts.delete_many({})
    
    # Insert new posts
    result = db.posts.insert_many(initial_posts)
    
    print(f"Created {len(result.inserted_ids)} sample posts")
    print("Sample posts have been initialized in the database")

if __name__ == "__main__":
    init_db() 