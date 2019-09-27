import React from 'react';
import { render } from 'react-dom';

import CloseableTabs from '../../src';

class Demo extends React.Component {
  state = {
    data: [
      {
        tab: 'List',
        component: <div><h1>Your list</h1></div>,
        id: 0,
        closeable: false
      },
      {
        tab: 'Item detail 1',
        component: <div>Item details for 1</div>,
        id: 1,
        closeable: true
      },
      {
        tab: 'Item detail 2',
        component: <div>Item details for 2</div>,
        id: 2,
        closeable: true
      },
      {
        tab: 'Item detail 3',
        component: <div>Item details for 3</div>,
        id: 3,
        closeable: true
      }
    ]
  };

  addItem = () => {
    const id = new Date().valueOf();
    this.setState({
      data: this.state.data.concat({
        tab: 'New item ' + id,
        component: (
          <div>
            Your new component data for {id.toString().substring(6, 10)}
          </div>
        ),
        id: id,
        closeable: true
      }),
      activeIndex: this.state.data.length
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.addItem}>Add item</button>
        <button onClick={() => this.setState({ activeIndex: 0 })}>Reset index</button>
        <CloseableTabs
          tabPanelColor='lightgray'
          data={this.state.data}
          onCloseTab={(id, newIndex) => {
            this.setState({
              data: this.state.data.filter(item => item.id !== id),
              activeIndex: newIndex
            });
          }}

          activeIndex={this.state.activeIndex}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
