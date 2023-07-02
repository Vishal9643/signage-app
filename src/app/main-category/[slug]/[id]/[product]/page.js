"use client"

import React, { useEffect, useState } from "react";
import "./products.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from "axios";
import Link from "next/link";
import { usePathname } from 'next/navigation'
// import ImageWithCustomText from "../components/ImageWithCustomText";
console.log("hi")

const Products = () => {
    const pathname = usePathname();
    console.log(pathname,",,,,,,,,,sdfsf")
  const path = pathname.split("/")[3];
  console.log(path,"vfdffff")
  const pathId = path.split("-")[1];
  const [selectedSize, setSelectedSize] = useState(""); // Add state for selected size
  const [selectedMaterial, setSelectedMaterial] = useState(""); // Add state for selected size
  const [getData, setData] = useState([]);
  // const [getImages, setImages] = useState([])

  /////////////////

  console.log(getData);

  /////////////////

  const handleSizeClick = (size) => {
    // alert(typeof size)
    setSelectedSize(size); // Update selected size state when a size is clicked
  };

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material); // Update selected size state when a size is clicked
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const changeQuantity = (e) => {
    e.preventDefault();

    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://signage-backend.onrender.com/getsingleproduct?path=${pathId}`
      );
      setData(res.data);
    };

    fetchData();
  }, [path]);

  return (
    <div className="container">
      <p style={{ fontSize: "35px", marginLeft: "20px" }}>{getData.title}</p>

      <hr />
     
      <div className="row">
        <div className="col-lg-9" style={{ height: "auto", padding: "20px" }}>
          <div className="row">
            <div className="col-lg-5">
              <div className="product_images" style={{ height: "100%" }}>
                <Carousel>
                  {getData.images &&
                    getData.images.map((images) => (
                      <div>
                        <img src={images.url} />
                        {/* <p className="legend">Legend 1</p> */}
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="product-size">
                <p style={{ fontSize: "20pt" }}>Size: {selectedSize}</p>
                <ul className="select-size">
                  {getData.size &&
                    getData.size.map((size) => (
                      <li
                        className={selectedSize === size ? "selected" : ""}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </li>
                    ))}
                </ul>
              </div>
              <hr />
              <div className="product-material">
                <p style={{ fontSize: "20pt" }}>
                  Material:{" "}
                  <span style={{ fontSize: "16pt" }}>{selectedMaterial}</span>
                </p>
                {getData.material &&
                  getData.material.map((material) => (
                    <div class="form-check">
                      <input
                        className={
                          selectedMaterial === material
                            ? "selected form-check-input"
                            : "form-check-input"
                        }
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked
                        onClick={() => handleMaterialClick(material)}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        {material}
                      </label>
                    </div>
                  ))}
              </div>
              <hr />
              <div className="price">
                <p style={{ fontSize: "20pt" }}>Rs. {getData.price}</p>
              </div>
              <hr />
              <div className="description">
                <p style={{ fontSize: "20pt" }}>Description</p>
                <p align="justify">{getData.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3"
          style={{
            padding: "20px",
            backgroundColor: "#f2f2f2",
            height: "50vh",
            borderRadius: "15px",
          }}
        >
          <div>
            <p>Rs.{getData.price} (Inc. of all taxes)</p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                // marginTop: "-20px",
              }}
            >
              Rs.{getData.price * quantity}
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "400",
                // marginTop: "-20px",
              }}
            >
              Quantity:
              <span>
                {/* <div class="input-group w-auto justify-content-end align-items-center"> */}
                <input
                  type="button"
                  value="-"
                  class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                  data-field="quantity"
                  onClick={decreaseQuantity}
                />
                <input
                  type="number"
                  step="1"
                  max="100"
                  value={quantity}
                  name="quantity"
                  class="quantity-field border-0 text-center w-25"
                  onChange={changeQuantity}
                />
                <input
                  type="button"
                  value="+"
                  class="button-plus border rounded-circle icon-shape icon-sm "
                  data-field="quantity"
                  onClick={increaseQuantity}
                />
                {/* </div> */}
              </span>
            </p>
            <button
              style={{
                width: "100%",
                background: "green",
                borderRadius: "10px",
                border: "none",
                padding: "10px",
                color: "white",
                fontWeight: "700",
                fontSize: "1.25rem",
              }}
            >
              Add to list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
