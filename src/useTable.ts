import { Page, Res } from "./index.type";
import { ColumnsType, TableProps } from "antd/lib/table";
import useSetState from "./useSetState";

type Props<T> = {
	columns: ColumnsType<T>;
	request?: (reqs: any) => Promise<Res>;
	onChange?: (page: number, pageSize?: number) => void;
	noPagination?: boolean;
	page?: Page;
	parseData?: (data: T[], page?: Page) => Promise<T[]> | T[];
	listParams?: any;
};

type TableData<T> = {
	list: T[];
	columns: ColumnsType<T>;
	loading: boolean;
	page: Page;
	searchParams: any;
};

type ReturnType<T> = {
	tableProps: TableProps<T>;
	data: TableData<T>;
	setData: (patch: Partial<TableData<T>> | ((prevState: TableData<T>) => void)) => void;
	loadData: (isCurrentPage?: boolean, callback?: (res: any) => void) => Promise<void>;
	searchData: (searchParams: any, callback?: (res: any) => void) => Promise<void>;
	setLoading: (loading: boolean) => void;
};

/**
 * 表格Hook
 * @param {Props<T>} { columns: ColumnsType<T>, onChange?: (page: number, pageSize: number) => void, page?: Page }
 * @returns {ReturnType<T>} { tableProps, data, setData }
 */
function useTable<T>(config: Props<T>): ReturnType<T> {
	// 当前表格列表数据相关参数
	const [data, setData] = useSetState<TableData<T>>({
		list: [],
		columns: config.columns,
		loading: false,
		page: config.page
			? config.page
			: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
			  },
		searchParams: {},
	});

	const setLoading = (loading: boolean) => {
		setData({ loading });
	};

	const onChange = async (pageNum: number, pageSize?: number): Promise<void> => {
		await getData(
			{
				pageNum,
				pageSize: pageSize ?? data.page.pageSize,
			},
			data.searchParams
		);
	};

	const getData = async (
		page: any = {
			pageNum: data.page.pageNum,
			pageSize: data.page.pageSize,
		},
		searchParams?: any,
		callback?: (res: any) => void
	): Promise<void> => {
		if (!config.request) {
			return;
		}
		setLoading(true);
		const reqs = {
			...page,
			...(searchParams ?? {}),
			...(config.listParams ?? {}),
		};
		try {
			const res = await config.request(reqs);
			if (res && (res.code === 0 || res.code === 200)) {
				setData({
					list: config.parseData
						? config.parseData(res.data.list || (res.data.length ? res.data : []), page)
						: res.data.list || (res.data.length ? res.data : []),
					page: {
						pageNum: page.pageNum,
						pageSize: page.pageSize,
						total: res.data.total,
					},
					loading: false,
					searchParams: searchParams ?? {},
				});
				callback && callback(res);
			}
		} catch {
			setLoading(false);
		}
	};

	// 函数 - 查询当前页面所需列表数据
	const loadData = async (isCurrentPage?: boolean, callback?: (res: any) => void): Promise<void> => {
		if (isCurrentPage) {
			return await getData(
				{
					pageNum: data.page.pageNum,
					pageSize: data.page.pageSize,
				},
				data.searchParams,
				callback
			);
		} else {
			return await getData(
				{
					pageNum: 1,
					pageSize: data.page.pageSize,
				},
				data.searchParams,
				callback
			);
		}
	};

	const searchData = async (searchParams: any, callback?: (res: any) => void) => {
		return await getData(
			{
				pageNum: 1,
				pageSize: data.page.pageSize,
			},
			searchParams,
			callback
		);
	};

	return {
		tableProps: {
			bordered: true,
			size: "middle",
			columns: data.columns,
			loading: data.loading,
			dataSource: data.list,
			pagination: !config.noPagination
				? {
						total: data.page.total,
						current: data.page.pageNum,
						pageSize: data.page.pageSize,
						showQuickJumper: true,
						showTotal: (t: any) => `共 ${t} 条数据`,
						onChange: config.onChange || onChange,
				  }
				: false,
		},
		data,
		setData,
		loadData,
		searchData,
		setLoading,
	};
}

export default useTable;
