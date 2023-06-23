"use client"

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { BiChevronRight } from "react-icons/bi";
import "./subCategory.css";
import Link from "next/link";
import { usePathname } from 'next/navigation'


const SubCategory = () => {

  const pathname = usePathname();
  console.log(pathname)
  // const currentPath = router.asPath;

  const path = pathname.split("/")[2];
  // const currentMainCategoryPath = useLocation().pathname.split("/")[1]
  const pathmodified = path.replaceAll("-", " ");

  console.log(pathmodified);
  const { currentSubCategory } = useSelector((state) => state.categories);
  console.log(currentSubCategory);
  return (
    <div>
      <div class="container">
        <div
          className="d-flex align-items-start breadcrum"
          style={{ alignItems: "center" }}
        >
          <Link href={`/main-category`}>
            <span>Main Category</span>
          </Link>

          <span>
            <BiChevronRight className="ms-2" />
          </span>
          <Link href={`/main-category/${path}`}>
            <span>{pathmodified}</span>
          </Link>
        </div>

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
          {currentSubCategory &&
            currentSubCategory[pathmodified].map((subCategory) => (
              <div class="col-md-3">
                <Link
                  href={`/main-category/${path}/${subCategory.sub_category.replace(
                    / /g,
                    "-"
                  )}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="main-category-card card ">
                    <div className=" " style={{ height: "100%" }}>
                      <img
                        src={subCategory.image}
                        height="300px"
                        width="300px"
                        alt=""
                      />

                      <div className="imagename">
                        <span>{subCategory.sub_category}</span>
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

export default SubCategory;
