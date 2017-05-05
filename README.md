# React closeable tabs

Simple Closeable tabs with React. 

## Usage

First install package
```
npm i -S react-closeable-tabs (yarn add react-closeable-tabs)
```

To start using closeable tabs, you need to pass `data` prop which is an array of objects. Each object has the following properties:
```
{
  tab: 'Tab text', 
  component: <YourComponent />, 
  id: 'uniqueId', 
  closeable: true
}
```
If you don't want tab to be closeable (not to have X to close it), you can set `closeable` property to `false`.

## Example
```JSX
import React from 'react';
import { render } from 'react-dom';

import CloseableTabs from 'react-closeable-tabs';

class Demo extends React.Component {
  state = {
    data: [
      {
        tab: 'List',
        component: <div><h1>Your list</h1></div>,
        id: 0
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
```

## API

| Prop        | Type           | Default  | Description |
| ------------- |:-------------:| -----:| :--------|
| data     | Array | [] | Array of objects that need to be in the following format: `{tab: 'Tab text', component: <YourComponent />, id: 'uniqueId', closeable: true}`|
| activeIndex      | Number      |   0 | Define which tab is active by default |
| identifier | String      |    id | You can define new key for unique ID in your data object |
| onCloseTab | Function(id, newIndex) | null | Callback function that is invoked after clicking close tab. It passes id of closed object tab |
| onTabClick | Function(id, index) | null | Callback function that is invoked after clicking tab. It passes id of clicked tab |
| onBeforeTabClick | Function(id, newIndex, oldIndex) | null | Callback function that is invoked before clicking tab. It passes id of clicked tab |
| tabPanelColor | String | #f2f2f2 | Background of tabPanel holder |
