import { Input, Avatar } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import PropTypes from "prop-types";
import Notification from "../../components/notification/Notification";
import { DP } from "../../assets/image";

const Header = ({ showSearch, handleSearch }) => {

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      handleSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  return (
    <div className="flex items-center justify-between w-full bg-whiteColor py-3">

      {/* Right Side: Search + Notification + Avatar */}
      <div className="flex items-center gap-4 mr-5">
        {showSearch && (
          <Input
            placeholder="Search"
            prefix={<BiSearchAlt className="text-greenColor size-[20px]" />}
            className="w-[400px] h-10 rounded-lg font-custom border border-gray-200 bg-white"
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          />
        )}

        {/* Notification Icon */}
        <Notification />

        {/* Avatar */}
        {/* <Avatar
          size={1}
          className="cursor-pointer w-[40px] h-[40px]"
          src="https://tinyjpg.com/images/social/website.jpg"
        /> */}
        <Avatar
          size={1}
          src={DP}
          className="cursor-pointer w-[55px] h-[50px] opacity-100 rounded-[8px] pt-[5px] pr-[8px] pb-[5px] pl-[8px]"
        />

      </div>
    </div>
  );
};

Header.propTypes = {
  showSearch: PropTypes.bool,
  handleSearch: PropTypes.func,
};

export default Header;
