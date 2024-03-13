
import "./add.css"

const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className="stylesmainAddButton">
      Add New Pizza
    </div>
  );
};

export default AddButton;  