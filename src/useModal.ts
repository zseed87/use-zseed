import { OperateType } from "./index.type";
import { ModalProps } from "antd/lib/modal";
import useSetState from "./useSetState";

type Props = {
	type?: OperateType;
	title?: string;
};

type ModalData<T> = {
	data: T | undefined;
	visible: boolean;
	loading: boolean;
	title: string | undefined;
	type: OperateType;
};

export type ReturnType<T> = {
	type: OperateType;
	props: ModalProps;
	data: T | undefined;
	setLoading: (l: boolean) => void;
	show: (v?: T, t?: OperateType, title?: string) => void;
	close: (delay?: number) => void;
};

/**
 * 模态框Hook
 * @param {Props} { type?: OperateType, title?: string }
 */
function useModal<T>(config: Props = {}): ReturnType<T> {
	const [modal, setModal] = useSetState<ModalData<T>>({
		data: undefined,
		visible: false,
		loading: false,
		title: config.title,
		type: config.type || "add",
	});

	const { data, visible, loading, title, type } = modal;

	// 展示
	const show = (v?: T, t?: OperateType, title?: string) => {
		const o: any = { visible: true };
		if (v) {
			o["data"] = v;
		}
		if (t) {
			o["type"] = t;
		}
		if (title) {
			o["title"] = title;
		} else {
			o["title"] = "";
		}
		setModal({
			...o,
		});
	};
	// 隐藏
	const close = (delay?: number) => {
		if (delay) {
			setTimeout(() => setModal({ visible: false }), delay);
		} else {
			setModal({ visible: false });
		}
	};

	return {
		props: {
			title: title || { add: "新增", up: "修改", see: "查看" }[type],
			onCancel: (_e: React.MouseEvent<HTMLElement, MouseEvent>) => close(),
			visible: visible,
			maskClosable: false,
			confirmLoading: loading,
		},
		type,
		data,
		setLoading: (l: boolean) => setModal({ loading: l }),
		show,
		close,
	};
}
export default useModal;
