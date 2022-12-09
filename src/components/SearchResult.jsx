import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { loading, setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents);
      setLoading(true);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item?.video;
            return <SearchResultVideoCard key={video?.videoId} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
