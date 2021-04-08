import API from './API';
import FilterBuilder from './FilterBuilder';
declare const CloudAPIClient: {
    API: typeof API;
    FilterBuilder: typeof FilterBuilder;
};
export default CloudAPIClient;
