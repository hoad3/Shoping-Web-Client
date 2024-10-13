
import {addDelivery} from "../Thunks/DeliveryThunk";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const addDeliveryAction = (dispatch, thanhtoanid, idshipper, idnguoimua, idnguoiban) => {
    const formData = {
        deliveryid: 0,
        idshipper: idshipper,
        thanhtoanid: thanhtoanid, // lấy từ component cha
        pickuptime: new Date().toISOString(),
        deliverytime: new Date().toISOString(),
        deliverystatus: 0,
        idnguoimua: idnguoimua,
        idnguoiban: idnguoiban,
    };

    // Gửi dispatch hành động thêm delivery
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(addDelivery(formData));
};

export default addDeliveryAction;