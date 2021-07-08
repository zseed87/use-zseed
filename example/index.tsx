import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useTable } from '../.';
import { Table } from "antd";

const App = () => {
  const {
		//table属性参数
		tableProps,
	} = useTable<any>({
		// table cols 字段
		columns: [
      {
        title: "归属城市",
        dataIndex: "city",
        key: "city",
        width: "10%",
      },
      {
        title: "归属小镇",
        dataIndex: "town",
        key: "town",
        width: "20%",
      }
    ],
	});


  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
