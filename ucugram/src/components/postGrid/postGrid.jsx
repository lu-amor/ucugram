import PostItem from "ucugram/src/components/postItem/postItem.jsx";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import "ucugram/src/components/postGrid/postGrid.css"


const PostGrid = () => {
  const { posts, loading, error } = useFetchPosts();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts!</div>;

  return (
    <div className="grid-container">
          {posts.map((post) => (
            <PostItem 
            key={post.id} 
            post={post} />
          ))}
    </div>
  );
};

export default PostGrid;

