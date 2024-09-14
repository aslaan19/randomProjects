import React from 'react'
import TabMain from './TabMain';
export default function Tabs() {
    const tabs = [
        {
          label: "Tab 1",
          content: <div>This is content for Tab 1</div>,
        },
        {
          label: "Tab 2",
          content: <div>This is content for Tab 2</div>,
        },
        {
          label: "Tab 3",
          content:<div> Fuck India </div>,
        },
      ];
  
    return ( <TabMain tabcontent={tabs}/>
  )
}
