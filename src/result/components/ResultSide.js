import logo from "../../images/logo.jpg";

const ResultSide = () => {
  return (
    <div className="sideDiv1">
      <div className="sideDiv2">
        <img
          src={logo}
          style={{ width: 70, height: 70, borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default ResultSide;
