import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";

interface Post {
  title: string;
  url: string;
  created_at: string;
  author: string;
}

const FetchNewPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef<any>();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      const data = await response.json();

      setPosts((prev) => [...prev, ...data.hits]);
      setPage((pre) => pre + 1);
    } catch (error) {
      console.log("failed to fetch post data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = tableRef.current;
      console.log("sh", scrollHeight, "st", scrollTop, "ch", clientHeight);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    // const clearIntervalId=setInterval(fetchPosts,10000)
    // return ()=>{
    //     console.log("out");
    //     clearInterval(clearIntervalId)
    // }
  }, []);
  return (
    <div>
      <TableContainer component={Paper} onScroll={handleScroll} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.url}</TableCell>
                <TableCell>{post.created_at}</TableCell>
                <TableCell>{post.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      )}
    </div>
  );
};

export default FetchNewPost;
