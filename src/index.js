import React, { Component } from 'react'
import styled from 'styled-components'

const CloseableTabs = styled.div`
  margin: 10px;
`
const TabContent = styled.div`
  padding: 10px;
`
const TabPanel = styled.div`
  padding: 10px 10px 0;
  background: ${props => props.tabPanelColor || '#f2f2f2'};
  display: flex;
  flex-wrap: wrap;

  button.tab {
    border: none;
    background: none;
    display: inline-flex;
    vertical-align: middle;
    padding: 4px 10px;
    min-height: 30px;
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &.active {
      border-bottom: 2px solid
        ${props => (props.theme.primary ? props.theme.primary : '#00f')};
    }
    .closeTab {
      width: 20px;
      background: none;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
      position: relative;
      font-size: 0;
      border-radius: 30px;
      opacity: .6;

      &:hover {
        opacity: .6;
        background: #fff;
      }
      &:after,
      &:before {
        content: '';
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
    identifier: this.props.identifier || 'id',
    domActived: {}
  }

  componentWillMount() {
    const { domActived, activeIndex, data } = this.state;
    domActived[activeIndex] = data[activeIndex];
    this.setState({ domActived });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      const newState = {
        data: nextProps.data
      }
      if (Number.isInteger(nextProps.activeIndex)) {
        newState.activeIndex = nextProps.activeIndex
      }
      this.setState(newState)
    }
  }

  handleTabClick = (id, index) => {
    const { domActived, data } = this.state;
    this.props.onBeforeTabClick &&
      this.props.onBeforeTabClick(id, index, this.state.activeIndex)
    domActived[index] = data[index];
    this.setState({ activeIndex: index, domActived }, () => {
      this.props.onTabClick &&
        this.props.onTabClick(id, index, this.state.activeIndex)
    })
  }

  closeTab = (e, id) => {
    e.stopPropagation()
    const activeId = this.state.data[this.state.activeIndex][
      this.state.identifier
    ]
    const newIndex =
      activeId === id ? this.state.activeIndex - 1 : this.state.activeIndex
    let canClose = true;
    if (this.props.onCloseTab) {
      canClose = this.props.onCloseTab(id, newIndex)
    }
    if (canClose !== false) {
      this.setState({
        data: this.state.data.filter(item => item.id !== id),
        activeIndex: newIndex
      })
    }
  }

  render() {
    const { noTabUnmount } = this.props
    const { domActived, activeIndex, data } = this.state
    return (
      <CloseableTabs className={this.props.mainClassName || ''}>
        <TabPanel
          tabPanelColor={this.props.tabPanelColor}
          className={this.props.tabPanelClass || ''}
        >
          {data.map((item, i) => {
            return (
              <button
                className={`tab ${i === activeIndex ? 'active' : ''}`}
                onClick={() => this.handleTabClick(item.id, i)}
                key={item.id || i}
              >
                {item.tab}
                {item.closeable && (
                  <a
                    className="closeTab"
                    title={this.props.closeTitle || 'Close tab'}
                    onClick={e => this.closeTab(e, item.id)}
                  >
                    {this.props.renderClose ? this.props.renderClose() : 'X'}
                  </a>
                )}
              </button>
            )
          })}
        </TabPanel>
        <TabContent className={this.props.tabContentClass || ''}>
          {
            Object.values(domActived).map((item, index) => {
              return (
                <div
                  key={item.id || index}
                  style={{ display: index === activeIndex ? 'block' : 'none' }}
                >
                  {item.component}
                </div>
              )
            })
          }
        </TabContent>
      </CloseableTabs>
    )
  }
}

export default ReactCloseableTabs
