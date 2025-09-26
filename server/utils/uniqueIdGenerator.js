
import Shipment from '../models/shipmentModel.js';

const UniqueIdGenerator = async () => {

    
    let trackingId;
    let exists = true;
    while (exists) {

        const randomNum = Math.floor(100000 + Math.random() * 900000);
        trackingId = `CE${randomNum}`;

        exists = await Shipment.exists({ trackingId });
    }

    return trackingId;
}

export default UniqueIdGenerator;
