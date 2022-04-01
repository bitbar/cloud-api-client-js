import {APIEntity} from '../APIEntity';
import {APIResource} from '../APIResource';

export function postAdminDeviceSessionChangeBillable (parent: APIEntity<any>, billable: boolean) {
    const a = new APIResource(parent);
    const deviceSessionId = a.last;

    return a.restack('admin', 'device-sessions', deviceSessionId, 'changebillable').params({
      billable
    }).post();
}

export default postAdminDeviceSessionChangeBillable;
