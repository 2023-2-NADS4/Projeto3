// product id
const Joi = require('joi')
const V = true;
const NV = false;

function ASSERT(er, exp) {
    let e = null;
    if (er) e = true;

    if (e) {
        if (exp == e) console.log('not expected') 
    }

    if (!e) {
        if (exp == e) console.log('not expected')
    }
}
  
function validateUserOrPId(product_id) {
    const schema = Joi.object({
        queryParam: Joi.alternatives().try(
          Joi.string().regex(/^\d{1,3}$/), // Regex for a string representing a number with length 1 to 3
          Joi.number().integer().min(1).max(999) // Validating a number between 1 and 999
        ).required()
    });
    
    const { error, value } = schema.validate({ queryParam: product_id });
    if (error) {
        return true;
    }
    return null;
    // ASSERT(error)
}


function validatePackForDatabaseQueries(pack) {
    const schema = Joi.object({
        queryParam: Joi.alternatives().try(
          Joi.string().regex(/^\d{1,2}$/), // Regex for a string representing a number with length 1 to 3
          Joi.number().integer().min(1).max(99) // Validating a number between 1 and 999
        ).required()
    });
    const { error, value } = schema.validate({ queryParam: pack });
    if (error) {
        return true;
    }
    return null;
}



function validateSearchingStrings(search) {

    const sanitizeSearchQuery = (value) => {
        return value.replace(/[^a-zA-Z0-9 ]/g, '');
    };
      
    const searchQuerySchema = Joi.string().max(255).trim().custom(sanitizeSearchQuery).required()


    const { error, value } = searchQuerySchema.validate(search);
    if (value) {
        // console.log('true')
        return true;
    } else {
        // console.log('nd')
        return null;
    }
}



function validateGoogleOAuthCode(auth_code) {
    const schema = Joi.object({
        auth_code: Joi.alternatives().try(
            Joi.string().min(10).max(255).required(),
        ).required()
    });
    
    const { error, value } = schema.validate({ auth_code: auth_code });
    if (error) {
        return true;
    }
    return null;
}





function validateEmail(email, exp) {

    const emailSchema = Joi.object({
        email: Joi.string().email().required(),
    });
  
    // Example usage
  const userInput = { email: email };
  
  // Validate the email
    const { error, value } = emailSchema.validate(userInput);
    if (error) {
        return true;
    }
    return null;
}




function validatePassword(password) {
    const passwordSchema = Joi.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .required();

    const { error, value } = passwordSchema.validate(password);
    if (error) {
        return true;
    }
    return null;
    // ASSERT(error, expectation);
}






const validcolors = [ "red","orange","yellow","green","blue","purple","pink","brown","white","black"] 

function validateColor(color) {
    const colorSchema = Joi.string().valid(...validcolors).insensitive().required();

    const { error, value } = colorSchema.validate(color);
    if (error) {
        return true;
    }
    return null;
    // ASSERT(error, expectation);
}




function validateArrayOfIds(ids) {
    const schema = Joi.array().items(
        Joi.alternatives().try(
            Joi.string().regex(/^\d{1,3}$/),
            Joi.number().integer().min(1).max(999)
        )
    ).required();

    const { error, value } = schema.validate(ids);
    if (error) {
        return true;
    }
    return null;
}

function removeSymbols(inputString) {
    return inputString.replace(/[^a-zA-Z0-9]/g, '');
  }
  
  const schema = Joi.string().custom((value, helpers) => {
    const cleanedValue = removeSymbols(value);
    return cleanedValue; // You can also perform additional validation here if needed
  }, 'Custom Clean');

function clearMessages(m) {
      return schema.validate(m);
}


module.exports = {validateEmail, validatePassword, validateUserOrPId, validateColor, validateArrayOfIds, validatePackForDatabaseQueries, validateSearchingStrings, clearMessages, validateGoogleOAuthCode}