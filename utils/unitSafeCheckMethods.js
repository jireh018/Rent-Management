const PropertyRepository = require('../repositories/propertyRepository');
const propertyRepository = new PropertyRepository();

const validationRules = [
    { 
        field: 'roomNumber', propertyType: ['House-Rooms rented'], 
        errorMessage: 'Room Number is required for House-Rooms rented type' 
    },
    { 
        field: 'apartmentNumber', propertyType: ['Apartment Complex'], 
        errorMessage: 'Apartment Number is required for Apartment Complex type' 
    },
    { 
        field: 'floor', propertyType: ['Apartment Complex'], 
        errorMessage: 'floor is required for Apartment Complex type' 
    },
    { 
        field: 'size', propertyType: ['House-Rooms rented'], 
        errorMessage: 'size is required for Apartment Complex type' 
    },
    { 
        field: 'numberOfBedRooms', propertyType: ['Apartment Complex', 'House-Whole rented'], 
        errorMessage: 'Number of bedrooms is required for House-Whole rented' 
    },
    // {
    //     field: 'assignedToEmployee', propertyType: ['Apartment Complex'], 
    //     errorMessage: 'assignedToEmployee is required for Apartment Complex type'
    // },
];

async function validateFieldBasedOnPropertyType(unitDocument){
    const property = await propertyRepository.findById(unitDocument.property);
    const currentPropertyType = property.type;
    
    for(rule of validationRules){
        if(rule.propertyType.includes(currentPropertyType) && !unitDocument[rule.field]){
            throw new Error(rule.errorMessage);
        }
    }
}

module.exports = {
    validateFieldBasedOnPropertyType,
};
