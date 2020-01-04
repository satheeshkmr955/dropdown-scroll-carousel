import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./App.module.css";
const filterData = [
  "ITEM1",
  "ITEM2",
  "ITEM3",
  "ITEM4",
  "ITEM5",
  "ITEM6",
  "ITEM7",
  "ITEM8",
  "ITEM9",
  "ITEM10",
  "ITEM11"
];
class App extends Component {
  state = {
    selectedFilter: "",
    toolTipCss: {},
    prevScroll: 0,
    openModal: false,
    showTooltip: false
  };
  componentDidMount() {
    window.addEventListener(
      "scroll",
      () => {
        let { toolTipCss, prevScroll } = this.state;
        let { scrollLeft, offsetLeft, offsetWidth } = document.querySelector(
          "#filter"
        );
        let left = toolTipCss.orgLeft
          ? toolTipCss.orgLeft + prevScroll - scrollLeft
          : 0;
        this.setState({
          toolTipCss: { ...toolTipCss, left: `${left}px`, orgLeft: left },
          prevScroll: scrollLeft,
          showTooltip:
            offsetLeft < left - 8 && left < offsetWidth + offsetLeft / 2
        });
      },
      true
    );
  }

  filterClickHandler = (e, name) => {
    let { openModal, selectedFilter } = this.state;
    let updateModal = !openModal;
    if (selectedFilter !== name) {
      updateModal = true;
    }
    const pos = ReactDOM.findDOMNode(e.target).getBoundingClientRect();
    this.setState({ openModal: updateModal }, () => {
      const category = document
        .querySelector("#category")
        .getBoundingClientRect();
      const left = pos.left - 12 + pos.width / 2;
      const toolTipCss = {
        display: "block",
        left: `${left}px`,
        orgLeft: left,
        top: category.top - 12
      };
      this.setState({ toolTipCss, selectedFilter: name, showTooltip: true });
    });
  };

  render() {
    const { selectedFilter, toolTipCss, openModal, showTooltip } = this.state;
    const filterList = filterData.map((filter, i) => {
      return (
        <div
          key={i}
          className={styles.filterItem}
          onClick={e => {
            this.filterClickHandler(e, filter);
          }}
        >
          {filter}
        </div>
      );
    });
    return (
      <div className={styles.container}>
        <div className={styles.filterContainer} id="filter">
          {filterList}
        </div>
        <div
          className={styles.tooltip}
          style={{ ...toolTipCss, display: showTooltip ? "block" : "none" }}
        ></div>
        <div
          className={styles.filterCategory}
          id="category"
          style={{ display: openModal ? "flex" : "none" }}
        >
          {selectedFilter}
        </div>
      </div>
    );
  }
}

export default App;
