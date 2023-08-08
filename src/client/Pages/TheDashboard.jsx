import React from 'react'
import RegisteredUsers from './RegisteredUsers'
import Navbar from '../Components/Navbar'
import BookingInfo from './BookingInfo'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
const TheDashboard = () => {
  return (
    <div>
      <Navbar/>
      8<div className='mt-20' >
      <Tabs>
  <div className='fixed bg-white border-b w-full overflow-x-auto mt-3'>
  <TabList>
    <Tab>Registered Tenants</Tab>
    <Tab>Booking Information</Tab>
    <Tab>Three</Tab>
  </TabList>
  </div>
<div  className='overflow-x-auto'>
<TabPanels>
    <TabPanel>
    <RegisteredUsers/>
    </TabPanel>
    <TabPanel>
    <BookingInfo/>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</div>
 
</Tabs>
      </div>
     
    </div>
  )
}

export default TheDashboard