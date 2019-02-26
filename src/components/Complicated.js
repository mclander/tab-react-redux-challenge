import React, {Component} from 'react';
import {Tabs, DragTabList, DragTab, PanelList, Panel, ExtraButton} from 'react-tabtab';
// import Plus from 'react-icons/lib/fa/plus';
//mport {simpleSwitch} from '../../src/helpers/move';

import {arrayMove as simpleSwitch} from 'react-sortable-hoc';
import {makeData} from './utils';


export default class Complicated extends Component {
  constructor(props) {
    super(props);
    const tabs = makeData(10, 'Drag');

    this.state = {
      tabs,
      activeIndex: 0,
      numberOfTabs: tabs.length,
    };
  }

 
  handleTabChange = index => {
    this.setState({activeIndex: index});
  }

  handleTabSequenceChange = ({oldIndex, newIndex}) => {
    const {tabs} = this.state;
    const updateTabs = simpleSwitch(tabs, oldIndex, newIndex);
    this.setState({tabs: updateTabs, activeIndex: newIndex});
  }

  handleEdit = ({type, index}) => {
    this.setState((state) => {
      let {tabs, activeIndex} = state;
      if (type === 'delete') {
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return {tabs, activeIndex};
    });
  }

  handleChangeTabsNumber = e => {
    let number = e.target.value;
    if (number <= 0 || !number) {
      number = 1;
    }
    if (number > 3000) {
      number = 3000;
    }
    const tabs = makeData(number, 'Drag');
    this.setState({tabs, activeIndex: 0, numberOfTabs: number});
  }


  render() {
    const {tabs, activeIndex, numberOfTabs, showArrow, showModal, showExtra} = this.state;
    const tabTemplate = [<DragTab key={-1}>Article List</DragTab>];
    const panelTemplate = [<Panel key={-1}>List:</Panel>];
    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(<DragTab key={i} closable={closable}>{tab.title}</DragTab>);
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    })

    return (
      <div>
        <Tabs onTabEdit={this.handleEdit}
              onTabChange={this.handleTabChange}
              activeIndex={activeIndex}
              customStyle={this.props.customStyle}
              onTabSequenceChange={this.handleTabSequenceChange}
              showArrowButton={showArrow}
        >
          <DragTabList>
            {tabTemplate}
          </DragTabList>
          <PanelList>
            {panelTemplate}
          </PanelList>
        </Tabs>
      </div>
    )
  }
}