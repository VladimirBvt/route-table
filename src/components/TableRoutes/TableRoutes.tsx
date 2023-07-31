import React, {useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {Table} from "antd";
import {TableRowSelection} from "antd/es/table/interface";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRoute, selectRoutes} from "../../features/routing/routingSlice";

export interface DataType {
  key: string;
  routes: string;
  point1: string[];
  point2: string[];
  point3: string[];
}

const renderFn = (coordinates: string[]) => {
  return (
    <div>
      {coordinates.map((coordinate: string, index: number) => {
          const comma = index === 0 ? ',' : ''
          return (<div key={index}> {coordinate}{comma} </div>)
        }
      )}
    </div>
  )
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Маршруты',
    dataIndex: 'routes',
    key: 'routes',
  },
  {
    title: 'Точка 1 (lat, lng)',
    dataIndex: 'point1',
    key: 'point1',
    render: renderFn,
  },
  {
    title: 'Точка 2 (lat, lng)',
    dataIndex: 'point2',
    key: 'point2',
    render: renderFn,
  },
  {
    title: 'Точка 3 (lat, lng)',
    dataIndex: 'point3',
    key: 'point3',
    render: renderFn,
  },
]

// const data: DataType[] = [
//   {
//     key: '1',
//     routes: 'Маршрут №1',
//     point1: ['59.84660399', '30.29496392'],
//     point2: ['59.82934196', '30.42423701'],
//     point3: ['59.83567701', '30.38064206'],
//   },
//   {
//     key: '2',
//     routes: 'Маршрут №2',
//     point1: ['59.82934196', '30.42423701'],
//     point2: ['59.82761295', '30.41705607'],
//     point3: ['59.84660399', '30.29496392'],
//   },
//   {
//     key: '3',
//     routes: 'Маршрут №3',
//     point1: ['59.83567701', '30.38064206'],
//     point2: ['59.84660399', '30.29496392'],
//     point3: ['59.82761295', '30.41705607'],
//   },
// ]


const TableRoutes = () => {

  const dispatch = useAppDispatch()
  const dataRoutes = useAppSelector(selectRoutes)

  // const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  // const selectRow = (record: DataType) => {
    // const selectedRowKeysTemp = [...selectedRowKeys]
    // if (selectedRowKeysTemp.indexOf(record.key) >= 0) {
    //   selectedRowKeysTemp.splice(selectedRowKeysTemp.indexOf(record.key), 1)
    // } else {
    //   selectedRowKeysTemp.push(record.key)
    // }
    // setSelectedRowKeys(selectedRowKeysTemp)
  // }

  // const onSelectedRowKeysChange = (selectedRowKeys: string[]) => {
    // setSelectedRowKeys(selectedRowKeys)
  // }

  const rowSelection: TableRowSelection<DataType> = {
    // selectedRowKeys,
    // onChange: onSelectedRowKeysChange,
    onSelect: (record: DataType, selected: boolean, selectedRows: DataType[]) => {
      // console.log({record})

      dispatch(selectRoute(record))
    },
    type: 'radio',
    hideSelectAll: true,
  }

  return (
    <div>
      <Table columns={columns}
             dataSource={dataRoutes}
             pagination={false}

             rowSelection={rowSelection}

             onRow={(record: DataType, index) => ({
               // onClick: () => selectRow(record)
        })}
      />
    </div>
  );
};

export default TableRoutes;
