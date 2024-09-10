import { useSnackbar } from 'notistack';

const errorNoCart = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { enqueueSnackbar } = useSnackbar();

    const showSuccessNotification = () => {

    };

    const showErrorNotification = () => {
        enqueueSnackbar('Đã xảy ra lỗi!', { variant: 'error' });
    };

    return (
        <div>
            <button onClick={showSuccessNotification}>Hiển thị thành công</button>
            <button onClick={showErrorNotification}>Hiển thị lỗi</button>
        </div>
    );
};
export default errorNoCart;