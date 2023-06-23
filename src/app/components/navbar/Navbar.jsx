
"use client"
import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/signage-works.png";
// import main_video from "../assets/video.mp4";
import $ from "jquery";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
// import { fetchSubSuccess } from "@/Redux/categoriesSlice";

import {
  fetchFailure,
  fetchMainSuccess,
  fetchProductSuccess,
  fetchStart,
  fetchSubSuccess,
} from "@/Redux/categoriesSlice";




const Navbar = () => {
  const [getCategory, setCategory] = useState([]);
  const [getSubCategory, setSubCategory] = useState([]);
  const [getProductCategory, setProductCategory] = useState([]);
  const dispatch = useDispatch();
  const currentMainCategory = useSelector((state) => state.categories.currentMainCategory);


  



  useEffect(() => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
        // alert("v");
        $(".navbar").addClass("navbar-scrolled");
      } else {
        $(".navbar").removeClass("navbar-scrolled");
      }
    });
  }, []);

  useEffect(() => {
    // dispatch(fetchStart());
    const fetchCategory = async () => {
      const res = await axios.get(
        "https://signage-backend.onrender.com/getcategory"
      );

      setCategory(res.data);
      console.log(res.data);
      dispatch(fetchMainSuccess(res.data));
    };
    fetchCategory();
  }, []);

  console.log(getCategory);

  useEffect(() => {
    const fetchSubCategory = async () => {
      const subCategoryData = {};

      await Promise.all(
        getCategory.map(async (category) => {
          const res = await axios.post(
            "https://signage-backend.onrender.com/getsubcategory",
            {
              main_category: category.main_category,
            }
          );

          console.log(res.data);
          // const subCategoryArray = res.data.map((item) => item.sub_category);
          const subCategoryArray = res.data.map((item) => {
            return {
              sub_category: item.sub_category,
              image: item.imageUrl,
            };
          });

          subCategoryData[category.main_category] = subCategoryArray;
        })
      );
      console.log(subCategoryData);

      setSubCategory(subCategoryData);
      dispatch(fetchSubSuccess(subCategoryData));
    };

    if (getCategory.length > 0) {
      fetchSubCategory();
    }
  }, [getCategory]);

  // console.log(getSubCategory);

  useEffect(() => {
    const fetchProductCategory = async () => {
      const productCategoryData = {};

      await Promise.all(
        getCategory.map(async (category) => {
          const subCategory = getSubCategory[category.main_category];
          const subCategory1 = [];
          subCategory  && subCategory.map(async (sub_category) =>
            subCategory1.push(sub_category.sub_category)
          );
          console.log(subCategory1);
          const res = await axios.post(
            "https://signage-backend.onrender.com/getproductcategory",
            {
              main_category: category.main_category,
              sub_category: subCategory1,
            }
          );

          const products = res.data;
          console.log(products);
          const subCategoryData = {};
          products.forEach((product) => {
            if (!subCategoryData[product.sub_category]) {
              subCategoryData[product.sub_category] = [];
            }
            subCategoryData[product.sub_category].push({
              product: product.product_category,
              images: product.imageUrl,
            });
          });
          productCategoryData[category.main_category] = subCategoryData;
        })
      );

      console.log(productCategoryData);
      setProductCategory(productCategoryData);
      dispatch(fetchProductSuccess(productCategoryData));



    };

    if (getCategory.length > 0) {
      fetchProductCategory();
    }
    console.log(currentMainCategory,"visssssssssssssshhhhalll")

  }, [getCategory, getSubCategory]);

  // console.log(getProductCategory);

  const [hoveredItem, setHoveredItem] = useState("");

  function handleMouseEnter(e) {
    // hoveredItem = ;
    setHoveredItem(e.target.innerHTML);
    // alert(hoveredItem);
    $(".bg-white").css({
      display: "block",
      position: "absolute",
      top: "100%",
      left: 0,
      width: "100%",
      // height: "100%",
    });
  }

  function handleMouseLeave(e) {
    if (
      !e.relatedTarget ||
      !(e.relatedTarget instanceof Node) ||
      !e.currentTarget.contains(e.relatedTarget)
    ) {
      setHoveredItem(null);
      $(".bg-white").css("display", "none");
    }
  }

  const [hoveredSubCategory, setHoveredSubCategory] = useState("");

  function handleSubCategoryEnter(e) {
    // hoveredItem = ;
    setHoveredSubCategory(e.target.innerHTML);
    // alert(e.target.innerHTML)
    // alert(e.target.innerHTML)
    // alert(hoveredItem);
    // $(".bg-white").css({
    //   display: "block",
    //   position: "absolute",
    //   top: "100%",
    //   left: 0,
    //   width: "100%",
    //   // height: "100%",
    // });
  }

  function handleSubCategoryLeave(e) {
    setHoveredSubCategory(null);
    // $(".product-category").css("display", "none");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <div>
          <Link href = "/home">

            <Image src={logo}
              className="navbar-brand"
              style={{ color: "white", width: "150px",height:"100%" }}/>
         
          
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: "white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            // onMouseLeave={handleMouseLeave}
          >
            {getCategory &&
              getCategory.map((getCategory) => (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    onMouseEnter={handleMouseEnter}
                  >
                    {getCategory.main_category}
                  </a>
                </li>
              ))}
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2 bg-transparent"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      {/* {hoveredItem && getSubCategory[hoveredItem] && ( */}
      <div className="bg-white" style={{ width: "100%" }}>
        <div
          className="container-fluid"
          style={{ background: "grey" }}
          onMouseLeave={handleMouseLeave}
        >
          {/* <p>You hovered over {hoveredItem}.</p> */}
          {/* <p>{getSubCategory[hoveredItem]}</p> */}

          <div className="row">
            {getSubCategory[hoveredItem] &&
              getSubCategory[hoveredItem].map((sub_category) => (
                <div className="col-lg-2" style={{ padding: "15px" }}>
                  <Link
                    href={`/main-category/${hoveredItem.replace(
                      / /g,
                      "-"
                    )}/${sub_category.sub_category.replace(/ /g, "-")}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={handleSubCategoryEnter}
                  >
                    {sub_category.sub_category}
                  </Link>
                </div>
              ))}
          </div>
          <span>
            <div
              className="row product-category"
              style={{ background: "red" }}
              onMouseLeave={handleSubCategoryLeave}
            >
              {getProductCategory &&
                getProductCategory[hoveredItem] &&
                getProductCategory[hoveredItem][hoveredSubCategory] &&
                getProductCategory[hoveredItem][hoveredSubCategory].map(
                  (product_category) => (
                    <div className="col-lg-2" style={{ padding: "15px" }}>
                      <Link
                        // to={`/${hoveredItem}/${hoveredSubCategory}/${product_category}`}
                        href={`/main-category/${hoveredItem.replace(
                          / /g,
                          "-"
                        )}/${hoveredSubCategory.replace(
                          / /g,
                          "-"
                        )}/${product_category.product.replace(/ /g, "-")}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {product_category.product}
                      </Link>
                    </div>
                  )
                )}
            </div>
          </span>
        </div>
      </div>
      {/* )} */}
    </nav>
  );
};

export default Navbar;
