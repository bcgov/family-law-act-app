import store from '@/store/index'
import Axios from "axios";

export async function GetFilingLocations() {

    var response = await Axios.get('/efiling/locations/');
    
    if(response?.data){
        const locationsInfo = response.data 
        const locationNames = Object.keys(response.data);
        const locations = []
        for (const location of locationNames){
            const locationInfo = locationsInfo[location];              
            
            const address = (locationInfo.address_1?(locationInfo.address_1):'')  + 
                            (locationInfo.address_2?(', ' + locationInfo.address_2):'') + 
                            (locationInfo.address_3?(', ' + locationInfo.address_3):'') +
                            (((locationInfo.address_1 && locationInfo.address_1.trim()) || (locationInfo.address_2 && locationInfo.address_2.trim()) || (locationInfo.address_3 && locationInfo.address_3.trim()))?', ':'') +                               
                            (locationInfo.city?(locationInfo.city):'') +
                            (locationInfo.province?(', ' + locationInfo.province):'');
            const postalCode = (locationInfo.postal?(locationInfo.postal):'');
           
            const email = (locationInfo.email?(locationInfo.email):'');
            const filingLocation = (locationInfo.in_person_filing_location_code?(locationInfo.in_person_filing_location_code):'');
            locations.push({id: locationInfo.location_code, name: location, address: address, postalCode: postalCode, email:email, filingLocation: filingLocation});
        }

        store.dispatch('Common/UpdateLocationsInfo',locations); 
        return true;
    }
    else 
        return false;    
}