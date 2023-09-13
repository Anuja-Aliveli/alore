import { Component } from "react";
import { RiTodoLine, RiGraduationCapLine } from "react-icons/ri";
import {
  MdOutlineCelebration,
  MdOutlineCloudDownload,
  MdOutlineGridView,
  MdClose,
} from "react-icons/md";
import { FaRegBell, FaChevronDown } from "react-icons/fa";
import { Popup } from "reactjs-popup";
import "./index.css";

const colorPalette = [
  "rgba(207, 223, 255, 1)",
  "rgba(156, 199, 255, 1)",
  "rgba(45, 127, 249, 1)",
  "rgba(0, 103, 255, 1)",
  "rgba(0, 84, 209, 1)",

  "rgba(208, 240, 253, 1)",
  "rgba(119, 209, 243, 1)",
  "rgba(24, 191, 255, 1)",
  "rgba(64, 131, 172, 1)",
  "rgba(11, 118, 183, 1)",

  "rgba(194, 245, 233, 1)",
  "rgba(114, 221, 195, 1)",
  "rgba(32, 217, 210, 1)",
  "rgba(123, 200, 195, 1)",
  "rgba(6, 160, 155, 1)",

  "rgba(255, 179, 200, 1)",
  "rgba(255, 140, 173, 1)",
  "rgba(255, 140, 173, 1)",
  "rgba(255, 0, 73, 1)",
  "rgba(218, 2, 64, 1)",

  "rgba(255, 227, 175, 1)",
  "rgba(255, 214, 140, 1)",
  "rgba(255, 197, 92, 1)",
  "rgba(253, 178, 43, 1)",
  "rgba(232, 149, 0, 1)",

  "rgba(255, 159, 242, 1)",
  "rgba(254, 103, 233, 1)",
  "rgba(246, 56, 220, 1)",
  "rgba(255, 0, 220, 1)",
  "rgba(214, 0, 184, 1)",

  "rgba(255, 181, 152, 1)",
  "rgba(255, 158, 121, 1)",
  "rgba(255, 120, 68, 1)",
  "rgba(255, 71, 0, 1)",
  "rgba(197, 55, 0, 1)",

  "rgba(175, 181, 255, 1)",
  "rgba(142, 150, 255, 1)",
  "rgba(107, 118, 255, 1)",
  "rgba(49, 64, 255, 1)",
  "rgba(0, 19, 255, 1)",

  "rgba(131, 204, 139, 1)",
  "rgba(97, 199, 108, 1)",
  "rgba(32, 201, 51, 1)",
  "rgba(0, 181, 20, 1)",
  "rgba(51, 138, 23, 1)",

  "rgba(238, 238, 238, 1)",
  "rgba(204, 204, 204, 1)",
  "rgba(172, 172, 172, 1)",
  "rgba(102, 102, 102, 1)",
  "rgba(68, 68, 68, 1)",
];

let segments = ["segment1", "segment2", "segment3"];
let tables = [
  {
    segmentName: "segment1",
    color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
    iconName: "smile",
  },
  {
    segmentName: "segment2",
    color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
    iconName: "sweet_smile",
  },
  {
    segmentName: "segment3",
    color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
    iconName: "sunglasses",
  },
];

class Home extends Component {
  state = {
    currentSegment: segments[0],
  };

  renderPopup = (btnName) => (
    <>
      <Popup
        modal
        trigger={
          <button type="button" className="add-segment">
            {btnName}
          </button>
        }
      >
        {(close) => (
          <div className="popup-container">
            <div className="add-head">
              <p>Add a segment</p>
              <MdClose
                onClick={() => close()}
                type="button"
                size={25}
                cursor="pointer"
              />
            </div>
            <div className="section">
              <label htmlFor="name">Name*</label>
              <input type="text" placeholder="Ex: Computer Science" />
            </div>
            <div className="section">
              <label htmlFor="name">Icon</label>
              <input type="text" />
            </div>
            <div className="section">
              <label htmlFor="name">Color</label>
              <input type="text" />
            </div>
            <button type="button" className="button-blue">
              Add
            </button>
            <button type="button" className="button-cancel">Reset</button>
          </div>
        )}
      </Popup>
    </>
  );

  render() {
    const { currentSegment } = this.state;
    return (
      <div className="home-page">
        <div className="left-container">
          <div>
            <h1 className="main-head">Prospector</h1>
            <input
              className="search-input"
              type="search"
              placeholder="Search for a table or segment"
            />
            <p className="segments">Segments</p>
            <div className="tabs-container">
              {segments.map((eachItem) => (
                <button
                  className={
                    currentSegment === eachItem
                      ? "segment-tab blue"
                      : "segment-tab"
                  }
                >
                  {eachItem}
                </button>
              ))}
            </div>
          </div>
          {this.renderPopup("+ Add Segment")}
        </div>
        <div className="right-container">
          <nav>
            <MdOutlineGridView size={25} />
            <FaChevronDown className="nav-icon" />
            <RiTodoLine className="nav-icon" />
            <MdOutlineCelebration className="nav-icon" />
            <RiGraduationCapLine className="nav-icon" />
            <FaRegBell className="nav-icon" />
            <MdOutlineCloudDownload className="nav-icon" />
            <p>Sign out</p>
          </nav>
          {this.renderPopup("Hello")}
        </div>
      </div>
    );
  }
}

export default Home;
