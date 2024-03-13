import { useState } from "react";
import  "./add.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dsbyq4sj1/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:5000/api/products/post", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div className="stylescontainer">
      <div className="styleswrapper">
        <span onClick={() => setClose(true)} className="stylesclose">
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className="stylesitem">
          <label className="styleslabel">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="stylesitem">
          <label className="styleslabel">Title</label>
          <input
            className="stylesinput"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="stylesitem">
          <label className="styleslabel">Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="stylesitem">
          <label className="styleslabel">Prices</label>
          <div className="stylespriceContainer">
            <input
              className="stylesinput stylesinputSm"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}  
            />
            <input
              className="stylesinput stylesinputSm"
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className="stylesinput stylesinputSm"
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="stylesitem">
          <label className="styleslabel">Extra</label>
          <div className="stylesextra">
            <input
              className="stylesinput stylesinputSm"
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className="stylesinput stylesinputSm"
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className="stylesextraButton" onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className="stylesextraItems">
            {extraOptions.map((option) => (
              <span key={option.text} className="stylesextraItem">
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className="stylesaddButton"
         onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;