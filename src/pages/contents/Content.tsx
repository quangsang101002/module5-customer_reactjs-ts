import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import productAPI from "../../apis/product/product.api";
import getStaticFileUrl from "../../utilities/number.util";
import { Link } from "react-router-dom";
import style from "./Content.module.scss";
import { Howl, Howler } from "howler";
import { Product } from "../interface/product-interface";

function Content() {
  const [search, setSearch] = useState<string>("");
  const [displayProduct, setDisplayProduct] = useState<Product[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [numberMin, setNumberMin] = useState<string>("");
  const [numberMax, setNumberMax] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number>(0); // Thêm state cho priceMin
  const [priceMax, setPriceMax] = useState<number>(0); // Thêm state cho priceMax

  useEffect(() => {
    searchProducts();
  }, [search, numberMin, numberMax]);

  useEffect(() => {
    const soundFilePath = require("../../../src/music/Cool Revenge - Jeremy Blake.mp3");

    const sound = new Howl({
      src: [soundFilePath.default],
      autoplay: false,
      loop: true,
      volume: 0.5,
      onloaderror: (soundId, error) => {
        console.error("Error loading sound:1", error);
      },
      onplayerror: (soundId, error) => {
        console.error("Error playing sound:2", error);
      },
    });
    Howler.volume(0.5);
    sound.play();

    return () => {
      sound.stop();
    };
    console.log("vvvvvvvvvvvvvvv--------------------------------------------");
  }, []);

  const searchProducts = async () => {
    try {
      const response = await productAPI.SearchProduct("", 7, 1);
      console.log(response);
      if (response) {
        setDisplayProduct(response[0]);
        setTotalProduct(response[1]);
      } else {
        alert(1);
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };

  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(parseInt(event.target.value));

    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành s
    setPriceMin(parseInt(numericValue)); // Lưu dưới dạng số
    setNumberMin(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

  const handlePriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(parseInt(event.target.value));

    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành s
    setPriceMax(parseInt(numericValue)); // Lưu dưới dạng số
    setNumberMax(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

  const handleSearchPrice = () => {
    const i = displayProduct.filter(
      (product) =>
        priceMax >= product.unit_price && priceMax <= product.unit_price
    );
    setDisplayProduct(i);
  };

  return (
    <>
      <audio controls>
        <source
          src="../../../src/music/Cool Revenge - Jeremy Blake.mp3"
          type="audio/ogg"
        />
        <source src="horse.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="row">
        <div className="col-2">
          <span>Khoảng Giá</span>

          <div className="d-flex mb-3">
            <input
              type="text"
              placeholder="từ"
              value={numberMin} // Giá trị thể hiện cho priceMin
              onChange={handlePriceMinChange}
            />
            {" - "}
            <input
              type="text"
              placeholder="đến"
              value={numberMax} // Giá trị thể hiện cho priceMax
              onChange={handlePriceMaxChange}
            />
          </div>
          <button style={{ width: "100%" }} onClick={handleSearchPrice}>
            Áp Dụng
          </button>
        </div>

        <div className="col-10">
          <div className={style.wrapper_input}>
            <input
              type="search"
              placeholder="tìm kiếm sản phẩm"
              onChange={searchProduct}
            />
          </div>
          <Row xs={1} md={5} className="g-6">
            {displayProduct.map((product, idx) => {
              const inputString = product.gallery;
              const parts = inputString.split(",");

              return (
                <Link to={`/productdetail/${product.id}`} key={idx}>
                  <Col style={{ paddingBottom: "24px" }}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={getStaticFileUrl(product.avatar)}
                      />
                      <Card.Body className="text-center">
                        <Card.Title>{product.name_product}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>
                          <h2>
                            {product.unit_price.toLocaleString("vi-VN")}
                            <sup>đ</sup>
                          </h2>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Content;
