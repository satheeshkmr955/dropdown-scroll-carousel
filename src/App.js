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
    openModal: false
  };
  componentDidMount() {
    window.addEventListener(
      "scroll",
      () => {
        let { toolTipCss, prevScroll } = this.state;
        let { scrollLeft } = document.querySelector("#filter");
        let left = toolTipCss.orgLeft
          ? toolTipCss.orgLeft + prevScroll - scrollLeft
          : 0;
        this.setState({
          toolTipCss: { ...toolTipCss, left: `${left}px`, orgLeft: left },
          prevScroll: scrollLeft
        });
      },
      true
    );
  }

  filterClickHandler = (e, name) => {
    let { openModal, selectedFilter } = this.state;
    const pos = ReactDOM.findDOMNode(e.target).getBoundingClientRect();
    const left = pos.left;
    const toolTipCss = {
      display: "block",
      left: `${left}px`,
      orgLeft: left
    };
    let updateModal = !openModal;
    if (selectedFilter !== name) {
      updateModal = true;
    }
    this.setState({ toolTipCss, selectedFilter: name, openModal: updateModal });
  };

  render() {
    const { selectedFilter, toolTipCss, openModal } = this.state;
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
          className={styles.filterCategory}
          style={{ display: openModal ? "flex" : "none" }}
        >
          <div className={styles.tooltip} style={{ ...toolTipCss }}></div>
          {selectedFilter}
        </div>
      </div>
    );
  }
}

export default App;
