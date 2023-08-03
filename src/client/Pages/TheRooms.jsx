import React, { useEffect, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { ConfigProvider, Table } from 'antd';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';

const TheRooms = () => {
  const [roominfo, setRoomInfo] = useState([]);
  const toast = useToast();

  // Function to fetch room information from Firebase
  const fetchRoomInfo = async () => {
    try {
      const q = query(collection(db, 'Rooms'), orderBy('createdAt'));
      const querySnapshot = await getDocs(q);

      const rooms = [];
      console.log(rooms)
      querySnapshot.forEach((doc) => {
        rooms.push({
          ...doc.data(),
          _id: doc.id,
        });
      });

      setRoomInfo(rooms);
    } catch (error) {
      console.error('Error fetching room information:', error);
      toast({
        description: 'Error fetching room information',
        status: 'error',
        duration: 5000,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    fetchRoomInfo();
  }, []);

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteDoc(doc(db, 'Rooms', roomId));
      setRoomInfo((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      toast({
        description: 'Room deleted successfully',
        status: 'success',
        duration: 5000,
        position: 'top',
      });
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        description: 'Error deleting room',
        status: 'error',
        duration: 5000,
        position: 'top',
      });
    }
  };

  const columns = [
    {
      title: 'Room Number',
      dataIndex: 'roomno',
      sorter: (a, b) => a?.roomno.localeCompare(b?.roomno),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a?.gender.localeCompare(b?.gender),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, room) => {
        return (
          <div className='flex gap-2'>
            <div>
              <Button colorScheme='green'>Edit</Button>
            </div>
            <div>
              {/* Pass the room ID to the handleDeleteRoom function */}
              <Button colorScheme='red' onClick={() => handleDeleteRoom(room._id)}>
                Delete
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className='text-center flex text-xl ml-5 font-semibold my-7'>Room Information</h1>
      <div className='overflow-x-auto'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#000',
              colorPrimaryTextActive: '#000',
              colorPrimaryText: '#808080',
              colorPrimaryBg: '#fff',
            },
          }}
        >
          <div>
            <Table
              dataSource={roominfo}
              columns={columns}
              loading={roominfo.length === 0} // Show loading while fetching data
              rowKey={(data) => data._id}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ['8', '10', '11'],
              }}
            />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TheRooms;
