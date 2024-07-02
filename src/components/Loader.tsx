import { Audio } from "react-loader-spinner";
const Loader = () => {
  return (
    <div>
      <Audio
        height="60"
        width="60"
        color="#2f97b1"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
