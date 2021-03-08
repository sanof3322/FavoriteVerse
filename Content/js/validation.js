//Dependencies
//--bootstrap
//--jQuery
//--moment.js

//important HTML structure:
// .form-group element MUST be presented

//to indicate number, add data-number='' attribute to an input element
//to indicate date, add data-date="" attribute to an input element
//to specify date formant use data-date="your-format" attr. By default format is set to MM/DD/YYYY. DON'T forget to include moment.js library for this to work.
//to specify integer use data-int=""
//to specify min value use data-min
//to validate email use data-email

//for regex inputs:
//add following attributes:
//input-format='regex'
//input-filter='regex string'
//input-filter-message="The Email Address is not valid."

var regexRules = {
    url: '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$',
    email: '(?:[a-z0-9!#$%&\\\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\\\'*+/=?^_`{|}~-]+)*' +
        '|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\' +
        '[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?' +
        '\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}' +
        '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]' +
        '|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
};


// function validateEmail(mail) {
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//         return (true);
//     }
//     return (false);
// }

// function clearValidate() {
//     $('.has-error').removeClass('has-error');
//     $('.error-msg').remove();
// }

$.fn.validate = function (ignored) {
    'use strict';
    //var id = this.id;

    //clear all error messages
    this.find('.has-error').removeClass('has-error');
    this.removeClass("has-error"); //if id assigned to form-group element
    this.find('.error-msg').remove();
    //toastr.clear();

    var errors = {
        count: 0
    };
    //console.log("this");
    //console.log(this);

    //getting array of inputs
    var inputs = this.find('input, textarea, select');
    var inputsCount = inputs.length;

    for (var i = 0; i < inputsCount; i++) {
        var msg = "";
        var scope = $(inputs[i]);


        var val = scope.val().trim();
        var format = scope.attr('input-format');


        //console.log("scope : ");
        //console.log(scope);
        //console.log("val : " + val);

        //required
        var isRequiredCondition = scope.is("[required]") &&
            (val === "" ||
                val == null || val.length == 0);

        var isNumberCondition = scope.is("[data-number]") && !($.isNumeric(val));
        if (isNumberCondition && !(val === null || val === "" || val === undefined)) {
            msg += "Invalid number. ";
        }

        //min value
        var isMin = scope.is("[data-min]");
        if (isMin && val) {
            if (parseFloat(val) < parseFloat(scope.data("min"))) {
                msg += "Value should be greater than or equal to " + scope.data("min") + ". ";
            }
        }

        //integer value
        var hasInt = scope.is("[data-int]");
        var x;
        var isInt = isNaN(val) ? !1 : (x = parseFloat(val), (0 | x) === x);
        if (val && isInt === false && hasInt === true) {
            msg += "Value should be an integer. ";
        }

        //date
        var isDate = scope.is("[data-date]");
        var dateFormat = scope.data('date');
        /* globals moment: false */
        if (isDate && val) {
            var isValidDate = false;
            if (dateFormat === null || dateFormat === "" || dateFormat === undefined) {
                isValidDate = moment(val, "MM/DD/YYYY", true).isValid() || moment(val, "M/D/YYYY", true).isValid();
            } else {
                isValidDate = moment(val, dateFormat, true).isValid();
            }

            if (isDate && !isValidDate) {
                msg += "Invalid date format";

                if(dateFormat){
                    msg += `. It should be ${dateFormat}`;
                }
            }
        }
        //email too buggy. Needs to be redesigned
        var isEmail = scope.is("[data-email]");
        var result;
        var emailRegex = new RegExp(regexRules.email, 'ig');
        if (isEmail && val != null && val != '') {
            result = emailRegex.exec(val);
            result = result ? result[0] == val : result;

            if (result !== true) {                
                msg = message ? message : 'Invalid email';
            }
        }

        if (format == 'regex') {

            var regex = new RegExp(scope.attr('input-filter'), 'ig');
            var message = scope.attr('input-filter-message');
            // console.log({process:'regex',regex:regex,message:message,val:val});
            if (val != null && val != '') {
                result = regex.exec(val);
                result = result ? result[0] == val : result;

                if (result !== true) {
                    isRequiredCondition = true;
                    msg = message ? message : 'Value is invalid';
                }
            }
        } else {
            if (isRequiredCondition) {
                //add error message
                msg += "Required Field ";
            }
        }

        for (var k in ignored) {
            if (scope.hasClass(k)) {
                msg += ignored[k];
            }
        }



        //number


        //add messages
        if (msg != "") {
            //scope.parent().append("<div class='error-msg'>" + msg + "</div>");
            scope.closest('.form-group').addClass("has-error");
            if(scope.closest('.form-group').find("[class*='col']").length > 0){
                scope.closest("[class*='col']").append("<div class='error-msg'>" + msg + "</div>");
            }else{
                scope.closest('.form-group').append("<div class='error-msg'>" + msg + "</div>");
            }
            
            errors.count++;
        }

        //debug info
        //var debug = {
        //    name: scope.parent().parent().find('label').text(),
        //    value: val,
        //    required: {
        //        condition: isRequiredCondition,
        //        hasRequiredAttr: $(this).attr('required'),
        //        blankValue: val === "",
        //        nullValue: val == null,
        //        isChosen: $(this).hasClass("chosen")
        //    },
        //    number: {
        //        condition: isNumberCondition,
        //        hasNumberType: $(this).is("[data-number]"),
        //        isNumeric: $.isNumeric(val)
        //    },
        //    email: {
        //        isAutocomplete: $(this).is("[tabindex]"),
        //        isEmail: $(this).is("[data-email]"),
        //        isValidEmail: validateEmail(val),
        //        contition: emailCondition
        //    }

        //};
        //console.log(debug);
    }

    //clear errors on change
    //buggy when multiple validation forms are present
    $("input:not([type='submit']), textarea, select").on("change", function () {
        $(this).closest('.form-group').find(".error-msg").remove(); //remove error message
        $(this).closest('.form-group').removeClass("has-error");
    });

    if (errors.count === 0) {
        return true;
    } else {
        return false;
    }
}; 