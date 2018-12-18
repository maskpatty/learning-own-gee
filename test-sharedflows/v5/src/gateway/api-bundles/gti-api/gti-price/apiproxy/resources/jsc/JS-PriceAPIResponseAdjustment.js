function replacer(key,value)
{
    if (value=="null") return "";
    else if (value==undefined) return "";
    else return value;
}

try {
	var inputJson = context.getVariable("response.content");
	var input = JSON.parse(inputJson);
	
	var pathSuffix = context.getVariable("proxy.pathsuffix");

	if(pathSuffix.includes("/cruise") && input.data && input.data.roomTypes) {
	    for (var roomType=0 ; roomType < input.data.roomTypes.length ; roomType++){
	        if(input.data.roomTypes[roomType].available !== undefined ){
	            if(input.data.roomTypes[roomType].available === false) 
	                input.data.roomTypes[roomType].lowestPrice.price = 0;
	            delete input.data.roomTypes[roomType].available;
	        }
	        if(input.data.roomTypes[roomType].categories){
				for(var category=0 ; category < input.data.roomTypes[roomType].categories.length ; category++){
					if(input.data.roomTypes[roomType].categories[category].price){
						for(var price=0 ; price < input.data.roomTypes[roomType].categories[category].price.length ; price++){
				    		if(input.data.roomTypes[roomType].categories[category].price[price].available !== undefined){
					    		if (input.data.roomTypes[roomType].categories[category].price[price].available === false) 
						    		input.data.roomTypes[roomType].categories[category].price[price].price = 0;
					    		delete input.data.roomTypes[roomType].categories[category].price[price].available;
				    		}
						}
					}
	    		}
			}
		}
	}		
	context.setVariable("response.content", JSON.stringify(input,replacer));
	context.setVariable("targetResponse", inputJson);

} catch(error) {

	throw error;
}