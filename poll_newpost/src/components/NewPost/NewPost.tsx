import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostModel from "./PostModel/PostModel";

interface Posts {
  title: string;
  url: string;
  created_at: string;
  author: string;
}

const NewPost = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [filteredCreatedAt, setFilteredCreatedAt] = useState<string>("");
  const [filteredTitle, setFilteredTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchingInProgress = useRef<boolean>(false);
  const pageRef = useRef<number>(0);

  const fetchPosts = async () => {
    if (fetchingInProgress.current) return; 
    fetchingInProgress.current = true;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageRef.current}`
      );
      setPosts((prevPosts) => [...prevPosts, ...response.data.hits]);
  
      pageRef.current++;
    
      
    } catch (error) {
      console.log("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
      fetchingInProgress.current = false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const ClearIntervalId = setInterval(fetchPosts, 10000);

    return () => clearInterval(ClearIntervalId);
  }, []);

  const handleClickedRow = (post: Posts) => {
    setSelectedPost(post);
    setIsModelOpen(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  const filterPosts = () => {
 
    const filtered = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(filteredTitle.toLowerCase()) &&
        post.created_at.toLowerCase().includes(filteredCreatedAt.toLowerCase())
      );
    });
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    filterPosts();
  }, [filteredTitle, filteredCreatedAt, posts]);

  const handleSearch = (query: string) => {
   
  
    const filteredSearch = posts?.filter((post) => {
      return (
        post.title?.toLowerCase().includes(query.toLowerCase()) ||
        post.url?.toLowerCase().includes(query.toLowerCase()) ||
        post.author?.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredPosts(filteredSearch);
  };
  useEffect(()=>{
handleSearch(searchQuery)
  },[searchQuery])

 
  

  return (
    <Box style={{ overflow: "hidden" }}>
      <Box display={"flex"} justifyContent={"space-evenly"}>
        <TextField
          label="Filter by Created At"
          value={filteredCreatedAt}
          onChange={(e) => setFilteredCreatedAt(e.target.value)}
        />
        <TextField
          label="Filter by Title"
          value={filteredTitle}
          onChange={(e) => setFilteredTitle(e.target.value)}
        />
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <InfiniteScroll
        dataLength={posts.length}

        next={fetchPosts}
        hasMore={true}
        loader={isLoading && <div style={{textAlign:"center"}}><CircularProgress   /></div>}
  //  initialScrollY={}
        scrollThreshold={0.9}
       
      >
        <PostModel
          open={isModelOpen}
          handleClose={handleCloseModel}
          postData={selectedPost}
        />
        <TableContainer style={{ overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SNO.</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>CREATED AT</TableCell>
                <TableCell>AUTHOR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredPosts.length > 0 ? (
    filteredPosts.map((post: Posts, index: number) => (
      <TableRow key={index} onClick={() => handleClickedRow(post)}>
        <TableCell>{index}</TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.url}</TableCell>
        <TableCell>{post.created_at}</TableCell>
        <TableCell>{post.author}</TableCell>
      </TableRow>
    ))
  ) : (
    posts.map((post: Posts, index: number) => (
      <TableRow key={index} onClick={() => handleClickedRow(post)}>
        <TableCell>{index}</TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.url}</TableCell>
        <TableCell>{post.created_at}</TableCell>
        <TableCell>{post.author}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>

          </Table>
        </TableContainer>
        {/* {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2} // Add margin top to position the loader
          >
            <CircularProgress />
          </Box>
        )} */}
      </InfiniteScroll>
    </Box>
  );
};

export default NewPost;
