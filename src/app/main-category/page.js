"use client"

import React from "react";
import "./mainCategory.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


const MainCategory = () => {
  const { currentMainCategory } = useSelector((state) => state.categories);
  console.log(currentMainCategory);

  return (
    <div>
      <div class="container">
        <div></div>
        <div class="d-flex justify-content-center align-items-center mt-5">
          {" "}
          <button class="category-btn btn btn-dark">OUR CATEGORIES</button>{" "}
        </div>
        <div class="d-flex justify-content-center mt-3">
          {" "}
          <span class="text text-center">
            Finding Best Products Now
            <br /> in Your Fingertips
          </span>{" "}
        </div>
        <div class="row mt-2 g-4">
          {currentMainCategory &&
            currentMainCategory.map((mainCategory) => (
              <div class="col-md-3">
                <Link
                  href={`/main-category/${mainCategory.main_category.replace(
                    / /g,
                    "-"
                  )}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="main-category-card card ">
                    <div className=" " style={{ height: "100%" }}>
                      <img
                        src={mainCategory.imageUrl}
                        height="300px"
                        width="300px"
                        alt=""
                      />

                      <div className="imagename">
                        <span>{mainCategory.main_category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategory;