import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoaderImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    //parent div
    <div className="heroBanner">
      {/* bg image div */}
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      {/* gradient div for merging */}
      <div className="opacity-layer" />
      {/* wrapper div */}
      <ContentWrapper>
        {/* container div */}
        <div className="heroBannerContent">
          {/* title */}
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of Movies, TV Shows and People to discover. Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie or TV Show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
