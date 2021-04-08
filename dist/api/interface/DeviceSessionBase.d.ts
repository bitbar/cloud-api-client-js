import APIResource from '../APIResource';
import InputFileset from '../class/InputFileset';
import OutputFileset from '../class/OutputFileset';
interface DeviceSessionBase extends APIResource {
    input(): InputFileset;
    output(): OutputFileset;
}
export default DeviceSessionBase;
