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
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
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

let segments = [];
let tables = [];

class Home extends Component {
  state = {
    isBlur: false,
    currentSegment: segments[0],
    searchInput: "",
    searchResult: "",
    emojiName: "",
    emojiNative: "🙂",
    isOpen: false,
    isColor: false,
    selectedColor: colorPalette[2],
    segmentName: "",
    tableName: "",
    segmentsArray: segments,
    tablesArray: tables,
  };

  onChangeInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onEnter = (event) => {
    const { searchInput, segmentsArray } = this.state;
    const filtered = segmentsArray.filter(
      (each) => each.segmentName === searchInput
    );
    if (event.key === "Enter") {
      this.setState({ searchResult: filtered });
    }
  };

  selectedEmoji = (emoji) => {
    this.setState({
      emojiName: emoji.name,
      emojiNative: emoji.native,
      isOpen: false,
    });
  };

  onDown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  onColor = () => {
    this.setState((prevState) => ({ isColor: !prevState.isColor }));
  };

  onSelectColor = (color) => {
    this.setState({ isColor: false, selectedColor: color });
  };

  onSegmentName = (event) => {
    this.setState({ segmentName: event.target.value });
  };

  onTableName = (event) => {
    this.setState({ tableName: event.target.value });
  };

  onAddSegment = () => {
    const { segmentName, emojiNative } = this.state;
    const segmentItem = { emojiNative: emojiNative, segmentName: segmentName };
    this.setState((prevState) => ({
      segmentsArray: [...prevState.segmentsArray, segmentItem],
    }));
  };

  onAddTable = (segName) => {
    const { emojiNative, selectedColor, tableName } = this.state;
    const tableItem = {
      tableName: tableName,
      segmentName: segName,
      emojiNative: emojiNative,
      selectedColor: selectedColor,
    };
    this.setState((prevState) => ({
      tablesArray: [...prevState.tablesArray, tableItem],
    }));
  };

  onBlur = () => {
    this.setState((prevState) => ({ isBlur: !prevState.isBlur }));
  };

  renderPopup = (btnName, segName) => {
    const { isOpen, isColor, emojiNative, selectedColor } = this.state;
    const type = btnName === "+ Add Segment" ? "Segment" : "Table";
    return (
      <>
        <Popup
          modal
          onOpen={this.onBlur}
          onClose={this.onBlur}
          trigger={
            btnName === "+ Add Segment" ? (
              <button type="button" className="add-segment">
                {btnName}
              </button>
            ) : (
              <div className="total-table" type="button">
                <div
                  className="table"
                  style={{
                    border: "1.5px solid gray",
                  }}
                >
                  <p className="center">+</p>
                </div>
                <p>Add Table</p>
              </div>
            )
          }
        >
          {(close) => (
            <div className="popup-container">
              <div>
                <div className="add-head">
                  <p>Add a {type}</p>
                  <MdClose
                    type="button"
                    size={25}
                    cursor="pointer"
                    onClick={() => {
                      close();
                    }}
                  />
                </div>
                <div className="section">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    placeholder="Ex: Computer Science"
                    onChange={
                      btnName === "+ Add Segment"
                        ? this.onSegmentName
                        : this.onTableName
                    }
                  />
                </div>
                <div className="section">
                  <label htmlFor="name">Icon</label>
                  <div
                    className="icon-button"
                    onClick={this.onDown}
                    type="button"
                  >
                    <p>{emojiNative}</p>
                    <FaChevronDown className="down" />
                  </div>
                  {isOpen && (
                    <Picker
                      perLine={15}
                      data={data}
                      onEmojiSelect={this.selectedEmoji}
                    />
                  )}
                </div>
                {btnName !== "+ Add Segment" && (
                  <div className="section">
                    <label htmlFor="name">Color</label>
                    <div
                      className="icon-button"
                      type="button"
                      onClick={this.onColor}
                    >
                      <p
                        className="color-option"
                        style={{
                          backgroundColor: `${selectedColor}`,
                          height: "20px",
                          width: "20px",
                        }}
                      >
                        {}
                      </p>
                      <FaChevronDown className="down" />
                    </div>
                    {isColor && (
                      <div className="color-options">
                        {colorPalette.map((color, index) => (
                          <button
                            className="color-option"
                            type="button"
                            key={index}
                            style={{ backgroundColor: color }}
                            onClick={() => this.onSelectColor(color)}
                          >
                            {}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {btnName === "+ Add Segment" && (
                  <div className="section">
                    <label htmlFor="name">Description</label>
                    <textarea rows="10" cols="10" />
                  </div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="button-blue"
                  onClick={() => {
                    close();
                    if (btnName === "+ Add Segment") {
                      this.onAddSegment();
                    } else {
                      this.onAddTable(segName);
                    }
                  }}
                >
                  {btnName === "+ Add Segment" ? "Save" : "Add"}
                </button>

                <button className="button-cancel" onClick={() => close()}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      </>
    );
  };

  changeSegment = (name) => {
    this.setState({ currentSegment: name });
  };

  render() {
    const {
      currentSegment,
      segmentsArray,
      tablesArray,
      searchResult,
      searchInput,
      isBlur,
    } = this.state;
    const finalArray =
      searchResult.length > 0 && searchInput === searchResult[0].segmentName
        ? searchResult
        : segmentsArray;
    return (
      <div className={isBlur ? "home-page blur" : "home-page"}>
        <div className="left-container">
          <div>
            <h1 className="main-head">Prospector</h1>
            <input
              className="search-input"
              type="search"
              placeholder="Search for a table or segment"
              onChange={this.onChangeInput}
              onKeyDown={this.onEnter}
            />
            <p className="segments">Segments</p>
            <div className="tabs-container">
              {finalArray.map((eachItem) => (
                <button
                  key={eachItem}
                  className={
                    currentSegment === eachItem.segmentName
                      ? "segment-tab blue"
                      : "segment-tab"
                  }
                  onClick={() => this.changeSegment(eachItem.segmentName)}
                >
                  <p>{eachItem.emojiNative}</p>
                  <p>{eachItem.segmentName}</p>
                </button>
              ))}
            </div>
          </div>
          {this.renderPopup("+ Add Segment", "")}
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
          {segmentsArray.map((eachSeg, index) => (
            <div className="section-container" key={index}>
              <div className="segment-head">
                <p>{eachSeg.emojiNative}</p>
                <p>{eachSeg.segmentName}</p>
              </div>
              <div className="tables-container">
                {tablesArray.map((eachTable, index) => {
                  if (eachSeg.segmentName === eachTable.segmentName) {
                    return (
                      <div className="total-table">
                        <div
                          className="table"
                          style={{
                            border: `1.5px solid ${eachTable.selectedColor}`,
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: `${eachTable.selectedColor}`,
                            }}
                            className="dot"
                          ></div>
                          <p className="emoji">{eachTable.emojiNative}</p>
                        </div>
                        <p>{eachTable.tableName}</p>
                      </div>
                    );
                  }
                  return null;
                })}
                {this.renderPopup("+", eachSeg.segmentName)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
