import Ajv from 'ajv';

const ajv = new Ajv({allErrors: true});

export const validateForm = (data) => {
    console.log(data);
    const schema = {
            "type": "object",
            "required": ["email", "name"],
            "properties": {
                "email": {
                  "type": "string",
                  "format" : "email",
                  "minLength": 3,
                  "maxLength": 32
                },
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "maxLength": 32,
                },
                "phone":{
                    "type": "string"
                },
                "message":{
                    "type": "string"
                }
            }
    };
      const validate = ajv.compile(schema);
      const valid = validate(data);

      const errors = {};

      if (!valid) {
            const errors = ajv.errorsText(validate.errors);
            return { errors: errors, isValid: false };
      } else{
            return {errors: errors, isValid: true};
      }
};