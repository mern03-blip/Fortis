import PropTypes from "prop-types";
import { Pagination, Button } from "antd";
import { MdArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const CustomPagination = ({ current, onChange, total, pageSize = 10 }) => {
  const DoubleLeftIcon = () => (
    <span>
      <MdArrowBackIos />
      <MdArrowBackIos className="ml-[-10px] opacity-50" />
    </span>
  );

  const DoubleRightIcon = () => (
    <span>
      <MdOutlineArrowForwardIos className="opacity-50" />
      <MdOutlineArrowForwardIos className="ml-[-10px]" />
    </span>
  );

  return (
    <div className="custom-pagination-container">
      <Pagination
        className="mb-20"
        current={current}
        onChange={onChange}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={false}
        itemRender={(page, type) => {
          if (type === "prev") {
            return (
              <Button
                shape="round"
                className={`bg-secondaryColor text-whiteColor font-custom p-5 ${
                  current === 1 ? "opacity-50" : "active-button"
                }`}
                disabled={current === 1}
                onClick={() => onChange(current - 1)}
              >
                <DoubleLeftIcon />
              </Button>
            );
          }
          if (type === "next") {
            return (
              <Button
                shape="round"
                className={`bg-secondaryColor text-whiteColor font-custom p-5 ${
                  current === Math.ceil(total / pageSize)
                    ? "opacity-50"
                    : "active-button"
                }`}
                disabled={current === Math.ceil(total / pageSize)}
                onClick={() => onChange(current + 1)}
              >
                <DoubleRightIcon />
              </Button>
            );
          }
        }}
      />
    </div>
  );
};

CustomPagination.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
};

export default CustomPagination;
