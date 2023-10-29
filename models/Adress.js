const mongoose = require('mongoose');
const validator = require('validator');

const canadianAddressSchema = new mongoose.Schema({
    streetNumber: {
        type: String,
        required: [true, 'Street number field required'],
        trim: true
    },
    streetName: {
        type: String,
        required: [true, 'Street name field required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City field required'],
        trim: true
    },
    province: {
        type: String,
        enum: {
            values: ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'],
            message: 'Invalid province code'
        },
        required: [true, 'Province field required']
    },
    postalCode: {
        type: String,
        validate: {
            validator: function(v) {
                // Canadian postal codes are in the format "ANA NAN", where A is a letter and N is a number
                const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid postal code`
        },
        uppercase: true,
        required: [true, 'Postal code field required'],
        trim: true
    },
    country: {
        type: String,
        default: 'Canada'
    }
});

module.exports = canadianAddressSchema;