
var utilities = function() {
	var util;

	util.response = function(data,error){
		return {
			errorMessage:(!!error)?"There is an error":"",
			ErrorCode: (!!error)?1:0,
			data: (!!error)?[]:data,
			status:200
		}
};

module.exports = utilities;