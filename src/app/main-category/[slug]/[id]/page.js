"use client"

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productTitle.css";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from 'next/navigation'



const ProductCategory = () => {

  const pathname = usePathname();
  console.log(pathname)

  
  const mainCategoryPath = pathname.split("/")[2];

  const subCategoryPath = pathname.split("/")[3];
  // const currentMainCategoryPath = useLocation().pathname.split("/")[1]
  const mainCategoryPathModified = mainCategoryPath.replaceAll("-", " ");
  const subCategoryPathModified = subCategoryPath.replaceAll("-", " ");

  console.log(mainCategoryPathModified, subCategoryPathModified);
  const { currentProductCategory } = useSelector((state) => state.categories);
  console.log(currentProductCategory);
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
          <Link href={`/main-category/${mainCategoryPath}`}>
            <span>{mainCategoryPathModified}</span>
          </Link>

          <span>
            <BiChevronRight className="ms-2" />
          </span>
          <Link href={`/main-category/${mainCategoryPath}/${subCategoryPath}`}>
            <span>{subCategoryPathModified}</span>
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
          {currentProductCategory &&
            currentProductCategory[mainCategoryPathModified] &&
            currentProductCategory[mainCategoryPathModified][
              subCategoryPathModified
            ] &&
            currentProductCategory[mainCategoryPathModified][
              subCategoryPathModified
            ].map((productCategory) => (
              <div class="col-md-3">
                <Link
                  href={`/main-category/${mainCategoryPath}/${subCategoryPath}/${productCategory.product.replace(
                    / /g,
                    "-"
                  )}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="main-category-card card ">
                    <div className=" " style={{ height: "100%" }}>
                      <img
                        src={productCategory.images}
                        height="300px"
                        width="300px"
                        alt=""
                      />

                      <div className="imagename">
                        <span>{productCategory.product}</span>
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

export default ProductCategory;
