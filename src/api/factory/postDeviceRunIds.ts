import APIEntity from '../APIEntity';
import APIResource from '../APIResource';

function postDeviceRunIds (parent: APIEntity, name: string, ids?: Array<number>) {
    const a = new APIResource(parent).push(name);

    if (ids != null) {
      a.params({
        deviceRunIds: ids
      });
    }

    return a.post(); 
}

export default postDeviceRunIds;
