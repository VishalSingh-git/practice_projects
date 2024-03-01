import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
interface Response {
  Hits: {
    title: string;
    url: string;
    created_at: string;
    author: string;
  }[];
  nbPages: number;
}



const NewPost = () => {


  const [posts, setPosts] = useState<Response["Hits"]>([]);
  // const [filteredPosts, setFilteredPosts] = useState<Response["Hits"]>([]);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Response["Hits"] | null>(
    null
  );
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [filteredCreatedAt, setFilteredCreatedAt] = useState<string>("");
  const [filteredTitle, setFilteredTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchingInProgress = useRef<boolean>(false);
  const pageRef = useRef<number>(0);
  const totalPageRef = useRef<number>(0);

  const fetchPosts = async () => {
    if (fetchingInProgress.current) return;
    fetchingInProgress.current = true;

    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageRef.current}`
      );


      setPosts((prevPosts) => [...prevPosts, ...response?.data?.hits]);



             totalPageRef.current=response.data.nbPages
      if (pageRef.current >= response.data?.nbPages) {
        setHasMore(false);

      }


        pageRef.current++;


    } catch (error) {
      console.log("Failed to fetch posts", error);
      // return error
    } finally {

      fetchingInProgress.current = false;
    }
  };

  useEffect(() => {

    const clearId = setInterval(() => {
      if (pageRef.current <= totalPageRef.current ) {
        fetchPosts()
      }

    }, 1000);

    return () => clearInterval(clearId);
  }, []);

  const handleClickedRow = (post: Response["Hits"]) => {
    setSelectedPost(post);
    setIsModelOpen(true);


  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(filteredTitle.toLowerCase()) &&
        post.created_at.toLowerCase().includes(filteredCreatedAt.toLowerCase())
      );
    })
  }, [posts, filteredTitle, filteredCreatedAt])



  return (
    <Box style={{ overflow: "hidden" }}>
      <Box display={"flex"} justifyContent={"space-evenly"}>
        <TextField
        data-testid="CreatedAt"
          label="Filter by Created At"
          value={filteredCreatedAt}
          onChange={(e) => setFilteredCreatedAt(e.target.value)}
        />
        <TextField
        data-testid="TitleSearch"
          label="Filter by Title"
          value={filteredTitle}
          onChange={(e) => setFilteredTitle(e.target.value)}
        />
        <TextField
        name="search"
         data-testid="search"
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>



      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={

            <div       data-testid="CircularProgress"            style={{ textAlign: "center" }}>
              <CircularProgress   data-testid="loading_spinner" />
            </div>

        }
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

                {filteredPosts.map((post: any, index: number) => (
                    <TableRow
                    data-testid={`filtered-${index}`}
                      key={index}
                      onClick={() => handleClickedRow(post)}
                    >
                      <TableCell>{index}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.url}</TableCell>
                      <TableCell>{post.created_at}</TableCell>
                      <TableCell>{post.author}</TableCell>
                    </TableRow>
                  ))
                }

            </TableBody>
          </Table>
        </TableContainer>

      </InfiniteScroll>
    </Box>
  );
};

export default NewPost;


