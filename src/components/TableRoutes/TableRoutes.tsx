import React, {useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {Table} from "antd";
import {TableRowSelection} from "antd/es/table/interface";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  DataTableType,
  selectRoute,
  selectRouteLoading,
  selectRoutes
} from "../../features/routing/routingSlice";

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

const columns: ColumnsType<DataTableType> = [
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

const TableRoutes = () => {

  // const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const dispatch = useAppDispatch()
  const dataRoutes = useAppSelector(selectRoutes)
  const loading = useAppSelector((selectRouteLoading))

  const rowSelection: TableRowSelection<DataTableType> = {
    // selectedRowKeys,
    // onChange: onSelectedRowKeysChange,
    onSelect: (record, selected, selectedRows) => {
      console.log(record)
      dispatch(selectRoute(record))
    },
    // onChange: (_, selectedRows) => {
      // console.log(selectedRows[0])
      // dispatch(selectRoute(selectedRows[0]))
    // },
    type: 'radio',
    hideSelectAll: true,
  }

  const onRowFn = (record: DataTableType, index: number | undefined) => {
    return {
      onClick: () => {
        // console.log('Click Table Row!!!')
        // dispatch(selectRoute(record))
        // setSelectedRowKeys([String(index)])
      }
    }
  }

  return (
    <div>
      <Table columns={columns}
             dataSource={dataRoutes}
             pagination={false}

             rowSelection={rowSelection}

             onRow={onRowFn}
      />
    </div>
  );
};

export default TableRoutes;
