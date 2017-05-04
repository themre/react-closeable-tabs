import React, { Component } from 'react';
import styled from 'styled-components';


const CloseableTabs = styled.div`
  margin: 10px;
`
const TabContent = styled.div`
  padding: 10px;
`
const TabPanel = styled.div`
  padding: 10px 10px 0;
  background: ${props => props.tabPanelColor || '#f2f2f2'};

  span {
    display: inline-block;
    vertical-align: middle;
    padding: 4px 10px;
    cursor: pointer;

    &.active {
      border-bottom: 2px solid ${props => props.theme.primary ? props.theme.primary : '#00f'};
    }
    .closeTab {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
      position: relative;
      font-size: 0;
      border-radius: 30px;

      &:hover {
        background: #fff;
      }
      &:after, &:before {
        content: "";
        display: block;
        width: 12px;
        height: 3px;
        position: absolute;
        left: 4px;
        top: 8px;
        background: #333;
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
`
class ReactCloseableTabs extends Component {
  state = {
    data: this.props.data,
    activeIndex: this.props.activeIndex || 0,
    identifier: this.props.identifier || 'id'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data || nextProps.activeIndex) {
      this.setState({
        data: nextProps.data || this.state.data,
        // activeIndex: nextProps.activeIndex !== this.state.activeIndex ? nextProps.activeIndex this.state.activeIndex
      })
    }
  }
  
  handleTabClick = (id, index) => {
    this.props.onBeforeTabClick && this.props.onBeforeTabClick(id)
    this.setState({ activeIndex: index }, () => {
      this.props.onTabClick && this.props.onTabClick(id)
    });
  };

  closeTab = (e, id) => {
    e.stopPropagation()
    const activeId = this.state.data[this.state.activeIndex][this.state.identifier]
    this.props.onCloseTab && this.props.onCloseTab(id)
    this.setState({
      data: this.state.data.filter(item => item.id !== id),
      activeIndex: activeId === id ? this.state.data.length - 2 : this.state.activeIndex
    })
  }

  render() {
    const { data, activeIndex } = this.state;
    return (
      <CloseableTabs>
        <TabPanel tabPanelColor={this.props.tabPanelColor}>
          {data.map((item, i) => (
            <span
              className={i === activeIndex && 'active'}
              onClick={() => this.handleTabClick(item.id, i)}
              key={i}
            >
              {item.tab}
              {item.closeable && <a className='closeTab' onClick={e => this.closeTab(e, item.id)}>X</a>}
            </span>
          ))}
        </TabPanel>
        <TabContent>{data[activeIndex] ? data[activeIndex].component : <div />}</TabContent>
      </CloseableTabs>
    );
  }
}

export default ReactCloseableTabs;
