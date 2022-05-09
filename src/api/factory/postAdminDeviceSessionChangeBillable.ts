import {APIEntity} from '../APIEntity';
import {APIResource} from '../APIResource';

export function postAdminDeviceSessionChangeBillable (parent: APIEntity, billable: boolean) {
    const apiResource = new APIResource(parent);
    const deviceSessionId = apiResource.last;

    return apiResource.restack('admin', 'device-sessions', deviceSessionId, 'changebillable').params({
      billable
    }).post();
}

export default postAdminDeviceSessionChangeBillable;
